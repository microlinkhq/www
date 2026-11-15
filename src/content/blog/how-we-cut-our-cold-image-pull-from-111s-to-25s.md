---
title: 'How we cut our cold image pull from 111s to 25s'
description: 'The Microlink API pull went from 111s to 25s with zstd, a slimmer base image and a pruned node_modules. Then we stopped the autoscaler from throwing new nodes away, and fixed the request path that made bursts expensive.'
authors:
  - kiko
date: '2026-11-15'
---

A Microlink API pod on a node that already has its image is Ready in about 4s. On a new Kubernetes node it waited about 1m50s for the node and a median 111s for the image pull, so a burst waited about 4 min for capacity.

**TL;DR**

- A cold image pull went from a median of **111s to 25s**: zstd, a base image built from `ubuntu:22.04`, and a pruned `node_modules`.
- A pod on a new node is now Ready in **about 2 min**, down from about 4 min. Without the pull, the floor is about 75s.
- The autoscaler bought 1,256 distinct API nodes in 7 days for a median fleet of 15. A 20m unneeded time, a 300s scale-down window and a priority expander target that churn.
- A 408 storm that looked like missing capacity was brotli quality 11 on cache writes. At quality 8, a 24MB value compresses in **591ms instead of 61s**.

## The pull was decompression, not download

Most of that wait was ours. Each node holds 2 pods on 8 vCPUs, and the 2.09&nbsp;GB image downloads from Docker Hub in about 12s, so the pull was decompression and disk, not network. You can check your own image the same way, with the command at the end of this post.

