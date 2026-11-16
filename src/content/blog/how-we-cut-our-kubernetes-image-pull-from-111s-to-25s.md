---
title: 'How we cut our Kubernetes image pull from 111s to 25s'
description: 'Cold Kubernetes image pulls went from 111s to 25s with zstd, a slimmer base image and fewer files. A new pod now starts in about 2 min instead of 4.'
authors:
  - kiko
date: '2026-11-15'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { ColdStartDiagram, ColdStartStepsDiagram, LayerCopyDiagram, PullTimeDiagram, ScaleDownWindowDiagram, SecondPoolDiagram, ThreadpoolDiagram, UnneededTimeDiagram } from 'components/pages/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s'

<ColdStartDiagram />

<Figcaption>A pod on a new node, from pending to Ready. The node wait shrank a little; the image pull went from 111s to 25s.</Figcaption>

The [Microlink API](/docs/api/getting-started/overview) runs on Kubernetes, and the cluster grows with traffic in two steps. First it adds pods: a pod on a node that already has our image is Ready in about 4s. When the nodes are full, it adds a node, and the new pod waits for the node (about 1m50s) and for the image pull (a median 111s). A burst waited about 4 min for capacity, so we set out to shorten it.

**TL;DR**

- A cold image pull is **77% faster**, from a median of 111s to 25s: zstd, a slimmer base image, and a pruned <HoverImage src="/images/node-modules-heaviest-objects.png" alt="Heaviest objects in the universe: the Sun, a neutron star and a black hole bend spacetime, and node_modules bends it furthest.">`node_modules`</HoverImage>.
- A pod on a new node is Ready **about 50% faster**, in about 2 min instead of about 4 min. From VM creation, a node still needs about 75s before the pull can start.
- The autoscaler bought 1,256 distinct API nodes in 7 days for a median fleet of 15. A 300s scale-down window creates **23% fewer pods** in a 7-day replay.
- Cache values now use the brotli quality that compresses without adding to the response time. At quality 8, a 24MB value compresses **99% faster** than at 11, in 591ms instead of 61s.

## The pull was decompression, not download

Pulling an image is two jobs:

1. **Download**: the node fetches each compressed layer from the registry.
2. **Unpack**: the node decompresses each layer onto its disk.

The container cannot start until the last layer is unpacked, so either job can hold it back.