Docker pushes layers as gzip unless told otherwise. Our build now pushes with buildx at [zstd level 3 and forced compression](https://docs.docker.com/build/exporters/), which every cluster can read because they all run containerd 2.x. On fresh [`s-8vcpu-16gb-amd`](https://kikobeats.com/digitalocean-droplets-benchmark/#basic--premium-amd-8vcpu) nodes, the gzip pulls took 107s and 99s. The zstd pulls of the same image took 69s and 64s.

The release build cache needed the same setting. Left on its gzip default, the 3.90.9 release pushed the image and then died exporting the cache with a BuildKit `EOF`, so nothing was deployed. Preview builds never write the cache, so only a release could hit it.

## Pull time follows the unpacked bytes

Once the format was fixed, the time tracked how many bytes each node writes to disk. Docker layers are additive: a later layer that moves or `chown`s a file stores it again. Release 3.90.10 shipped Chrome and `node_modules` twice that way, a 399MB zstd layer of copies, next to a 422MB pnpm store and 175MB of pnpm and node-gyp caches.

`pnpm install`, the move of Chrome to `/opt/chrome`, and the `chown -R` of the app now run in one `RUN`, and that `RUN` removes the store before it ends. Puppeteer downloads only the Chrome we run. `chrome-headless-shell` (285MB) is skipped in `.puppeteerrc.js`.

## We stopped inheriting someone else's base image

The runtime stage used to start from `browserless/base`. Its install layer still shipped `build-essential`, `git`, `pdftk` with OpenJDK 11, Ubuntu's Mesa 23 with libLLVM-15, and a Node 18 under nvm. The API runs none of them, and deleting them in a later layer frees nothing.

The runtime stage now starts from plain `ubuntu:22.04` and installs its own list. One Dockerfile builds everything: a `builder` stage compiles ImageMagick, libvips, pandoc and Mesa, and the runtime copies only what they produce. Its last `RUN` fails the build when a named binary or a linked library is missing, so a slimmer image cannot ship broken.

A smaller build has less to fall back on. `canvas` installs a prebuilt binary from GitHub releases, and when that download times out it compiles from source, which fails because the app stage has no `pkg-config` or cairo headers. It happened once, in a preview build, and a retry passed. We opened an issue for it and left the retry as the fix until it costs a release.

All sizes are zstd level 3, measured on 2026-11-11:

| Layer set | Before (zstd) | After (zstd) | Before (unpacked) | After (unpacked) |
| --- | --- | --- | --- | --- |
| Base layers | 1035.6MB | 636.1MB | 2769.7MB | 1610.5MB |
| App image | 1322.9MB | 919.0MB | 3686.8MB | 2512.1MB |

Cold pulls on new AMD nodes went from 47s to 30-33s with v3.94.1.

## Pruning files mattered more than pruning bytes

The last change deletes the source maps, type definitions and readmes inside `node_modules` with [`untracked`](https://github.com/Kikobeats/untracked), in the same `RUN` and before the pnpm store goes. pnpm hardlinks packages from the store, so the space only leaves with it:

```dockerfile
pnpm dlx untracked@latest prune node_modules
```

That removed 17,489 files and 110.9MB from the production tree. The compressed image only went from 935.2MB to 921.6MB, yet cold pulls on fresh nodes on 2026-11-15 took 24.7s and 26.1s, down from 30-33s. The drop is larger than the bytes explain, which points at the file count.

## Where the two minutes go now

These are medians for a pod scheduled onto a node that does not exist yet, on 3.95.3:

| Step | Time |
| --- | --- |
| Pod pending to scale-up triggered | 16s |
| VM created to node registered | 41s |
| Node registered to Ready (Cilium, provider readiness taint) | 28s |
| Taint removed to pull start | 7s |
| Image pull | 25s |
| Pull end to pod Ready | 5s |

The pull is now the smallest of the big steps. The rest belongs to the cloud provider's provisioning, so the floor without any pull is about 75s. The next large win is a node that is already warm, not a smaller image.

## The autoscaler was throwing nodes away

A faster cold start helps less if the cluster keeps paying for it. Three settings made each new node live longer.

- **Scale-down window:** a ReplicaSet deletes not-ready pods first, so at 120s the HPA killed the pods new nodes were bought for. Over 7 days, 701 of 1299 scale-downs came within 5 min of a scale-up and API nodes lived a median 40 min. At [300s](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#stabilization-window), a replay created 23% fewer pods.
- **Unneeded time:** a node with one API pod requests about 42% of its memory, under the 0.5 threshold. At the 10m default, the cluster bought 1,256 distinct API nodes in 7 days for a median fleet of 15. It now waits 20m.
- **Pool choice:** without an expander, the autoscaler picks a pool at random. On 2026-11-13 the Intel fallback pool took 13 of 19 scale-ups while the AMD pool was far under its max. The [priority expander](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) now gives `api-primary` 100 and `api-secondary` 10.

The 23% comes from a replay, not from production. We opened a second issue to check the 300s window against 7 days of real scale-downs on 2026-11-18.

## Not every 408 storm is a capacity problem

On 2026-11-14 at 03:29Z the fleet went to a 23.9% 408 rate during one customer's burst of function requests. We replayed 7 days of CPU, in-flight requests, pods and nodes at 15s resolution against the HPA rules. In that burst, the pods needed jumped from 14 to 57-89 within 30s. Extra headroom added 1 to 3 pods, and lowering the CPU target from 80% to 70% helped the rest of the week but not that minute.

The real cost was in the cache write. Those responses were 5 to 20MB, and every cache value was compressed at brotli quality 11, about 2.5s per MB, on the libuv threadpool's 4 threads. Each response spent a median 19.8s after extraction, and every other request on the pod waited behind it for DNS and cache reads.

We benchmarked [brotli quality](https://nodejs.org/api/zlib.html) on real payloads:

| Payload | Quality 8 | Quality 9 | Quality 10 | Quality 11 |
| --- | --- | --- | --- | --- |
| 850kB HTML page | 20ms | 26ms | 637ms | 2.0s |
| 24MB page with inlined photos | 591ms | 2.1s | not measured | 61s |

Quality 8 stores 14.9% more bytes than 11 on text, which costs Redis memory. Decoding does not depend on the quality, so entries written at 11 still read. It shipped in 3.95.2, and no burst of that size has come since, so its effect in production is not measured yet.

## Measure the pull on a fresh node

A pull you time on a node that already holds the base layers measures one layer. Ours took 13.8s that way. Read the `Pulled` event of a pod whose node is less than 10 minutes old:

```bash
kubectl get events --field-selector reason=Pulled
```

If your pull takes several times longer than the download, you are paying for decompression, and zstd is the first change to make.