Docker pushes layers as gzip unless told otherwise. And guess what could be better than gzip? Exactly, [zstd](https://en.wikipedia.org/wiki/Zstd).

<PullTimeDiagram />

Our build now pushes with buildx using [zstd compression](https://docs.docker.com/build/exporters/#compression) at level 3, with `force-compression` set so layers that were already gzip are compressed again as zstd. Every cluster can read it, because they all run containerd 2.x. On fresh nodes, the gzip pulls took 107s and 99s. The zstd pulls of the same image took 69s and 64s.

We saved 35s to 38s per pull with this change alone.

## Pull time follows the unpacked bytes

Our image carries a whole browser.

Our Dockerfile builds one image with the API and the browser it drives: [Screenshots](/screenshot), [PDFs](/pdf), [functions](/function), [Lighthouse reports](/insights), and [metadata](/metadata) or [markdown](/markdown) from any page that needs rendering all run in Chrome, so Chrome ships inside the image next to `node_modules`.

Installing the dependencies brings both: `pnpm install` fetches the npm packages, and Puppeteer downloads Chrome along with them.

Two later steps then touch those files: Chrome moves to `/opt/chrome`, and `chown -R` gives the app to the user it runs as.

Docker layers are additive: a later layer that moves or `chown`s a file stores it again. One release shipped Chrome and `node_modules` twice that way, a 399MB zstd layer of copies, next to a 422MB pnpm store and 175MB of pnpm and node-gyp caches.

<LayerCopyDiagram />

The fix was to do it all in a single `RUN`:

```dockerfile
RUN pnpm install --production --dangerously-allow-all-builds \
 && rm -rf "$(pnpm store path)" /root/.cache \
 && chrome="$(find node_modules/.cache/chrome -type f -name chrome -print -quit)" \
 && mv "$(dirname "$chrome")" /opt/chrome \
 && chown -R root:chrome /opt/chrome \
 && chown -R blessuser:blessuser /usr/src/app
```

Nothing is stored twice, and the store never reaches a layer.

We also stopped downloading a browser we never use: Puppeteer fetches only [the Chrome we run](/blog/why-we-still-run-chrome), and `.puppeteerrc.js` skips `chrome-headless-shell` (285MB).

We dropped 996MB of zstd layers with this change alone.

## We built our own base image

Every image starts from a base image, and every layer of that base ships to every node.

A file the base installs stays in the image even if a later layer deletes it.

Our runtime used to start from a third-party browser base image. Its install layer still shipped tools the API never runs:

- `build-essential` and `git`
- `pdftk` with OpenJDK 11
- Ubuntu's Mesa 23 with libLLVM-15
- A Node.js binary under nvm

Now the runtime starts from a plain OS image and installs only its own list. One Dockerfile builds everything: a `builder` stage compiles ImageMagick, libvips, pandoc and [Mesa](/blog/webgl-without-a-gpu), and the runtime copies in only what they produce. Its last `RUN` fails the build when a named binary or a linked library is missing, so a slimmer image cannot ship broken.

| Layer set | Before (zstd) | After (zstd) | Before (unpacked) | After (unpacked) |
| --- | --- | --- | --- | --- |
| Base layers | 1035.6MB | 636.1MB | 2769.7MB | 1610.5MB |
| App image | 1322.9MB | 919.0MB | 3686.8MB | 2512.1MB |

Cold pulls on new nodes went from 47s to 30-33s. We saved 14s to 17s per pull with this change alone.

## Pruning files mattered more than pruning bytes

Unpacking a layer pays for every file it writes, not only for every byte.

And `node_modules` is full of files the API never reads at runtime:

- Source maps
- TypeScript type definitions
- Readmes, changelogs and other docs

We delete them with [untracked](https://github.com/Kikobeats/untracked), in the same `RUN` and before the pnpm store goes. pnpm hardlinks packages from the store, so the space only leaves with it:

```dockerfile
RUN pnpm install --production --dangerously-allow-all-builds \
 && pnpm dlx untracked@latest prune node_modules \
 && rm -rf "$(pnpm store path)" /root/.cache
```

That removed 17,489 files and 110.9MB from the production tree. The compressed image barely moved, from 935.2MB to 921.6MB, yet cold pulls on fresh nodes took 24.7s and 26.1s, down from 30-33s. The bytes alone do not explain that drop; the file count does.

We saved 4s to 8s per pull with this change alone.

## Where the two minutes go now

We timed every step of a cold start.

With the three changes in place, these are the medians for a pod that lands on a node that does not exist yet:

| Step | Time |
| --- | --- |
| The autoscaler notices the pending pod | 16s |
| The cloud provider boots the VM and it joins the cluster | 41s |
| The node finishes its network and system setup and reports Ready | 28s |
| Kubernetes schedules the pod and the pull starts | 7s |
| **Image pull** | **25s** |
| The container starts and passes its readiness check | 5s |

<ColdStartStepsDiagram />

<Figcaption>Every step of a cold start on one scale. The image pull is 25s of 122s.</Figcaption>

That adds up to about 2 minutes, and the pull is now 20% of it. It used to be the largest step on its own.

Most of what is left is the cloud provider: from the moment the VM is created, a node takes about 75s before it can even start pulling. A smaller image cannot win that time back. A node that is already warm can.

## Keeping the nodes we pay for

A faster cold start only pays off if the cluster keeps the node it just started.

We made three changes so a new node arrives when we need it and lives long enough to serve traffic.

### A scale-down window longer than a cold start

When the HPA scales down, the ReplicaSet deletes pods that are not Ready first.

With a 120s window, that was often the pod a brand new node had just been bought for. Over 7 days, 701 of 1299 scale-downs came within 5 min of a scale-up, and API nodes lived a median of 40 min.

<ScaleDownWindowDiagram />

<Figcaption>A ReplicaSet deletes pods that are not Ready first. When a scale-down happens inside a window shorter than a cold start, the pod a new node was bought for can be the one that goes.</Figcaption>

We raised the [stabilization window](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#stabilization-window) to 300s. Replaying those 7 days, the cluster created 23% fewer pods. The replay is not production, so we opened an issue to check the 300s window against 7 days of real scale-downs.

### Twenty minutes before a node counts as unneeded

The autoscaler removes nodes it considers unneeded.

A node running one API pod requests about 42% of its memory, under the 0.5 threshold that marks it as unneeded. At the 10m default, the cluster bought 1,256 distinct API nodes in 7 days for a median fleet of 15. It now waits 20m before removing one.

<UnneededTimeDiagram />

<Figcaption>One API pod keeps a node under the 0.5 line, so the autoscaler counts it as unneeded. Waiting 20 min instead of 10 keeps it for the next burst.</Figcaption>

### A second pool for when the first runs out

A new node only helps if the cloud provider has one to give.

Our region ran short of our machine type more than once: it answered 160 resize requests with "insufficient capacity", and accepted 22 more that it never filled. An accepted resize is worse, because the autoscaler waits out its 15 min provisioning timeout before it gives up.

So we added a second node pool, `api-secondary`, on a different machine type with the same price and benchmark. When the primary pool cannot grow, the next scale-up goes to the secondary one, and a capacity shortage costs seconds instead of the fleet. Each pool can grow to 60 nodes, enough for all 120 pods at 2 per node, so either one can hold the whole fleet alone.

<SecondPoolDiagram />

<Figcaption>Every scale-up tries the primary pool first. The secondary pool only takes one when the primary cannot add a node.</Figcaption>

A second pool needs an order. Without an expander, the autoscaler picks a pool at random: in one day, the secondary took 13 of 19 scale-ups while the primary was far under its max. The [priority expander](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) now gives `api-primary` 100 and `api-secondary` 10, so the secondary only takes a scale-up when the primary cannot.

## Compression that costs no response time

Compression sits on the response path.

Every response we cache is compressed before it is written, and the write finishes before the response is sent. That makes the compression level part of the response time.

The compression runs on the libuv threadpool: 4 threads per pod, shared with DNS lookups, file reads and every cache read. At brotli quality 11, the zlib default, it costs about 2.5s per MB, so one large value can hold a thread for seconds. Other work waits when the rest of the pool is busy too.

<ThreadpoolDiagram />

<Figcaption>The threadpool has 4 threads for the whole pod. Compression, DNS lookups and cache reads all take turns on them.</Figcaption>

We benchmarked [brotli quality](https://nodejs.org/api/zlib.html) on real payloads:

| Payload | Quality 8 | Quality 9 | Quality 10 | Quality 11 |
| --- | --- | --- | --- | --- |
| 850kB HTML page | 20ms | 26ms | 637ms | 2.0s |
| 24MB page with inlined photos | 591ms | 2.1s | not measured | 61s |

Our rule is the highest quality that adds nothing to the response duration, which is quality 8. Quality 9 looks close on text, but it spends 3.6x longer searching data that does not compress, like inlined photos. The trade-off is size: quality 8 stores 14.9% more bytes than 11 on text, which costs Redis memory. Decoding does not depend on the quality, so entries written at 11 still read.

A 24MB value now compresses in 591ms instead of 61s with this change alone.

## Measure your own pull

The `Pulled` event is the whole pull, download and unpack together. Read it on a newly provisioned node, after you check that this image's layers are absent. A node can still hold those layers from an earlier pull, or from another image that shares them, and that event is then only partly a cold pull.

```bash
kubectl get events --field-selector reason=Pulled
```

A pull on a node that already holds the base layers only measures the layers that changed, and ours took 13.8s that way. A node with none of the layers takes longer because it still downloads and unpacks the rest. The two durations do not say how much of that gap is decompression.
