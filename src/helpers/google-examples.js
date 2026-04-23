const GOOGLE_VERTICAL_EXAMPLES = {
  search: {
    code: `const page = await google(
  'site:developer.mozilla.org fetch',
  { type: 'search' }
)`,
    payload: [
      {
        title: 'Fetch API - MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
        description:
          'The Fetch API provides an interface for fetching resources (including across the network). It is a more powerful and flexible replacement for XMLHttpRequest.'
      },
      {
        title: 'Using the Fetch API - MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
        description:
          'The Fetch API provides a JavaScript interface for making HTTP requests and processing the responses. Fetch is the modern replacement for XMLHttpRequest.'
      },
      {
        title: 'Request - Web APIs - MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Request',
        description:
          'The Request interface of the Fetch API represents a resource request. You can create a new Request object using the Request() constructor.'
      },
      {
        title: 'Using Deferred Fetch - Web APIs | MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Deferred_Fetch',
        description:
          'The fetchLater() API extends the Fetch API to allow setting fetch requests up in advance. These deferred fetches can be updated before they have ...'
      },
      {
        title: 'Response - Web APIs - MDN Web Docs - Mozilla',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Response',
        description:
          'The Response interface of the Fetch API represents the response to a request. You can create a new Response object using the Response() constructor.'
      },
      {
        title: 'Window: fetch() method - Web APIs | MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch',
        description:
          'The fetch() method of the Window interface starts the process of fetching a resource from the network, returning a promise that is fulfilled once the response ...'
      },
      {
        title: 'Background Fetch API - MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Background_Fetch_API',
        description:
          'The Background Fetch API provides a method for managing downloads that may take a significant amount of time such as movies, audio files, ...'
      },
      {
        title: 'Web APIs - MDN Web Docs - Mozilla',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API',
        description:
          'Below is a list of all the APIs and interfaces (object types) that you may be able to use while developing your Web app or site.'
      },
      {
        title: 'ServiceWorkerGlobalScope: fetch event - Web APIs | MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/fetch_event',
        description:
          "The fetch event of the ServiceWorkerGlobalScope interface is fired in the service worker's global scope when the main app thread makes a network request."
      },
      {
        title: 'WorkerGlobalScope: fetch() method - Web APIs | MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/fetch',
        description:
          'The fetch() method of the WorkerGlobalScope interface starts the process of fetching a resource from the network, returning a promise that is fulfilled once ...'
      }
    ]
  },
  news: {
    code: `const page = await google(
  'openai api developers',
  { type: 'news' }
)`,
    payload: [
      {
        title: 'Introducing GPT‑5 for developers',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTep8PgZymNQQ4wTCRMoR6uUB9nFBm59Q2wQNX1w_z_RkPBx1sSpreoTLc&usqp=CAI&s'
        },
        date: '2025-08-07T12:00:00.000Z',
        publisher: 'OpenAI',
        url: 'https://openai.com/index/introducing-gpt-5-for-developers/',
        description:
          'Introducing GPT-5 in our API platform—offering high reasoning performance, new controls for devs, and best-in-class results on real coding...'
      },
      {
        title:
          'OpenAI ramps up developer push with more powerful models in its API',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlKq3q8yfYDgMWgqE1cYeBYs349foELdbm8ZTN-v6k6BUgSzpKOV6m8e8&usqp=CAI&s'
        },
        date: '2025-10-06T12:00:00.000Z',
        publisher: 'TechCrunch',
        url: 'https://techcrunch.com/2025/10/06/openai-ramps-up-developer-push-with-more-powerful-models-in-its-api/',
        description:
          'OpenAI ramps up developer push with more powerful models in its API ... OpenAI unveiled new API updates at its Dev Day on Monday, introducing GPT-...'
      },
      {
        title:
          'OpenAI upgrades its Responses API to support agent skills and a complete terminal shell',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLz8IpRfb_2vSzFy5Y79w7TKEkj59OI-8TOAYWTJmOI7T2Qq-fSQroWis&usqp=CAI&s'
        },
        date: '2026-02-21T11:21:43.477Z',
        publisher: 'VentureBeat',
        url: 'https://venturebeat.com/orchestration/openai-upgrades-its-responses-api-to-support-agent-skills-and-a-complete',
        description:
          'Until recently, the practice of building AI agents has been a bit like training a long-distance runner with a thirty-second memory.'
      },
      {
        title: 'OpenAI brings GPT-5.2 Codex to developers via API',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Wo6H93oX6ubNaL4G1DY9kta4FHqcTOh6soN9OPbg2pgNhD_-efu6tLE&usqp=CAI&s'
        },
        date: '2026-01-16T12:00:00.000Z',
        publisher: 'Techzine Global',
        url: 'https://www.techzine.eu/news/devops/137999/openai-brings-gpt-5-2-codex-to-developers-via-api/',
        description:
          "The move to make GPT-5.2-Codex available via an API underscores OpenAI's focus on developers and professional applications. Whereas the company..."
      },
      {
        title:
          'From model to agent: Equipping the Responses API with a computer environment',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbGyZuLJFf1JdFJnnznPGOv-g6qDQQtevJcWD9cdNz3DYGpknhJ-hrvoM&usqp=CAI&s'
        },
        date: '2026-03-14T11:21:43.478Z',
        publisher: 'OpenAI',
        url: 'https://openai.com/index/equip-responses-api-computer-environment/',
        description:
          'How OpenAI built an agent runtime using the Responses API, shell tool, and hosted containers to run secure, scalable agents with files,...'
      },
      {
        title:
          'OpenAI opens GPT-5.2 Codex to developers through the Responses API',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiH_kOOF7jNdSmBAIa95OA4DVwRrhktFWiGr7PAi8YoZCtADBICezaOtY&usqp=CAI&s'
        },
        date: '2026-01-14T12:00:00.000Z',
        publisher: 'The Decoder',
        url: 'https://the-decoder.com/openai-opens-gpt-5-2-codex-to-developers-through-the-responses-api/',
        description:
          'Pricing comes in at $1.75 per million input tokens and $14 per million output tokens, a notable increase from earlier GPT-5 Codex models, which...'
      },
      {
        title:
          'Gemini Batch API now supports Embeddings and OpenAI Compatibility',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC4WGzjeur2bgyLLqOdEzHZzqYlBlNNjy0wC748QLaveBpqlDX3djjUE0&usqp=CAI&s'
        },
        date: '2025-09-10T12:00:00.000Z',
        publisher: 'blog.google',
        url: 'https://developers.googleblog.com/en/gemini-batch-api-now-supports-embeddings-and-openai-compatibility/',
        description:
          'Today we are extending the Gemini Batch API to support the newly launched Gemini Embedding model as well as offering developers the ability...'
      },
      {
        title: 'OpenAI makes Sora 2 models available to developers via API',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvhf_wAuHxbM_6lxahHJ5-bBMVwTPnIy1XhzR3Awi6x26ivHftoECHI7g&usqp=CAI&s'
        },
        date: '2025-10-07T12:00:00.000Z',
        publisher: 'Neowin',
        url: 'https://www.neowin.net/news/openai-makes-sora-2-models-available-to-developers-via-api/',
        description:
          'OpenAI has released its advanced Sora 2 and Sora 2 Pro video generation models, making them accessible to developers via an API. · Create video:...'
      },
      {
        title:
          "Why Google's new Interactions API is such a big deal for AI developers",
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDSdkuxQwnEPcc_RssCoi7bQipQPPBMvVJU2eSo4yOOeiyM0WqshXQ5U&usqp=CAI&s'
        },
        date: '2025-12-17T12:00:00.000Z',
        publisher: 'VentureBeat',
        url: 'https://venturebeat.com/infrastructure/why-googles-new-interactions-api-is-such-a-big-deal-for-ai-developers',
        description:
          'For the last two years, the fundamental unit of generative AI development has been the "completion." You send a text prompt to a model,...'
      },
      {
        title: 'Introducing GPT-5.1 for developers',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdpx_Otv3qPEpfVWRdNG-RcpkJQ4-VU-9VEHX8epMTswn6-lBsAMbSVIo&usqp=CAI&s'
        },
        date: '2025-11-13T12:00:00.000Z',
        publisher: 'OpenAI',
        url: 'https://openai.com/index/gpt-5-1-for-developers/',
        description:
          'GPT-5.1 is now available in the API, bringing faster adaptive reasoning, extended prompt caching, improved coding performance,...'
      }
    ]
  },
  images: {
    code: `const page = await google(
  'kubernetes architecture diagram',
  { type: 'images' }
)`,
    payload: [
      {
        title: 'Cluster Architecture | Kubernetes',
        image: {
          url: 'https://kubernetes.io/images/docs/kubernetes-cluster-architecture.svg',
          width: 1402,
          height: 882
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfRhoylgxd_-qN18TWNhFRSQanbMBRLQMVoA&s',
          width: 283,
          height: 178
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fkubernetes.io%2Fimages%2Fdocs%2Fkubernetes-cluster-architecture.svg&tbnid=Jg7u7jTcQjC_DM&imgrefurl=https%3A%2F%2Fkubernetes.io%2Fdocs%2Fconcepts%2Farchitecture%2F&doc...'
        },
        url: 'https://kubernetes.io/docs/concepts/architecture/'
      },
      {
        title: 'Understanding Kubernetes Architecture with Diagrams',
        image: {
          url: 'https://phoenixnap.com/kb/wp-content/uploads/2021/04/full-kubernetes-model-architecture.png',
          width: 800,
          height: 478
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc2zEh-NWR8DpJZ9B8VH3ERCNCg9wIm5ALsw&s',
          width: 291,
          height: 173
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fphoenixnap.com%2Fkb%2Fwp-content%2Fuploads%2F2021%2F04%2Ffull-kubernetes-model-architecture.png&tbnid=sSknThtEEDecFM&imgrefurl=https%3A%2F%2Fphoenixnap.com%2Fkb%2Fund...'
        },
        url: 'https://phoenixnap.com/kb/understanding-kubernetes-architecture-diagrams'
      },
      {
        title: 'What is Kubernetes Architecture?',
        image: {
          url: 'https://cdn.shopaccino.com/igmguru/articles/kubernetes-architecture-3528463276791325_l.jpg?v=547',
          width: 1511,
          height: 850
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsqthkuwJgIQBUBjPYQXyyHOlz_Jx8hhflw&s',
          width: 299,
          height: 168
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.shopaccino.com%2Figmguru%2Farticles%2Fkubernetes-architecture-3528463276791325_l.jpg%3Fv%3D547&tbnid=vFSDz-x_-Qor7M&imgrefurl=https%3A%2F%2Fwww.igmguru.com%2Fblog...'
        },
        url: 'https://www.igmguru.com/blog/kubernetes-architecture'
      },
      {
        title: 'Learn About Kubernetes Concepts and Architecture',
        image: {
          url: 'https://platform9.com/media/kubernetes-constructs-concepts-architecture.jpg',
          width: 1041,
          height: 813
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJmTYJRagSZWjbwTmaZeSasd3sHZ5jbrHnw&s',
          width: 254,
          height: 198
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fplatform9.com%2Fmedia%2Fkubernetes-constructs-concepts-architecture.jpg&tbnid=QUejyBfRN5jDxM&imgrefurl=https%3A%2F%2Fplatform9.com%2Fblog%2Fkubernetes-enterprise-chap...'
        },
        url: 'https://platform9.com/blog/kubernetes-enterprise-chapter-2-kubernetes-architecture-concepts/'
      },
      {
        title: 'Kubernetes: Architecture and Components explained | by ...',
        image: {
          url: 'https://miro.medium.com/1*9TA8CE3DyPkNzgZ0Kymbwg.png',
          width: 940,
          height: 447
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbn0Uw-Ld9kbGBxx0F9Gjn1RlJQby0vWDOFQ&s',
          width: 326,
          height: 155
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmiro.medium.com%2F1*9TA8CE3DyPkNzgZ0Kymbwg.png&tbnid=iTFZq1N7JoekZM&imgrefurl=https%3A%2F%2Fmedium.com%2F%40himanshusangshetty%2Fkubernetes-architecture-and-component...'
        },
        url: 'https://medium.com/@himanshusangshetty/kubernetes-architecture-and-components-explained-e489e98db15d'
      },
      {
        title: 'Kubernetes Architecture & Components With Diagram',
        image: {
          url: 'https://k21academy.com/wp-content/uploads/2020/06/Kubernetes_Architecture-1.png',
          width: 2612,
          height: 1544
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9YATqW01Hrdk22Sx72YKWlyZQjSdCbO0HA&s',
          width: 292,
          height: 172
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fk21academy.com%2Fwp-content%2Fuploads%2F2020%2F06%2FKubernetes_Architecture-1.png&tbnid=h7iwQg5jsnaK7M&imgrefurl=https%3A%2F%2Fk21academy.com%2Fkubernetes%2Fkubernete...'
        },
        url: 'https://k21academy.com/kubernetes/kubernetes-architecture-components-overview-for-beginners/'
      },
      {
        title: 'Kubernetes Architecture & Components With Diagram',
        image: {
          url: 'https://k21academy.com/wp-content/uploads/2020/06/KubernetesArchitecture_BlogImage.png',
          width: 1920,
          height: 1080
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQowI38nDqDhJyzCcCMo6HbhRzZVqTz3eN5vQ&s',
          width: 300,
          height: 168
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fk21academy.com%2Fwp-content%2Fuploads%2F2020%2F06%2FKubernetesArchitecture_BlogImage.png&tbnid=3ZqW_BCbtHLujM&imgrefurl=https%3A%2F%2Fk21academy.com%2Fkubernetes%2Fku...'
        },
        url: 'https://k21academy.com/kubernetes/kubernetes-architecture-components-overview-for-beginners/'
      },
      {
        title: 'Kubernetes Cluster Architecture Template | Moqups',
        image: {
          url: 'https://landing.moqups.com/img/_optimized/templates/diagrams/network/kubernetes-cluster-architecture-w400.jpeg',
          width: 400,
          height: 225
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj10b3OZsMou2vLtgIp9LhhuWbICI_Up9FBw&s',
          width: 300,
          height: 168
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Flanding.moqups.com%2Fimg%2F_optimized%2Ftemplates%2Fdiagrams%2Fnetwork%2Fkubernetes-cluster-architecture-w400.jpeg&tbnid=7TJpFcAi9LKxtM&imgrefurl=https%3A%2F%2Fmoqups...'
        },
        url: 'https://moqups.com/templates/mapping-and-diagramming/network-diagrams/kubernetes-diagram/'
      },
      {
        title: 'Kubernetes Architecture Explained: Components & Workloads ...',
        image: {
          url: 'https://www.cherryservers.com/v3/assets/blog/2025-05-19/img-01.png',
          width: 1940,
          height: 1420
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7sVHW5fdMKuR6edERM6TSegEvvluorkUFGg&s',
          width: 262,
          height: 192
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.cherryservers.com%2Fv3%2Fassets%2Fblog%2F2025-05-19%2Fimg-01.png&tbnid=4cogRm6allw4SM&imgrefurl=https%3A%2F%2Fwww.cherryservers.com%2Fblog%2Fkubernetes-architectu...'
        },
        url: 'https://www.cherryservers.com/blog/kubernetes-architecture'
      },
      {
        title: 'Kubernetes Architecture. | AWS in Plain English',
        image: {
          url: 'https://miro.medium.com/1*eVqphQ2aNKxqHPMPxjRzAA.png',
          width: 3600,
          height: 2100
        },
        thumbnail: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFvZkFinrLD3fsriiuepPhNz11of2lpOojsQ&s',
          width: 294,
          height: 171
        },
        google: {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmiro.medium.com%2F1*eVqphQ2aNKxqHPMPxjRzAA.png&tbnid=00qrBs-bE_alIM&imgrefurl=https%3A%2F%2Faws.plainenglish.io%2Fkubernetes-architecture-c93cb9c798d8&docid=TK_OpSJJm...'
        },
        url: 'https://aws.plainenglish.io/kubernetes-architecture-c93cb9c798d8'
      }
    ]
  },
  videos: {
    code: `const page = await google(
  'node.js streams tutorial',
  { type: 'videos' }
)`,
    payload: [
      {
        title: 'Learn Node.js Streams in 25 minutes | NodeJS Tutorials for ...',
        channel: 'Dipesh Malvia',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQjpuhWZ9Rk8IvRvNx0RTrG9BMPxhTHpxDlr-eY6Be27o0iWf4x6QO3w&s'
        },
        date: '2024-08-22T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=EcznOgzOdxI',
        description:
          'In this video we will understand what are streams, types of streams and their uses in Node.js ? You will learn how to create Readable, ...',
        publisher: 'YouTube',
        duration: 1502000,
        duration_pretty: '25m'
      },
      {
        title: 'A Deep Dive into Node.js Streams | Masterclass',
        channel: 'Platformatic',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTyiTytiwE98fnqJb1Brv8a8IbuckuN7k-1ScStstbA9ly6503r2o1rQ&s'
        },
        date: '2024-04-22T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=edB964-YYpE',
        description:
          'Streams are the lifeblood of many Node.js applications, enabling efficient data processing and manipulation. But their evolution has been ...',
        publisher: 'YouTube',
        duration: 4546000,
        duration_pretty: '1h'
      },
      {
        title: 'Everything You Should Know about Node.js Streams ...',
        channel: 'Erick Wendel',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZgLRtzNYcjtOBb0DzCBK3IW3PD79e-_Zo_3d7NBH2mDF9xkUTDFGdCw&s'
        },
        date: '2022-05-24T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=BdePYKgrMh0',
        description:
          "Hello, my friend. I'm Erick Wendel and welcome to one of the most important videos on this channel. Today is the #NodejsStreams day, ...",
        publisher: 'YouTube',
        duration: 2690000,
        duration_pretty: '45m'
      },
      {
        title: '10. Mastering Node.js Streams: The Ultimate Guide for High ...',
        channel: 'Leela Web Dev',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBOBzmtYXn0QqEajloiJ_G8kuZ0cEYwICMVUiFYKY58ImqUaHd553Yw&s'
        },
        date: '2025-03-24T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=eTWWHB_iDjM',
        description:
          'Node.js Streams Explained Like Never Before! Streams are one of the most powerful and important concepts in Node.js, allowing you to ...',
        publisher: 'YouTube',
        duration: 545000,
        duration_pretty: '9m'
      },
      {
        title: 'Node.js Streams Tutorial - An Introduction to Node.js Streams',
        channel: 'Fullstack Academy',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmWQX_fFDsmVgUcG01u0szcaPAY1z5LpMBkRw3bzgbpjyJXjMhFiVf9Q&s'
        },
        video: {
          url: 'https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcTPLGiupHfwURRNB9wrN4MyMbisR4Q7To4T_w'
        },
        date: '2017-01-27T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=YpVDaVufDVU',
        description:
          'Learn more advanced front-end and full-stack development at: https://www.fullstackacademy.com Streams are the basic I/O of node processes.',
        publisher: 'YouTube',
        duration: 823000,
        duration_pretty: '14m'
      },
      {
        title: 'Node JS Tutorial for Beginners #13 - Streams and Buffers',
        channel: 'Net Ninja',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaKGJfxl3So_cXnNNp-B2SZyRE_CI_R-0T-35VZ_7N17ZJp8BAn8KEYQ&s'
        },
        date: '2016-06-04T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=GlybFFMXXmQ',
        description:
          "Alright gang, in this node js tutorial I'll show you how streams and buffers work, so that we're fully prepared to use them within our node ...",
        publisher: 'YouTube',
        duration: 276000,
        duration_pretty: '5m'
      },
      {
        title: 'Node JS Tutorial for Beginners #14 - Readable Streams',
        channel: 'Net Ninja',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShTc1LT2ABRkAl9RoEe3cgygjJ7g_lkdFFSeGtGi-v-soY2IC3os6USQ&s'
        },
        video: {
          url: 'https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcR7N2Vj0ZpBXZG07pdGzgrPzNMcUhdymfSKiA'
        },
        date: '2016-06-04T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=E3tTzx0Qoj0',
        description:
          "Hey gang, in this tutorial I'll show you how we can create a readable stream and use it to read data / files. Using a readable stream means ...",
        publisher: 'YouTube',
        duration: 505000,
        duration_pretty: '8m'
      },
      {
        title:
          'Node.js Stream Tutorial - The Power and Simplicity of Node.js ...',
        channel: 'Fullstack Academy',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy295dFt5c7V9Vddt7xJkbZit-QZpfw-hrpyUwC79729XutRtXzlYAhg&s'
        },
        video: {
          url: 'https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcQvARpjNY_W_L5F54fArL7dWlg87B9uWcVHmg'
        },
        date: '2016-03-09T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=GpGTYp_G9VE',
        description:
          'Learn more advanced front-end and full-stack development at: https://www.fullstackacademy.com In this Node.js Stream Tutorial, ...',
        publisher: 'YouTube',
        duration: 603000,
        duration_pretty: '10m'
      },
      {
        title: 'Node.js Tutorial - 28 - Streams',
        channel: 'Codevolution',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6eC71pF3VbCaJhaltNCf-h6SdHPKA-3OVS_axDdIzktS9dc-fnz8lYg&s'
        },
        date: '2022-12-29T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=qnzC6vpBuxw',
        description:
          'Syncfusion components: https://syncf.co/3Emhvnv Courses - https://learn.codevolution.dev/ Support UPI ...',
        publisher: 'YouTube',
        duration: 444000,
        duration_pretty: '7m'
      },
      {
        title: 'Node JS Tutorial for Beginners #15 - Writable Streams',
        channel: 'Net Ninja',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9BCWcS7vzj_2uKXnJhEKfgUyRkyr0MG2xC9iQ3u07zMOVI6nvr6biQ&s'
        },
        video: {
          url: 'https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcTNspsoz-ct1zXvDu90sQeVwI04SObX_hnTEg'
        },
        date: '2016-06-06T12:00:00.000Z',
        url: 'https://www.youtube.com/watch?v=DvlCT0N7yQI',
        description:
          "Hey gang, in this node js tutorial I'll show you how we can write data from our read stream, into a writable stream. This is useful for ...",
        publisher: 'YouTube',
        duration: 310000,
        duration_pretty: '5m'
      }
    ]
  },
  places: {
    code: `const page = await google(
  'coworking space barcelona',
  { type: 'places' }
)`,
    payload: [
      {
        title: 'Betahaus | Coworking Barcelona',
        address: 'Carrer de Vilafranca, 7',
        latitude: 41.406982,
        longitude: 2.1567652,
        rating: 4.8,
        category: 'Coworking space',
        cid: '15533147541347981884',
        ratingCount: 415
      },
      {
        title: 'OneCoWork Plaça Catalunya | Coworking Barcelona',
        address: "Carrer d'Estruc, 9",
        latitude: 41.386887,
        longitude: 2.1725054,
        rating: 4.8,
        category: 'Coworking space',
        cid: '17996530463156601469',
        ratingCount: 407
      },
      {
        title: 'La Vaca Coworking Barcelona',
        address: 'Carrer de la Creu dels Molers, 19',
        latitude: 41.37411,
        longitude: 2.161943,
        rating: 4.8,
        category: 'Coworking space',
        cid: '4834554333533549252',
        ratingCount: 230
      },
      {
        title: 'MOB Bailèn - Coworking and Office Space',
        address: 'Carrer de Bailèn, 11',
        latitude: 41.39172,
        longitude: 2.1771004,
        rating: 4.6,
        category: 'Coworking space',
        cid: '13299489476143730614',
        ratingCount: 223
      },
      {
        title: 'Cowork Rambla Catalunya - Coworking Barcelona',
        address: 'Carrer de Còrsega, 284, Principal',
        latitude: 41.394547,
        longitude: 2.1571114,
        rating: 4.9,
        category: 'Coworking space',
        cid: '9129977521634770336',
        ratingCount: 77
      },
      {
        title: 'OneCoWork Catedral | Coworking Barcelona',
        address: 'Av. de la Catedral, 6',
        latitude: 41.38499,
        longitude: 2.1767638,
        rating: 4.8,
        category: 'Coworking space',
        cid: '26994854670691987',
        ratingCount: 350
      },
      {
        title: 'Meet BCN - Coworking Space in Barcelona',
        address: 'Rambla de Catalunya, 125, 3º 2ª',
        latitude: 41.39486,
        longitude: 2.1580021,
        rating: 4.8,
        category: 'Coworking space',
        cid: '9207037350412934511',
        ratingCount: 62
      },
      {
        title: 'Aticco Bailén - Coworking Eixample Dreta',
        address: 'Carrer de Bailèn, 105',
        latitude: 41.397224,
        longitude: 2.1700168,
        rating: 5,
        category: 'Coworking space',
        cid: '10952575797319711624',
        ratingCount: 125
      },
      {
        title: "OneCoWork Portal de l'Àngel | Coworking Barcelona",
        address: "Av del Portal de l'Àngel, 40",
        latitude: 41.386753,
        longitude: 2.1720808,
        rating: 4.9,
        category: 'Coworking space',
        cid: '16562339305811091112',
        ratingCount: 345
      },
      {
        title: 'Coworking Sant Antoni Barcelona | Oficina Virtual & Day Pass',
        address: 'Carrer de Floridablanca, 68',
        latitude: 41.378025,
        longitude: 2.1580195,
        rating: 4.9,
        category: 'Coworking space',
        cid: '17007657023756567986',
        ratingCount: 88
      }
    ]
  },
  maps: {
    code: `const page = await google(
  'software engineering conferences madrid',
  { type: 'maps' }
)`,
    payload: [
      {
        title: 'Madrid',
        address: 'Madrid, Spain',
        latitude: 40.4167279,
        longitude: -3.7032905,
        cid: '14138733002322879081',
        fid: '0xd422997800a3c81:0xc436dec1618c2269',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAweqAxghmpyB1JjHCf4zn1Dy3w3Xp4CZQX0MLthjBF5a_rJD39ELfIK2Pl75fi5UIagttMb2eSUGBHqw2cdkp7w-CDWtAZHgFiHji2ZkPdAmR84zOtx5qUpCBMvls8mXuFzw5pZ0'
        },
        place: {
          id: 'ChIJgTwKgJcpQg0RaSKMYcHeNsQ'
        }
      }
    ]
  },
  shopping: {
    code: `const page = await google(
  'ergonomic mechanical keyboard',
  { type: 'shopping' }
)`,
    payload: [
      {
        title:
          'Split Ergonomic Mechanical Keyboard – For Peak Gaming & Productivity, Purple & Black',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:17935785122201653129,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Ragnok',
        id: '17935785122201653129',
        price: {
          symbol: '$',
          amount: 139
        }
      },
      {
        title: 'Cloud Nine ErgoTKL Ergonomic Tenkeyless Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:1799026807223094785,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Cloud Nine Ergo',
        id: '1799026807223094785',
        price: {
          symbol: '$',
          amount: 199
        },
        rating: {
          score: 2.8,
          total: 5,
          reviews: 4
        }
      },
      {
        title: 'EPOMAKER Split70 Linear Switch V2',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:787074893438288682,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvor...',
        publisher: 'epomaker',
        id: '787074893438288682',
        price: {
          symbol: '$',
          amount: 98.59
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 1
        }
      },
      {
        title: 'Kinesis Advantage360 Professional Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:5851029989384616877,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Applied Ergonomics',
        id: '5851029989384616877',
        price: {
          symbol: '$',
          amount: 479
        },
        rating: {
          score: 4.3,
          total: 5,
          reviews: 14
        }
      },
      {
        title: 'NocFree Wireless Ergonomic Split Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:1985484341527203808,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Walmart - NocFree',
        id: '1985484341527203808',
        price: {
          symbol: '$',
          amount: 142.49
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 1
        }
      },
      {
        title: 'Adesso Ergonomic Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:4410575870637092971,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Target',
        id: '4410575870637092971',
        price: {
          symbol: '$',
          amount: 144.99
        },
        rating: {
          score: 4,
          total: 5,
          reviews: 2
        }
      },
      {
        title: 'Cloud Nine ErgoTKL Ergonomic Tenkeyless Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:1799026807223094785,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Cloud Nine Ergo',
        id: '1799026807223094785',
        price: {
          symbol: '$',
          amount: 199
        },
        rating: {
          score: 2.8,
          total: 5,
          reviews: 4
        }
      },
      {
        title: 'Kinesis Advantage360 Professional Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:5851029989384616877,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Applied Ergonomics',
        id: '5851029989384616877',
        price: {
          symbol: '$',
          amount: 479
        },
        rating: {
          score: 4.3,
          total: 5,
          reviews: 14
        }
      },
      {
        title: 'EPOMAKER Tide Alice',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:949467712478366455,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvor...',
        publisher: 'epomaker',
        id: '949467712478366455',
        price: {
          symbol: '$',
          amount: 90.99
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 1
        }
      },
      {
        title: 'Perixx PERIBOARD-535 DE RD Wired Ergonomic Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:4479548521954660194,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Perixx USA',
        id: '4479548521954660194',
        price: {
          symbol: '$',
          amount: 89.99
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 2
        }
      },
      {
        title: 'Adesso Ergonomic Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:4410575870637092971,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Target',
        id: '4410575870637092971',
        price: {
          symbol: '$',
          amount: 144.99
        },
        rating: {
          score: 4,
          total: 5,
          reviews: 2
        }
      },
      {
        title: 'EPOMAKER Tide Alice',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:949467712478366455,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvor...',
        publisher: 'epomaker',
        id: '949467712478366455',
        price: {
          symbol: '$',
          amount: 90.99
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 1
        }
      },
      {
        title: 'Logitech G515 RAPID TKL Analog Gaming Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:11796844663026228693,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Logitech G',
        id: '11796844663026228693',
        price: {
          symbol: '$',
          amount: 169.99
        },
        rating: {
          score: 4.8,
          total: 5,
          reviews: 286
        }
      },
      {
        title: 'Kinesis Mwave Mechanical Keyboard for Mac',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:8856168076382528758,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Office Depot',
        id: '8856168076382528758',
        price: {
          symbol: '$',
          amount: 119
        },
        rating: {
          score: 4.4,
          total: 5,
          reviews: 9
        }
      },
      {
        title: 'SteelSeries Apex 9 Gaming Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:10998950219315172713,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Walmart',
        id: '10998950219315172713',
        price: {
          symbol: '$',
          amount: 128.79
        },
        rating: {
          score: 4.7,
          total: 5,
          reviews: 842
        }
      },
      {
        title:
          'Split Ergonomic Mechanical Keyboard – For Peak Gaming & Productivity Purple & Black',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:5893816578549597527,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Ragnok',
        id: '5893816578549597527',
        price: {
          symbol: '$',
          amount: 139
        }
      },
      {
        title: 'X-Bows Crystal Wireless Ergonomic Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:3723651216831011350,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'X-bows',
        id: '3723651216831011350',
        price: {
          symbol: '$',
          amount: 249
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 1
        }
      },
      {
        title: 'Cloud Nine ErgoTKL Ergonomic Tenkeyless Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:1799026807223094785,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Cloud Nine Ergo',
        id: '1799026807223094785',
        price: {
          symbol: '$',
          amount: 199
        },
        rating: {
          score: 2.8,
          total: 5,
          reviews: 4
        }
      },
      {
        title: 'Perixx PERIBOARD-535 DE RD Wired Ergonomic Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:4479548521954660194,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Perixx USA',
        id: '4479548521954660194',
        price: {
          symbol: '$',
          amount: 89.99
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 2
        }
      },
      {
        title:
          'Advantage360 Signature Series Pro Bluetooth Black Kailh PBT QWERTY White',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:788202757767293001,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvor...',
        publisher: 'Kinesis Ergo',
        id: '788202757767293001',
        price: {
          symbol: '$',
          amount: 599
        }
      },
      {
        title: 'Delton KB450 Wireless Ergonomic Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:12721208936725561960,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: "Macy's",
        id: '12721208936725561960',
        price: {
          symbol: '$',
          amount: 169.99
        }
      },
      {
        title:
          'NocFree Wireless Ergonomic Split Mechanical Keyboard - Tactile, Hot-Swappable, Compact 60% Layout, Programmable for Mac & Windows, PBT Keycaps(Standar',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:1418172368332421170,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Newegg.com - Dazan Technology',
        id: '1418172368332421170',
        price: {
          symbol: '$',
          amount: 266.99
        }
      },
      {
        title: 'EPOMAKER Tide Alice',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:949467712478366455,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvor...',
        publisher: 'epomaker',
        id: '949467712478366455',
        price: {
          symbol: '$',
          amount: 90.99
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 1
        }
      },
      {
        title: 'Adesso Ergonomic Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:4410575870637092971,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Target',
        id: '4410575870637092971',
        price: {
          symbol: '$',
          amount: 144.99
        },
        rating: {
          score: 4,
          total: 5,
          reviews: 2
        }
      },
      {
        title: 'Glove80 Ergonomic Keyboard Revision 2',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:7925435965804686223,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'MoErgo',
        id: '7925435965804686223',
        price: {
          symbol: '$',
          amount: 384
        }
      },
      {
        title: 'Logitech MX Mechanical Mini Illuminated Wireless Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:13493395799888840980,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Staples',
        id: '13493395799888840980',
        price: {
          symbol: '$',
          amount: 159.99
        },
        rating: {
          score: 4.5,
          total: 5,
          reviews: 1300
        }
      },
      {
        title:
          'QK Alice Duo - Ergonomic Alice Mechanical Keyboard Split Alice Layout Anodized Lilac',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:1113123621036949826,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'LumeKeebs',
        id: '1113123621036949826',
        price: {
          symbol: '$',
          amount: 245
        }
      },
      {
        title: 'Razer Pro Type Ultra Wireless Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:17962376203861668705,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Razer.com',
        id: '17962376203861668705',
        price: {
          symbol: '$',
          amount: 159.99
        },
        rating: {
          score: 4.5,
          total: 5,
          reviews: 161
        }
      },
      {
        title: 'Kinesis Freestyle2 Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:13860204367571092781,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'AskErgoWorks',
        id: '13860204367571092781',
        price: {
          symbol: '$',
          amount: 105
        },
        rating: {
          score: 4.5,
          total: 5,
          reviews: 111
        }
      },
      {
        title: 'PERIBOARD-335 Compact Ergo-Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:5023999797343108242,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Walmart - Perixx USA',
        id: '5023999797343108242',
        price: {
          symbol: '$',
          amount: 51.99
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 1
        }
      },
      {
        title:
          'Dareu DK100 Mechanical Keyboard 87 Key Full Key Without Conflict Black Switch Full Mechanical Keys Ergonomics Quick Response',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:11415342805044694849,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Newegg.com - BRIGHTOR',
        id: '11415342805044694849',
        price: {
          symbol: '$',
          amount: 108.99
        }
      },
      {
        title: 'Kinesis Mwave Mechanical Keyboard for Mac',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:8856168076382528758,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Office Depot',
        id: '8856168076382528758',
        price: {
          symbol: '$',
          amount: 119
        },
        rating: {
          score: 4.4,
          total: 5,
          reviews: 9
        }
      },
      {
        title: 'Backlit Split Ergonomic Wireless Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:11449738508354331472,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'ProtoArc',
        id: '11449738508354331472',
        price: {
          symbol: '$',
          amount: 83.98
        },
        rating: {
          score: 4.8,
          total: 5,
          reviews: 13
        }
      },
      {
        title:
          'RK Royal KLUDGE A72 Alice Layout Ergonomic Wireless Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:165197892936458201,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvor...',
        publisher: 'RK Royal Kludge',
        id: '165197892936458201',
        price: {
          symbol: '$',
          amount: 89.99
        }
      },
      {
        title: 'Keychron Q8 Custom Mechanical Keyboard',
        image: {
          url: 'data:image/webp;base...'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:9688723178204040533,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Keychron.com',
        id: '9688723178204040533',
        price: {
          symbol: '$',
          amount: 89.99
        },
        rating: {
          score: 4.2,
          total: 5,
          reviews: 48
        }
      },
      {
        title: 'Logitech Wave Keys Keyboard Wireless',
        image: {
          url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ3ml-1Q59jSe8XhocB5_vBJ-abC1Bk7D9dABIYiF9PnNbU0NoPj5u8Yn86Hk5ADJtvSjPR-iIlNq7EIe4BypJvDZdSY9Rt4AWLbK1MYxsfNpuJ9UTFkQNk'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:1685629042486258331,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Logitech',
        id: '1685629042486258331',
        price: {
          symbol: '$',
          amount: 59.99
        },
        rating: {
          score: 4.6,
          total: 5,
          reviews: 1600
        }
      },
      {
        title: 'Kinesis Advantage360 Professional Keyboard',
        image: {
          url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhvRRDR4R385GRZsH6lJnYhcyFYOjrTxuGqlSYRJBiXphpfBuGRMB1WydD21-g3_Au1zmv74TvfqK9VJmDmoGk5Ni4_H6LqOgww33kNkMLnbMrmqUKdZ9f'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:18385868913097195897,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Newegg.com - ErgoWorks',
        id: '18385868913097195897',
        price: {
          symbol: '$',
          amount: 479
        },
        rating: {
          score: 5,
          total: 5,
          reviews: 1
        }
      },
      {
        title:
          "Ergonomic sturdy UltraThin 78 Keys Mechanical Keyboard PC Laptops Black, Men's, Size: Small",
        image: {
          url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQEAfFfN4Rr9cibAM05y-n3Bpqxwmd5wI1UXWUtyMzBpRI4M23qUE87he0VV5jpFurBKwQ7sxrNVmDhooWcX0IfoMgrAgkm6VH-jHGfCDNp1rK9omIdd6d2'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:4576825409001063544,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Walmart - enjoy show',
        id: '4576825409001063544',
        price: {
          symbol: '$',
          amount: 13.72
        }
      },
      {
        title: 'Dygma Defy Silver Kailh Wireless Tenting',
        image: {
          url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR9ugDLQTBVFCl6Jw3OezvZTvKCURGQQz0VBxemex7m_LF0rGA6_IqpsNjYtAVJPVBeAdrTg54Ys455tDt7S83HDZ9Yo3XWNnGd0Jvg0YIFGn5NaHJ3w3DbWQ'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:745604498899220222,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvor...',
        publisher: 'Dygma',
        id: '745604498899220222',
        price: {
          symbol: '$',
          amount: 369
        }
      },
      {
        title: 'NuPhy Node Series Low-Profile Wireless Mechanical Keyboard',
        image: {
          url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTfI9veEvuzNFDziDEsizDcJFcpFGGtoTt9Gi5B2HyrM9Z-WAsJepMbSX246dv0UY4FOnWBjQkHgcdelBCu_9_AOpEqL8DsqrRVtj9TF7RUcR_jGJYrfMOC'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:10081971760334612391,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'NUPHY',
        id: '10081971760334612391',
        price: {
          symbol: '$',
          amount: 99.95
        },
        rating: {
          score: 4.8,
          total: 5,
          reviews: 66
        }
      },
      {
        title: 'AZIO IZO Wireless Mechanical Keyboard',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSADdsK8UpHGBsGoB3ertRUKFG3Y0zBsAS-NLzGLXWEAlqWPWtT3ZCjiF9-8RSU3o9eM6Zkx-2b6vG3EyF35ZdKLFmoYlpcgsVerSycyn71-P98jutAsYGz'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:14502479469413245149,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Best Buy',
        id: '14502479469413245149',
        price: {
          symbol: '$',
          amount: 150.01
        },
        rating: {
          score: 4.8,
          total: 5,
          reviews: 33
        }
      },
      {
        title:
          'RKS70 Ergonomic Split Mechanical Keyboard, Wireless Bluetooth/2.4G/Wired Keyboard with Wrist Rest, 75% RGB PC Gaming Keyboards for Win/Mac, Hot Swappa',
        image: {
          url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSmdyhHNXHgN7IQ21evq6tVKDV-_0zHH-wMX9PL-WXmR3FqYcQ-cQietPC6LfzyGTYjb_3dzpANQ1r9iPCY3sx9aRfvyeYJl-k3Y9Amnya3'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:16248652978570886673,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Newegg.com - Halo Electronics',
        id: '16248652978570886673',
        price: {
          symbol: '$',
          amount: 190.18
        }
      },
      {
        title:
          '69 Key Ergonomic Mechanical Gaming Keyboard USB C Detachable Cable 18 RGB Backlight Modes Silent Office Design Anti Ghosting For PC Mac, Size:',
        image: {
          url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQeLczF6NjlbPVijuL01J8rREOLGwGLwOvn7vAp25qZuHWJK5X40D2z_lBi_T9y4_fq0-FoXqnerBVEKVNxvxIUzhiMPgUea09tNSR5FwWovJ0JMbUaIuhUkw'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:12373062584766547400,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Walmart - yifashengshop',
        id: '12373062584766547400',
        price: {
          symbol: '$',
          amount: 35.82
        }
      },
      {
        title: 'Kensington Pro Fit Ergo Keyboard',
        image: {
          url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT2YUFOzmAc32fRVjPhZlTRO4KzMvm64w59SxVWqKjcT3lZI4BBdBwJQJe-V_KctfILOblXl9uD3WOmwmEl7PUEtOokmZ3Tpn9jFwD_PK65C1B5s8HGrs76'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:12312594975402105173,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Lenovo',
        id: '12312594975402105173',
        price: {
          symbol: '$',
          amount: 73.99
        },
        rating: {
          score: 4.2,
          total: 5,
          reviews: 6
        }
      },
      {
        title: 'Battleye 74.5 RT – Ergonomic Magnetic Mechanical Keyboard',
        image: {
          url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ6JjiYHOsFczWLkyvQRcNSJVlKx9CIdgpfU-ZfwKRUcOpEVkVwYxIaKRRBgNcBZHVyBt4Ia5zBpUqnB6nJHbK6BKeDoK_gBjAHjM7qy_cgvaDwF-d9cr32'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:15722675640406542896,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Angry Miao',
        id: '15722675640406542896',
        price: {
          symbol: '$',
          amount: 219
        }
      },
      {
        title: 'Kinesis Freestyle Pro Keyboard',
        image: {
          url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRQjoWAfnceiJ5HhF7Z-w8E6CiUhmXJe2guvWt22Mf1wXOdbULeQay7t1ap4sC3zna6LU60xQKE9MqBQi3dh4lXrujrWRPVX6ig2Cpk7bd-DL5IhF8AFV85OQ'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:1690779934272688707,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Jestik',
        id: '1690779934272688707',
        price: {
          symbol: '$',
          amount: 169
        },
        rating: {
          score: 4.4,
          total: 5,
          reviews: 10
        }
      },
      {
        title:
          'M MAKETHEONE Ergonomic Mechanical Keyboard, X-Bows Butterfly Layout Mech Keebs, USB-C Wired 80% Ergo KB with Quiet and Linear Red Switches for Desktop',
        image: {
          url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTLhfN2DBNsuS5piDMiy13GQuA30VVXPQZ6ODSdEbBK0QFiU5unaskXzS2U5hofEPVinWWn0ZBiTs1GbXxRpFR9hDw-K67tGi1V55H9aoiW08l5-Uvz65Ph'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:2646710097643572364,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Newegg.com - Dazan Technology',
        id: '2646710097643572364',
        price: {
          symbol: '$',
          amount: 123.99
        }
      },
      {
        title: 'AULA Sapphire Mechanical Keyboard',
        image: {
          url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS8AeWoC-8d_eyY34C5Wdjs0TtrkWd-SmqEvinhGP27oM7xau0_vTx7J7-Jtwtf059LbC-vlVYGv9Grj9FdVbJIjKxzam_kL-QSOqgYevUOyKUWJxOiYd_6'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:17656568022296257001,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Walmart - Avenue A Stores LLC',
        id: '17656568022296257001',
        price: {
          symbol: '$',
          amount: 38.48
        }
      },
      {
        title: 'Nocfree & Split Ergonomic Mechanical Keyboard',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRnGWQ7Upmg5-rFLrKYYr5p8gDGJd984QYjSHLa-uik5jdh12qhnkbU5jkHRLexzgHYhOA4I2ijL-NUMtW630P4jYXu4YiX0qrvpIxbzAFYzciejrosbK8-jw'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:10850790791428877117,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'NocFree',
        id: '10850790791428877117',
        price: {
          symbol: '$',
          amount: 269
        }
      },
      {
        title: 'IQUNIX EZ60/EZ63 HE EZ63 Magnetic Jade',
        image: {
          url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTMM5YjLpNcY-vYi8bfvc1G90Ec53g94xQJFX9ESPBtC8VFZfC7fYWpoTiZo2pDyTjkBthLhCsM1vH2TEo6Z_1BYfa1zTDy0UwKgqvUBjmQop0Nr4eg5gnmJg'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:4735864011166130943,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'iqunix',
        id: '4735864011166130943',
        price: {
          symbol: '$',
          amount: 219
        },
        rating: {
          score: 4.8,
          total: 5,
          reviews: 21
        }
      },
      {
        title:
          'Cute Ergonomic Keyboard Backlit Mechanical Keyboard Set Gaming Mouse and Multimedia Functions',
        image: {
          url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQyItb1IVJtq7XVtH0cc6xvIndjbRr6oS22Ha3ACKnrXDcqvR0ePX-dGKZeOgaNwbtk7kmsPXLd-BeYk-fL8BSBToaQg4dwqw'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:6375707415296184994,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'newegg.com',
        id: '6375707415296184994',
        price: {
          symbol: '$',
          amount: 122.99
        }
      },
      {
        title: 'JLab Epic Mechanical Keyboard',
        image: {
          url: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcREE82TZ11p7hQXQ86TpHxz675lNIgYszS071QRWUJN665EcyHTYoWGUuw_f-cmft6SzZvCZ2nth6g7tuq2EnohwlF7B-E1qgWAvwwORiAkD4149UVp2NDb'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:14698639777559499420,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Best Buy',
        id: '14698639777559499420',
        price: {
          symbol: '$',
          amount: 99.99
        },
        rating: {
          score: 4.2,
          total: 5,
          reviews: 151
        }
      },
      {
        title:
          'Silakka54 Split Keyboard Ergonomic Split Customization ZMK Hot Swappable Left and Right Keyboards, Use Nice! As The Main Controller, NanoV2 Supports',
        image: {
          url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTAfPebCHMYZfL0IlWU8PVaPXi8MmYxhgk1U8cenypn0MuNp-jgdgRdsltKe_7bXsUzQ2KnRWguZtCeL-4jv6Bhi4oiFdEhFuuZ35BjE-0GeDL8e0NG3SO4'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:9152952074137698567,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvo...',
        publisher: 'Walmart - DiploMart',
        id: '9152952074137698567',
        price: {
          symbol: '$',
          amount: 81.32
        }
      },
      {
        title: 'Kinesis Advantage360 Keyboard',
        image: {
          url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT2I0b9x0IZ9UvFB2TPxPoK7xll2GZfxGmdJKcGmAYiqeWmuGl35UQx8croQ0wgd3sahvirOXe9W3gk7R8AlJFxTJFl_9c8valjHbWU-ljxDYzOLpU4Ry18_A'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:18029360982627764737,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Kinesis Ergo',
        id: '18029360982627764737',
        price: {
          symbol: '$',
          amount: 499
        },
        rating: {
          score: 4,
          total: 5,
          reviews: 10
        }
      },
      {
        title:
          '[In Stock] CK Alice Ergonomics Wired Mechanical Keyboard Kit Glass Green / Yes',
        image: {
          url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTFjju3hRYTgJwQIPjtISMqz0lZvBLnNw-1Jpug-MEpi5zCa2YdUeq7b8pI6OpOXJyY0BIqsoMaM6YrCxz3iCcrk_ERah-Yvzx1FBOPMhirID_wqV0yHOEw'
        },
        url: 'https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:14555634312161027434,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pv...',
        publisher: 'Velocifire',
        id: '14555634312161027434',
        price: {
          symbol: '$',
          amount: 99
        }
      }
    ]
  },
  scholar: {
    code: `const page = await google(
  'attention is all you need transformer',
  { type: 'scholar' }
)`,
    payload: [
      {
        title: 'Attention is all you need',
        year: 2017,
        id: '5Gohgn6QFikJ',
        pdf: {
          url: 'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf'
        },
        url: 'https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html',
        description:
          '… work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention … , we will describe the Transformer, motivate self-attention and …',
        publisher:
          'A Vaswani, N Shazeer, N Parmar… - Advances in neural …, 2017 - proceedings.neurips.cc',
        citations: 237401
      },
      {
        title:
          'Attention is all you need: An interpretable transformer-based asset allocation approach',
        year: 2023,
        id: 'jNUTQ2zkN9AJ',
        url: 'https://www.sciencedirect.com/science/article/pii/S1057521923003927',
        description:
          '… Chinese stock market, we propose a return-risk trade-off strategy via a new transformer model. The empirical findings show that these updates, such as the self-attention mechanism in …',
        publisher:
          'T Ma, W Wang, Y Chen - International Review of Financial Analysis, 2023 - Elsevier',
        citations: 50
      },
      {
        title:
          'Spectformer: Frequency and attention is what you need in a vision transformer',
        year: 2025,
        id: 'GmB9gVn1UI8J',
        pdf: {
          url: 'https://arxiv.org/pdf/2304.06446'
        },
        url: 'https://ieeexplore.ieee.org/abstract/document/10943595/',
        description:
          '… work, we aim to specifically analyse the transformer for the … They do use self-attention in deeper layers to capture longer … transformers, we developed SpectFormer, a new transformer …',
        publisher:
          'BN Patro, VP Namboodiri… - 2025 IEEE/CVF winter …, 2025 - ieeexplore.ieee.org',
        citations: 188
      },
      {
        title:
          'Cross-attention is all you need: Adapting pretrained transformers for machine translation',
        year: 2021,
        id: 'UYb-m2T5pXAJ',
        pdf: {
          url: 'https://aclanthology.org/2021.emnlp-main.132.pdf'
        },
        url: 'https://aclanthology.org/2021.emnlp-main.132/',
        description:
          '… We study the power of cross-attention in the Transformer architecture within the context of … the findings of studies into crossattention when training from scratch. We conduct a series of …',
        publisher:
          'M Gheini, X Ren, J May - Proceedings of the 2021 conference on …, 2021 - aclanthology.org',
        citations: 227
      },
      {
        title: 'Attention is all you need in speech separation',
        year: 2021,
        id: 'BwvwD2whQ64J',
        pdf: {
          url: 'https://arxiv.org/pdf/2010.13154'
        },
        url: 'https://ieeexplore.ieee.org/abstract/document/9413901/',
        description:
          '… Transformers are emerging as a natural alternative to standard RNNs, replacing recurrent … attention mechanism. In this paper, we propose the SepFormer, a novel RNN-free Transformer…',
        publisher:
          'C Subakan, M Ravanelli, S Cornell… - ICASSP 2021-2021 …, 2021 - ieeexplore.ieee.org',
        citations: 996
      },
      {
        title:
          'Linear attention is (maybe) all you need (to understand transformer optimization)',
        year: 2023,
        id: 'OO2zcvUpbcAJ',
        pdf: {
          url: 'https://arxiv.org/pdf/2310.01082'
        },
        url: 'https://arxiv.org/abs/2310.01082',
        description:
          '… Transformer with twice many heads matches that of linear Transformers; in other words, we need two softmax attention … In Figure 7, we show that linear attention performs significantly …',
        publisher:
          'K Ahn, X Cheng, M Song, C Yun, A Jadbabaie… - arXiv preprint arXiv …, 2023 - arxiv.org',
        citations: 108
      },
      {
        title:
          'Cross attention is all you need: Relational remote sensing change detection with transformer',
        year: 2024,
        id: 'TVjWgGIpG7sJ',
        pdf: {
          url: 'https://www.tandfonline.com/doi/pdf/10.1080/15481603.2024.2380126'
        },
        url: 'https://www.tandfonline.com/doi/abs/10.1080/15481603.2024.2380126',
        description:
          '… To unify these three modules into a simple pipeline, we introduce relational change detection transformer (RCDT), a novel and simple framework for remote sensing change detection …',
        publisher:
          'K Lu, X Huang, R Xia, P Zhang… - GIScience & Remote …, 2024 - Taylor & Francis',
        citations: 30
      },
      {
        title:
          'Attention is all you need: utilizing attention in AI-enabled drug discovery',
        year: 2024,
        id: '4ZRunyZN6eIJ',
        pdf: {
          url: 'https://academic.oup.com/bib/article-pdf/25/1/bbad467/55123365/bbad467.pdf'
        },
        url: 'https://academic.oup.com/bib/article-abstract/25/1/bbad467/7512647',
        description:
          '… Overall, this section underscores the transformative impact of attention mechanisms and the Transformer model in advancing predictive capabilities and understanding complex …',
        publisher:
          'Y Zhang, C Liu, M Liu, T Liu, H Lin… - Briefings in …, 2024 - academic.oup.com',
        citations: 152
      },
      {
        title: 'Attention is not all you need anymore',
        year: 2308,
        id: 'gWIVG-ZIvg0J',
        pdf: {
          url: 'https://arxiv.org/pdf/2308.07661'
        },
        url: 'https://arxiv.org/abs/2308.07661',
        description:
          '… Transformer with the self-attention mechanism, we train all the models with the same hyperparameters, settings, and training data. By “the same training data”, we mean that not only all …',
        publisher: 'Z Chen - arXiv preprint arXiv:2308.07661, 2023 - arxiv.org',
        citations: 7
      },
      {
        title: 'Fastformer: Additive attention can be all you need',
        year: 2108,
        id: '9_kFeQ_sO-wJ',
        pdf: {
          url: 'https://arxiv.org/pdf/2108.09084'
        },
        url: 'https://arxiv.org/abs/2108.09084',
        description:
          '… paper we propose Fastformer1, which is an efficient Transformer variant based on additive attention that … In Fastformer, we first use additive attention mechanism to summarize the input …',
        publisher:
          'C Wu, F Wu, T Qi, Y Huang, X Xie - arXiv preprint arXiv:2108.09084, 2021 - arxiv.org',
        citations: 244
      }
    ]
  },
  patents: {
    code: `const page = await google(
  'compiler optimization patent',
  { type: 'patents' }
)`,
    payload: [
      {
        title: 'Compiler optimization of coroutines',
        inventor: 'James J. Radigan',
        assignee: 'Microsoft Technology Licensing, Llc',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/ac/93/d3/2fabec0c0fbcfc/US10747511-20200818-D00000.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/28/a9/bc/bf16a91d8e7db3/US10747511.pdf'
        },
        url: 'https://patents.google.com/patent/US10747511B2/en',
        description:
          "As a memory usage optimization, a compiler identifies coroutines whose activation frames can be allocated on a caller's stack instead of allocating the frame on the heap. For example, when the compiler determines that...",
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/6b/0a/2a/25cc1b1bd2c00a/US10747511-20200818-D00000.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/cd/44/0a/7f5f9fe843f7ce/US10747511-20200818-D00000.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b3/2c/84/984028ae10670b/US10747511-20200818-D00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4c/30/14/83964434d800e0/US10747511-20200818-D00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/5b/69/fa/46510de9da9356/US10747511-20200818-D00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/25/e4/d4/5516e2cae06947/US10747511-20200818-D00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c6/37/0d/119f27a61061d4/US10747511-20200818-D00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/d8/aa/56/c4ea607a7562b9/US10747511-20200818-D00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/75/5f/40/6cf77097fc9a74/US10747511-20200818-D00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/0e/5a/f2/a97561dc6f5520/US10747511-20200818-D00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/93/d0/65/b6de2f47a115ba/US10747511-20200818-D00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/9a/2a/5e/a5d5beb055b7a7/US10747511-20200818-D00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/13/b5/2c/833fed728dea32/US10747511-20200818-D00006.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/cd/d0/75/9a3d8069b902a0/US10747511-20200818-D00006.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/0e/9d/d4/8bcbfed5ade64e/US10747511-20200818-D00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/fb/9d/42/9f2b234f7e367a/US10747511-20200818-D00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/37/75/d0/3c0201bfdd0bb9/US10747511-20200818-D00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/0f/d2/21/778c33f6e96c0a/US10747511-20200818-D00008.png'
            }
          }
        ],
        priority: {
          date: '2015-04-28T00:00:00.000Z'
        },
        filing: {
          date: '2015-06-26T00:00:00.000Z'
        },
        grant: {
          date: '2020-08-18T00:00:00.000Z'
        },
        publication: {
          date: '2020-08-18T00:00:00.000Z',
          number: 'US10747511B2'
        }
      },
      {
        title:
          'Optimization of loops and data flow sections in multi-core processor …',
        inventor: 'Martin Vorbach',
        assignee: 'Hyperion Core, Inc.',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/b8/e5/2a/8ccbb00957f2ec/US20200042492A1-20200206-D00000.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/3f/8e/c9/6cc1b5279f958f/US20200042492A1.pdf'
        },
        url: 'https://patents.google.com/patent/US20200042492A1/en',
        description:
          'The present invention relates to a method for compiling code for a multi-core processor, comprising: detecting and optimizing a loop, partitioning the loop into partitions executable and mappable on physical hardware ...',
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f0/92/64/954add0e9bbbb8/US20200042492A1-20200206-D00000.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/87/c4/14/b1554e8269310c/US20200042492A1-20200206-D00000.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e8/24/f4/61c5f1da7abf85/US20200042492A1-20200206-D00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/2e/f6/8a/79ce6b3bb18d1b/US20200042492A1-20200206-D00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3f/a9/b3/87f63b130e68eb/US20200042492A1-20200206-D00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/51/72/94/65b3dd0e95eef0/US20200042492A1-20200206-D00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/bc/8a/61/3d570364cabb12/US20200042492A1-20200206-D00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4a/c7/22/2cb1f83f69b649/US20200042492A1-20200206-D00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/20/c3/e5/5d1d37f0139da6/US20200042492A1-20200206-D00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f6/18/65/7488504aa1d1ca/US20200042492A1-20200206-D00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/0f/09/c1/fac696dc77f0d5/US20200042492A1-20200206-D00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/eb/a7/3a/417b2f02525bb9/US20200042492A1-20200206-D00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/32/d1/80/b4cec8675f7c74/US20200042492A1-20200206-D00006.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/83/48/6f/d69485036a9069/US20200042492A1-20200206-D00006.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e3/7f/36/e89b79411135d9/US20200042492A1-20200206-D00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/2d/bf/c1/9b21f697b17b55/US20200042492A1-20200206-D00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/cb/8a/0a/9e4d4c5fe572fc/US20200042492A1-20200206-D00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4b/e5/6e/3ae55ea81e22e9/US20200042492A1-20200206-D00008.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/36/f8/35/1ac4e08ac9588a/US20200042492A1-20200206-D00009.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/62/f8/70/42ace1083f20c5/US20200042492A1-20200206-D00009.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/68/3f/cc/ebfb414e0dd43c/US20200042492A1-20200206-D00010.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/79/34/5d/c1dd73b3535a4a/US20200042492A1-20200206-D00010.png'
            }
          }
        ],
        priority: {
          date: '2009-12-28T00:00:00.000Z'
        },
        filing: {
          date: '2019-06-19T00:00:00.000Z'
        },
        grant: {},
        publication: {
          date: '2020-02-06T00:00:00.000Z',
          number: 'US20200042492A1'
        }
      },
      {
        title: 'Hierarchical memory system compiler',
        inventor: 'Sundar Iyer',
        assignee: 'Cisco Technology, Inc.',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/82/3e/2e/dc00dbb09d40d6/US09678669-20170613-D00000.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/92/e0/b7/3fcdc7369e31a6/US9678669.pdf'
        },
        url: 'https://patents.google.com/patent/US9678669B2/en',
        description:
          'Designing memory subsystems for integrated circuits can be time-consuming and costly task. To reduce development time and costs, an automated system and method for designing and constructing high-speed memory operatio...',
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b4/9c/5b/5ebd77f2fef0a3/US09678669-20170613-D00000.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/6e/58/f0/ec14eacae310ec/US09678669-20170613-D00000.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ac/80/5a/4722aa1d826f23/US09678669-20170613-D00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/3a/ba/cd/5f5c90c7414606/US09678669-20170613-D00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e1/f4/53/623c3267db9392/US09678669-20170613-D00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e4/88/ad/6706a0853ed8c1/US09678669-20170613-D00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/84/81/29/36510cf9e24884/US09678669-20170613-D00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f0/53/d3/c308f0aefc9e83/US09678669-20170613-D00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/17/a3/91/a084d637c8feff/US09678669-20170613-D00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/20/21/65/04309d5fe2f25d/US09678669-20170613-D00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/58/bf/0d/1ec9cc06e550e2/US09678669-20170613-D00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/26/b6/ff/e139f1e4dce68f/US09678669-20170613-D00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/30/98/8c/3d2cf1acb1b890/US09678669-20170613-D00006.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/97/01/d1/3538e1553459ad/US09678669-20170613-D00006.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c3/f1/b8/a91909362b85d3/US09678669-20170613-D00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e6/19/99/671e29d47a8125/US09678669-20170613-D00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/59/b2/9a/67edd864406c44/US09678669-20170613-D00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f3/01/e4/ab428a737d5d5d/US09678669-20170613-D00008.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/85/1e/f5/9d11aaad018ee4/US09678669-20170613-D00009.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/2f/65/e5/3b3453a9fb3ee6/US09678669-20170613-D00009.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/60/29/8e/1a44c25b0e3818/US09678669-20170613-D00010.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/fb/cb/aa/93cc523462fad7/US09678669-20170613-D00010.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3e/da/0d/dda0ce93da0c2e/US09678669-20170613-D00011.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/0e/7e/51/989620e66a9375/US09678669-20170613-D00011.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b0/33/86/a881ebda6a094f/US09678669-20170613-D00012.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/47/ec/81/c5d12a836c8d8a/US09678669-20170613-D00012.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f5/9a/92/be98da9c195113/US09678669-20170613-D00013.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7e/da/af/4aebf92573eb5e/US09678669-20170613-D00013.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/be/a9/b3/1b3e5adad86e43/US09678669-20170613-D00014.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/29/de/46/926aab11a40aef/US09678669-20170613-D00014.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/18/55/e3/b91869b1736117/US09678669-20170613-D00015.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/75/26/fd/4cc9c03d31f650/US09678669-20170613-D00015.png'
            }
          }
        ],
        priority: {
          date: '2009-12-15T00:00:00.000Z'
        },
        filing: {
          date: '2013-11-18T00:00:00.000Z'
        },
        grant: {
          date: '2017-06-13T00:00:00.000Z'
        },
        publication: {
          date: '2017-06-13T00:00:00.000Z',
          number: 'US9678669B2'
        }
      },
      {
        title: 'System and method for a cache in a multi-core processor',
        inventor: 'Martin Vorbach',
        assignee: 'Hyperion Core, Inc.',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/ec/2f/ff/cb48f72ecb545d/US09734064-20170815-D00000.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/54/69/3f/65091e092877d6/US9734064.pdf'
        },
        url: 'https://patents.google.com/patent/US9734064B2/en',
        description:
          'The invention relates to a multi-core processor system, in particular a single-package multi-core processor system, comprising at least two processor cores, preferably at least four processor cores, each of said a lea...',
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4c/b2/7d/164895d8701434/US09734064-20170815-D00000.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7d/fa/f6/89d86b796c0e57/US09734064-20170815-D00000.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ce/4b/da/46b8350280da69/US09734064-20170815-D00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/d4/50/cd/c8cbbac1aee9d0/US09734064-20170815-D00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3b/55/d8/aa1b669713aa8f/US09734064-20170815-D00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/57/1c/8a/39abf6db690688/US09734064-20170815-D00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/a0/6d/e4/aaa90ee009e8aa/US09734064-20170815-D00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ca/c2/d8/9a499daa545b3a/US09734064-20170815-D00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/85/d5/54/fbbf0e66383d2d/US09734064-20170815-D00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/00/f0/c1/622bd8451247ee/US09734064-20170815-D00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/01/69/25/54d4116bc1b6e9/US09734064-20170815-D00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f8/f7/da/c6e69716b57071/US09734064-20170815-D00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f2/d7/59/31099474770651/US09734064-20170815-D00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/8f/4e/26/8f7c6652d07a4b/US09734064-20170815-D00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b1/33/92/eef2c547a6e429/US09734064-20170815-D00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/1b/ff/39/d3c6d27d27b87a/US09734064-20170815-D00008.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/bd/5d/a0/0e8ec6027fae13/US09734064-20170815-D00009.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/83/37/fa/35abd2e424e382/US09734064-20170815-D00009.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/60/ba/43/4b15c536a3c4d2/US09734064-20170815-D00010.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/40/29/aa/88f76d43542e34/US09734064-20170815-D00010.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c6/5c/92/b78da26b336743/US09734064-20170815-D00011.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/cf/36/91/137508a0561706/US09734064-20170815-D00011.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/60/eb/01/d5608a1a55a4ad/US09734064-20170815-D00012.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4f/39/47/f70ac52e4e43a9/US09734064-20170815-D00012.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/97/7c/25/5dc26551c6dfe3/US09734064-20170815-D00013.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/6e/83/f8/f7fa18aa061a21/US09734064-20170815-D00013.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/6f/cb/93/7e30dba3c87ee7/US09734064-20170815-D00014.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/24/1c/33/7b639005f425c0/US09734064-20170815-D00014.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/a4/80/e4/202452ff44408c/US09734064-20170815-D00015.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/2f/6e/50/bd5431ac34f902/US09734064-20170815-D00015.png'
            }
          }
        ],
        priority: {
          date: '2009-06-09T00:00:00.000Z'
        },
        filing: {
          date: '2015-07-03T00:00:00.000Z'
        },
        grant: {
          date: '2017-08-15T00:00:00.000Z'
        },
        publication: {
          date: '2017-08-15T00:00:00.000Z',
          number: 'US9734064B2'
        }
      },
      {
        title:
          'Optimization for real-time, parallel execution of models for extracting high- …',
        inventor: 'Luis F. Stevens',
        assignee: 'Target Brands, Inc.',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/5e/71/5e/0ad19898ae88a4/US12008027-20240611-D00000.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/62/78/39/c51cfdfcf2269d/US12008027.pdf'
        },
        url: 'https://patents.google.com/patent/US12008027B2/en',
        description:
          'A computer system identifies high-value information in data streams. The computer system receives a filter graph definition. The filter graph definition includes a plurality of filter nodes, each filter node including...',
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/46/af/c9/008f3a53c40a29/US12008027-20240611-D00000.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/9a/26/8b/297ab4faded88d/US12008027-20240611-D00000.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b5/77/0a/3a925ee3edcfb0/US12008027-20240611-D00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/08/47/2e/80fdfc644b5ce1/US12008027-20240611-D00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/6d/28/f1/fca0eef583bc3a/US12008027-20240611-D00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/bc/9c/39/285b0ddb9dd6ce/US12008027-20240611-D00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/37/1d/3a/af9d900ffd3f7d/US12008027-20240611-D00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/9b/4b/01/45e7538c915d19/US12008027-20240611-D00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4b/9c/ce/72096bc6f392df/US12008027-20240611-D00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/80/52/0c/9b56055ae69dc9/US12008027-20240611-D00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/0b/07/66/e3546fd8f1acf8/US12008027-20240611-D00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/90/7b/0c/1070f1e13b1de8/US12008027-20240611-D00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/73/93/b7/a3c384b80493ba/US12008027-20240611-D00006.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f2/05/c3/c2f964f6378461/US12008027-20240611-D00006.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b3/1a/1a/6300d82c13028f/US12008027-20240611-D00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e5/f6/ad/676cf3ca224d46/US12008027-20240611-D00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3b/98/ca/ec1289c887a253/US12008027-20240611-D00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/13/bf/33/cac96d10b3ce7f/US12008027-20240611-D00008.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/69/51/7a/86ca8dbd2690ad/US12008027-20240611-D00009.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4e/51/ca/6bb9fd5a266de9/US12008027-20240611-D00009.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/62/6f/35/3fa03fec61570a/US12008027-20240611-D00010.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/1b/3b/4c/d57c891a1ce9b1/US12008027-20240611-D00010.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f8/28/f2/7e4f9f407f85b1/US12008027-20240611-D00011.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/09/26/5e/4ff7a656d8e880/US12008027-20240611-D00011.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/92/2d/05/e3daf2a246fcaa/US12008027-20240611-D00012.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/79/f8/1a/c409b58cd0e78c/US12008027-20240611-D00012.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4b/7b/55/ff92dc6d6b5297/US12008027-20240611-D00013.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/3e/90/d7/2c7198d030160c/US12008027-20240611-D00013.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/68/e7/60/87f16071ca4683/US12008027-20240611-D00014.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c8/32/e2/35c235af8195f4/US12008027-20240611-D00014.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4c/c7/a2/29f8bffea5d930/US12008027-20240611-D00015.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f9/3d/e4/d6b5934be46a4a/US12008027-20240611-D00015.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/6c/26/ac/0d6387e3d1ca57/US12008027-20240611-D00016.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e8/c5/d4/b8550d92520c7b/US12008027-20240611-D00016.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4b/13/84/46a4b681197ef7/US12008027-20240611-D00017.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/30/79/fb/4c6058cf0bb6e0/US12008027-20240611-D00017.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/44/b0/2b/d30b9ea336a21f/US12008027-20240611-D00018.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/09/f8/69/dddfc2c11ab766/US12008027-20240611-D00018.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/5a/85/26/48b401843cf342/US12008027-20240611-D00019.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/18/2f/e4/c1077528f08f86/US12008027-20240611-D00019.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d2/be/9c/9646e67b6b244e/US12008027-20240611-D00020.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e8/b8/6b/14a402943fd3c9/US12008027-20240611-D00020.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/8b/7a/f2/eba30db069aecd/US12008027-20240611-D00021.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/88/41/9c/2ed2b9dd8cbaef/US12008027-20240611-D00021.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/44/ee/7f/a8ba3c969ec3c6/US12008027-20240611-D00022.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/0c/ca/86/552da9d2763211/US12008027-20240611-D00022.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/26/cd/36/bf2622deab0927/US12008027-20240611-D00023.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/08/0b/88/7f65a09d138e5e/US12008027-20240611-D00023.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/21/08/77/7055ce27a336c5/US12008027-20240611-D00024.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/67/92/99/b4c7dc29b7e8af/US12008027-20240611-D00024.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2b/d3/42/e3f8e5162195ef/US12008027-20240611-D00025.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/b8/62/4b/552dbbd563cf6b/US12008027-20240611-D00025.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c5/73/2a/3c8486d1a3e8da/US12008027-20240611-D00026.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/91/86/28/d69af39f27d86a/US12008027-20240611-D00026.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/5e/75/9e/52cc13b69de3af/US12008027-20240611-D00027.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/d0/c0/d0/3f7adf675c36f5/US12008027-20240611-D00027.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/dd/54/48/f451d792396f3c/US12008027-20240611-D00028.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/3a/d0/0a/1f3a1b0f43a4c3/US12008027-20240611-D00028.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f8/b3/f2/23ac5c443aebfa/US12008027-20240611-D00029.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/03/bf/98/11c96a9311442b/US12008027-20240611-D00029.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/cb/56/f5/415907a05fd6ae/US12008027-20240611-D00030.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/15/4e/85/4946f72c598372/US12008027-20240611-D00030.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3e/4d/1d/3d0eede34d448a/US12008027-20240611-D00031.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/17/e8/32/780be13239ba0c/US12008027-20240611-D00031.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/29/50/0b/2bb3b0fcf34e23/US12008027-20240611-D00032.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/bd/5a/42/6ae16a6d2c2627/US12008027-20240611-D00032.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/92/3a/0b/8242a33188631e/US12008027-20240611-D00033.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/a9/b8/6f/becc80fe033e9e/US12008027-20240611-D00033.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/5e/d8/81/ad1222bf05948b/US12008027-20240611-D00034.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e7/40/9e/1ea3a3f48909b7/US12008027-20240611-D00034.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/bf/1d/99/b45cb1332fb427/US12008027-20240611-D00035.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/09/5f/a7/87723968098b0a/US12008027-20240611-D00035.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/99/74/2a/5fd7bac3c25b59/US12008027-20240611-D00036.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/93/3f/b2/51adfba6896c67/US12008027-20240611-D00036.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/62/e8/9a/06e1cc9e0f6f71/US12008027-20240611-D00037.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/cb/ac/0f/3f47e8323bbed7/US12008027-20240611-D00037.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f1/be/05/49f59735b481b0/US12008027-20240611-D00038.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/8c/6a/bd/2c179016f9b7e7/US12008027-20240611-D00038.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c8/6c/5e/3aadfaae1d8722/US12008027-20240611-D00039.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/14/03/86/59a7312b708aa7/US12008027-20240611-D00039.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/5f/42/e6/f1d885eaa759a9/US12008027-20240611-D00040.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/05/75/20/1b247c1fb45dec/US12008027-20240611-D00040.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e0/33/30/894479d312185b/US12008027-20240611-D00041.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/df/b3/56/f212f292583415/US12008027-20240611-D00041.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/dd/ab/ee/a4eff0f295184d/US12008027-20240611-D00042.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4d/da/1d/0e4304e2aa51fd/US12008027-20240611-D00042.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c4/40/ba/a660d13a452453/US12008027-20240611-D00043.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/3f/a7/70/93854597f2d7ce/US12008027-20240611-D00043.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ba/b0/d2/4646994ec1171e/US12008027-20240611-D00044.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e5/0f/6a/1e8e341d873d85/US12008027-20240611-D00044.png'
            }
          }
        ],
        priority: {
          date: '2013-03-15T00:00:00.000Z'
        },
        filing: {
          date: '2020-06-30T00:00:00.000Z'
        },
        grant: {
          date: '2024-06-11T00:00:00.000Z'
        },
        publication: {
          date: '2024-06-11T00:00:00.000Z',
          number: 'US12008027B2'
        }
      },
      {
        title:
          'Optimization for real-time, parallel execution of models for extracting high- …',
        inventor: 'Luis F. Stevens',
        assignee: 'Target Brands, Inc.',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/54/bc/2f/134936ddf9ddf1/US11182098-20211123-D00000.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/97/cc/11/ffe970c988652b/US11182098.pdf'
        },
        url: 'https://patents.google.com/patent/US11182098B2/en',
        description:
          'A computer system identifies high-value information in data streams. The computer system receives a filter graph definition. The filter graph definition includes a plurality of filter nodes, each filter node including...',
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/93/38/7c/fe59f8308e2eb0/US11182098-20211123-D00000.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/61/0b/64/e3dc6d909b4fdc/US11182098-20211123-D00000.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/38/e4/cf/44050f83711887/US11182098-20211123-D00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/17/4d/ef/cadd39bdde8f9b/US11182098-20211123-D00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/05/3e/57/badcf1d343c739/US11182098-20211123-D00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4e/ea/34/f6fbeea6cad897/US11182098-20211123-D00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3c/ec/d0/0ba6e30c405a00/US11182098-20211123-D00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/a8/d5/cc/8f681e6af73ef2/US11182098-20211123-D00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b2/f3/43/41434b3670af6b/US11182098-20211123-D00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/a9/fe/02/1dc44c22cbb43b/US11182098-20211123-D00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/92/62/22/824a10066be59f/US11182098-20211123-D00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/61/e5/01/2aaf7ee9416b58/US11182098-20211123-D00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/62/36/0d/648d30eb73dade/US11182098-20211123-D00006.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/dd/a1/52/2c040d04e306d3/US11182098-20211123-D00006.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b9/f6/94/a6ef980556d556/US11182098-20211123-D00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/0f/04/6c/5b88e1b0bece63/US11182098-20211123-D00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c3/c7/fd/f4084eee219c63/US11182098-20211123-D00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/56/35/b0/ed4b35e49baf27/US11182098-20211123-D00008.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/83/77/6d/29ab428b7360c1/US11182098-20211123-D00009.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/35/90/d5/5cb0b381bc344d/US11182098-20211123-D00009.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ec/a7/a7/7ed676a1d27226/US11182098-20211123-D00010.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/a7/8b/34/bab27b04f8b5d7/US11182098-20211123-D00010.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/34/25/fe/19201c9a4429c7/US11182098-20211123-D00011.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/5a/87/90/681c4dcf05c8fa/US11182098-20211123-D00011.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/75/f1/45/e15468c1af7847/US11182098-20211123-D00012.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c7/3c/ad/be5d26f5e80803/US11182098-20211123-D00012.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ed/09/93/6658ac43f59815/US11182098-20211123-D00013.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ac/41/0b/99165ffcbc8320/US11182098-20211123-D00013.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b1/d6/c4/8cfc2292ac9f6e/US11182098-20211123-D00014.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/98/9d/76/c8b91a8b23f9f0/US11182098-20211123-D00014.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/07/5a/4c/5772308f73fc43/US11182098-20211123-D00015.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/3c/03/a0/7502f126b4f7f7/US11182098-20211123-D00015.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b9/d2/51/cfd3a7c01ebca3/US11182098-20211123-D00016.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c8/91/31/35f23487a5c920/US11182098-20211123-D00016.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/18/d8/83/ed9d145768e871/US11182098-20211123-D00017.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e1/ab/4f/17efb9568d1d81/US11182098-20211123-D00017.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ed/ea/d2/a9fd223a9da579/US11182098-20211123-D00018.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/94/0a/38/a2be75c6fec1a9/US11182098-20211123-D00018.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/22/f0/9a/f1b2f7a7267923/US11182098-20211123-D00019.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/fb/9f/cf/85e6ec7991e848/US11182098-20211123-D00019.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3d/2c/bc/53f4ac42d478b3/US11182098-20211123-D00020.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/31/2e/63/f1c08d10e58d26/US11182098-20211123-D00020.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c8/1e/56/fc5fd2a269b74a/US11182098-20211123-D00021.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/6e/17/8f/e84f70ce857b9c/US11182098-20211123-D00021.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/24/e1/24/c156feedcd24ea/US11182098-20211123-D00022.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e7/db/25/9b04e16154eaf3/US11182098-20211123-D00022.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/14/2b/7d/dbdd67f72de537/US11182098-20211123-D00023.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/fe/43/b9/52cb997a0bb0f0/US11182098-20211123-D00023.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/75/e2/e6/6316c7c7d6edc5/US11182098-20211123-D00024.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4e/36/d0/b90831d4a5b4f3/US11182098-20211123-D00024.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3a/c0/93/67a1d3e93a36e4/US11182098-20211123-D00025.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/68/16/9a/0e11abd78d5a03/US11182098-20211123-D00025.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/9b/41/c3/72eff7b31c7380/US11182098-20211123-D00026.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4f/8a/b0/38f97fba9ca222/US11182098-20211123-D00026.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/bd/a0/69/e691bfd25c1d7f/US11182098-20211123-D00027.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/d5/b1/bf/24429920f7416e/US11182098-20211123-D00027.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/fa/c0/45/8fe34c2c31dbf2/US11182098-20211123-D00028.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/62/cd/86/4795af0ce45c65/US11182098-20211123-D00028.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ac/ae/99/e494a10c170e2e/US11182098-20211123-D00029.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4f/49/12/1f72911d218f79/US11182098-20211123-D00029.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/13/66/70/a0c1016e311f45/US11182098-20211123-D00030.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ae/d4/3b/00d8fcd0a22fb1/US11182098-20211123-D00030.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/de/ec/bc/594cd1d0647890/US11182098-20211123-D00031.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7f/b8/2e/81e4b52f581658/US11182098-20211123-D00031.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ad/55/24/dbc559d5aef162/US11182098-20211123-D00032.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/23/95/11/948c513a3d64d8/US11182098-20211123-D00032.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f0/76/49/df694fcc57fb1d/US11182098-20211123-D00033.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/19/01/76/821324785a5fdd/US11182098-20211123-D00033.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/7b/a0/23/5eda9f4b4c96f4/US11182098-20211123-D00034.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7a/7d/4a/941828cefa63eb/US11182098-20211123-D00034.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c4/43/10/c496fd37773602/US11182098-20211123-D00035.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/97/a7/cb/935a0b441c5ff0/US11182098-20211123-D00035.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/56/f4/b2/f4e39f86b98aba/US11182098-20211123-D00036.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/40/e4/8a/6705b98cb22b60/US11182098-20211123-D00036.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/32/c8/56/71482379b8a309/US11182098-20211123-D00037.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/51/c1/9c/f8cbbbe9584f3f/US11182098-20211123-D00037.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c3/d2/09/519d1bac28d596/US11182098-20211123-D00038.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/bb/1c/10/6151216341d9a1/US11182098-20211123-D00038.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/dd/57/5f/51d44db10838f3/US11182098-20211123-D00039.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/07/d2/74/86e8a726627f8c/US11182098-20211123-D00039.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/48/66/3b/5f42b591102f97/US11182098-20211123-D00040.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c6/c5/0c/bf31ae72ef2299/US11182098-20211123-D00040.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2b/ec/33/37aea6abad8131/US11182098-20211123-D00041.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/14/51/86/8fa6849f72bfd5/US11182098-20211123-D00041.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b2/5a/74/d18b26cd0bbf26/US11182098-20211123-D00042.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/51/30/7a/3243be4ae6f4f7/US11182098-20211123-D00042.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e7/d5/1d/efb0f7525db76e/US11182098-20211123-D00043.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f6/fd/a7/1cde8a5fb66d25/US11182098-20211123-D00043.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/cd/62/d0/89924d4b47e495/US11182098-20211123-D00044.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/cf/0b/6a/82c928e01f3189/US11182098-20211123-D00044.png'
            }
          }
        ],
        priority: {
          date: '2013-03-15T00:00:00.000Z'
        },
        filing: {
          date: '2019-09-30T00:00:00.000Z'
        },
        grant: {
          date: '2021-11-23T00:00:00.000Z'
        },
        publication: {
          date: '2021-11-23T00:00:00.000Z',
          number: 'US11182098B2'
        }
      },
      {
        title: 'Global compiler for heterogeneous multiprocessor',
        inventor: '히로노리 가사하라',
        assignee: '각코호진 와세다다이가쿠',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/9e/ca/52/77850a5737d399/112007016869911-pat00001.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/1b/c1/60/f5e1c14c944c3c/KR100878917B1.pdf'
        },
        url: 'https://patents.google.com/patent/KR100878917B1/en',
        description:
          'An object of the present invention is to extract the performance of the HCMP 1 as much as possible in a short time without being aware of the parallelism in accordance with the configuration of the heterogeneous multi...',
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/a5/cc/41/227ba852436381/112007016869911-pat00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/43/52/5f/45b0462800888d/112007016869911-pat00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e7/84/5b/bb96bfa064f3e1/112007016869911-pat00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e1/cf/bc/744e896a97055f/112007016869911-pat00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d4/de/e0/a87048b580c280/112007016869911-pat00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/96/21/7d/86786f5cb62d59/112007016869911-pat00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3e/51/21/5cd3af61bf17d8/112007016869911-pat00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/de/88/a4/57c2736f2a3d3c/112007016869911-pat00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ae/73/fe/450929904c0965/112007016869911-pat00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/50/4f/72/71615512af5d5a/112007016869911-pat00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/0b/85/ce/928087594bb4fc/112007016869911-pat00006.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/03/00/d8/3f3994aa5c7112/112007016869911-pat00006.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/38/95/ce/8375cfa570a6ed/112007016869911-pat00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/38/39/8b/ba02b8be6fa366/112007016869911-pat00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/1a/32/c9/3836ef540de60e/112007016869911-pat00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7c/7d/5a/7e80a5c86ad8ea/112007016869911-pat00008.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/70/cd/58/ec6b4493055daa/112007016869911-pat00009.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/af/bb/21/3b820ffbfe5821/112007016869911-pat00009.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/84/fa/e2/444310023171d0/112007016869911-pat00010.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c5/6f/83/e1c9bcd569f12f/112007016869911-pat00010.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d1/f8/14/67dbf361cc04bc/112007016869911-pat00011.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/24/8e/91/2efce4084b0e92/112007016869911-pat00011.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c6/62/ba/3792ef3cde30df/112007016869911-pat00012.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/47/57/9a/d1fff419a5e3d0/112007016869911-pat00012.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/36/91/2f/53141f9beaa627/112007016869911-pat00013.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e7/7a/f1/fb96861a9c9a58/112007016869911-pat00013.png'
            }
          }
        ],
        priority: {
          date: '2006-06-06T00:00:00.000Z'
        },
        filing: {
          date: '2007-02-27T00:00:00.000Z'
        },
        grant: {
          date: '2009-01-15T00:00:00.000Z'
        },
        publication: {
          date: '2009-01-15T00:00:00.000Z',
          number: 'KR100878917B1'
        }
      },
      {
        title: 'Software self-defense systems and methods',
        inventor: 'James J. Horning',
        assignee: 'Intertrust Technologies Corporation',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/b4/6c/37/573ab4e8179d7a/US09064099-20150623-D00000.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/15/e2/e1/483ac208b62aa4/US9064099.pdf'
        },
        url: 'https://patents.google.com/patent/US9064099B2/en',
        description:
          "Systems and methods are disclosed for protecting a computer program from unauthorized analysis and modification. Obfuscation transformations can be applied to the computer program's local structure, control graph, and...",
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/6d/05/e1/720c1ec9948f2b/US09064099-20150623-D00000.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/79/e2/10/3780f3e396f337/US09064099-20150623-D00000.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d0/90/07/c30819e1a7b1a8/US09064099-20150623-D00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/fb/07/30/e80860ea7bf5b0/US09064099-20150623-D00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/7b/3a/62/546b6014b9bd85/US09064099-20150623-D00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e9/60/eb/d4cd21fc297218/US09064099-20150623-D00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/20/d5/ee/c8ed85a9f1b095/US09064099-20150623-D00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c0/3c/53/9cef27ba1325f8/US09064099-20150623-D00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/18/25/8a/468051c1905845/US09064099-20150623-D00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7e/35/ba/239301a7c63966/US09064099-20150623-D00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/a3/2c/0d/f6f31783ee7f61/US09064099-20150623-D00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e8/9e/e1/075e2225f63012/US09064099-20150623-D00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/46/f7/57/dde256ad2d0421/US09064099-20150623-D00006.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f4/da/ff/216da1576c4f71/US09064099-20150623-D00006.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ee/bc/b1/b09f800a1d5c0a/US09064099-20150623-D00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/74/74/d2/e58d98e8113197/US09064099-20150623-D00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/43/50/ec/7ed06e5c80e906/US09064099-20150623-D00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/b6/70/39/fa283914407f6a/US09064099-20150623-D00008.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/9c/c4/cf/b54422847e1f60/US09064099-20150623-D00009.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/17/a5/c0/7ec0b876456774/US09064099-20150623-D00009.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b1/f3/41/3d7a9b5fabb911/US09064099-20150623-D00010.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/15/6f/1a/6ea8262b54fbc5/US09064099-20150623-D00010.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/aa/7d/10/d5ef84cdf2f45c/US09064099-20150623-D00011.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/8d/76/62/a9f092146b08de/US09064099-20150623-D00011.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/22/eb/c8/122b58acad475e/US09064099-20150623-D00012.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/52/c4/a6/c79229377f14b2/US09064099-20150623-D00012.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3c/ea/53/1122185cae4d67/US09064099-20150623-D00013.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/73/c0/36/6ec80195f0b463/US09064099-20150623-D00013.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/49/7d/2c/965f76e3617f46/US09064099-20150623-D00014.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/9f/d1/8e/236271868df40e/US09064099-20150623-D00014.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/5d/18/72/f874437c2b4461/US09064099-20150623-D00015.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/40/ba/b4/4fb8e19735cf0c/US09064099-20150623-D00015.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/91/74/1e/13253afa73d409/US09064099-20150623-D00016.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/1b/a5/0c/9272bf60d12ea8/US09064099-20150623-D00016.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c3/15/38/b05898af799473/US09064099-20150623-D00017.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/77/86/32/d5af109e3f7517/US09064099-20150623-D00017.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/65/93/8a/3522522b5e3ba2/US09064099-20150623-D00018.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/02/42/e4/c599e2e17da7c3/US09064099-20150623-D00018.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/55/bd/98/b539eacfe56c2d/US09064099-20150623-D00019.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/82/24/ca/1714501b566aeb/US09064099-20150623-D00019.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/38/51/63/95b95a1b412b76/US09064099-20150623-D00020.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/49/64/c8/3989c06aaa4f10/US09064099-20150623-D00020.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/6c/b2/92/05fbff8a09a571/US09064099-20150623-D00021.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/04/a2/9e/ffe43a8a1dae27/US09064099-20150623-D00021.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/35/7b/12/eb781e1e8fc7f2/US09064099-20150623-D00022.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4b/3a/24/b2cafa546aeaef/US09064099-20150623-D00022.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/36/fc/14/754f1041d80d93/US09064099-20150623-D00023.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ca/82/cc/010ac0304f0002/US09064099-20150623-D00023.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/5a/25/ed/68291600ea0677/US09064099-20150623-D00024.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f2/20/51/ea86cc035bb8f1/US09064099-20150623-D00024.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/bf/b5/c6/9d2d8dbe207bfa/US09064099-20150623-D00025.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ab/8c/28/f45e39a8c8fdc2/US09064099-20150623-D00025.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/9a/73/ff/7e258709483e64/US09064099-20150623-D00026.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/00/35/10/03831810d72724/US09064099-20150623-D00026.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/29/0c/c8/cdeac5a491497e/US09064099-20150623-D00027.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/aa/6d/e5/1402a1a193ee55/US09064099-20150623-D00027.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/cf/4b/76/d646ce6ac90e83/US09064099-20150623-D00028.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/77/98/5a/9be2a3184ce014/US09064099-20150623-D00028.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/42/09/04/38d47ed69adfab/US09064099-20150623-D00029.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/43/5f/30/9237e18a6b7ca0/US09064099-20150623-D00029.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d9/01/53/4e0b51c61077e7/US09064099-20150623-D00030.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/8a/74/01/dcad86661a7076/US09064099-20150623-D00030.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f6/44/8d/107167697c02e1/US09064099-20150623-D00031.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e6/a6/10/8c1055be011e4f/US09064099-20150623-D00031.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/03/ec/85/69f7f60fabf3c5/US09064099-20150623-D00032.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/02/b0/95/337600eff6935c/US09064099-20150623-D00032.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c2/ff/3a/6ecabb35a608f4/US09064099-20150623-D00033.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7d/8c/58/eec1fe2171b63c/US09064099-20150623-D00033.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e8/90/f4/86cdb581149669/US09064099-20150623-D00034.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/30/3b/f8/05f5874659e2e9/US09064099-20150623-D00034.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/7d/c8/0e/f2ed0c652398d7/US09064099-20150623-D00035.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c3/56/52/c07ebc25b40688/US09064099-20150623-D00035.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/50/b5/2c/7bb6eed8851f59/US09064099-20150623-D00036.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/40/06/7e/d6cb017e15823a/US09064099-20150623-D00036.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d1/79/67/2cb569909ad1d9/US09064099-20150623-D00037.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c0/54/cf/66230c870a13e3/US09064099-20150623-D00037.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/03/90/e9/c33af91e4514c8/US09064099-20150623-D00038.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c7/a8/67/1b6491536f0e25/US09064099-20150623-D00038.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2b/37/99/81765270c39f59/US09064099-20150623-D00039.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c0/fe/96/f3c3e140442a63/US09064099-20150623-D00039.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/44/c9/1f/523e0db74e5df0/US09064099-20150623-D00040.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/53/fe/78/1828e06d9a6603/US09064099-20150623-D00040.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/7f/5b/d7/930edf00ccbfab/US09064099-20150623-D00041.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/77/89/f8/821e7903de4595/US09064099-20150623-D00041.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2f/9a/eb/9087ca1e360072/US09064099-20150623-D00042.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/11/1a/92/22f476df6f78ac/US09064099-20150623-D00042.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c4/fb/f9/439f830071ec44/US09064099-20150623-D00043.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/cc/db/ed/9c1470603ac492/US09064099-20150623-D00043.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/0b/9a/de/3bbfe2b43020f8/US09064099-20150623-D00044.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/6f/fe/ee/e9e2f797437cd3/US09064099-20150623-D00044.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/a7/0b/61/f65ab11169c7a5/US09064099-20150623-D00045.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4c/c8/8b/57d9d0d755ac9c/US09064099-20150623-D00045.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f2/79/64/4038dd70d19a60/US09064099-20150623-D00046.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/6a/f3/36/e5e1f3ca116cee/US09064099-20150623-D00046.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/01/d4/3c/b923c231bb456b/US09064099-20150623-D00047.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/48/da/49/6c8b8be076bbe3/US09064099-20150623-D00047.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/7c/e1/35/02158535e85944/US09064099-20150623-D00048.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/5f/2c/36/27f179e99245f5/US09064099-20150623-D00048.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/66/87/7f/807e7febc401a5/US09064099-20150623-D00049.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/99/84/3b/053f6acb6272ab/US09064099-20150623-D00049.png'
            }
          }
        ],
        priority: {
          date: '1999-07-29T00:00:00.000Z'
        },
        filing: {
          date: '2013-02-25T00:00:00.000Z'
        },
        grant: {
          date: '2015-06-23T00:00:00.000Z'
        },
        publication: {
          date: '2015-06-23T00:00:00.000Z',
          number: 'US9064099B2'
        }
      },
      {
        title:
          'Integrated data processing core and array data processor and method for …',
        inventor: 'Martin Vorbach',
        assignee: 'Pact Xpp Schweiz Ag',
        language: 'en',
        thumbnail: {
          url: 'https://patentimages.storage.googleapis.com/84/5c/e8/3168bed7ba5782/US10579584-20200303-D00000.png'
        },
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/ae/0a/43/dbcff065656c7c/US10579584.pdf'
        },
        url: 'https://patents.google.com/patent/US10579584B2/en',
        description:
          'An integrated data processing core and a data processor are provided on a single integrated circuit and command sequences are forwarded from the data processing core to be executed on the array data processor wherein ...',
        figures: [
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/a3/64/de/f0f8b57470294d/US10579584-20200303-D00000.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/82/90/04/f8903732fad9e2/US10579584-20200303-D00000.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2e/0b/1d/b2098e19978753/US10579584-20200303-D00001.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/2d/d9/2b/4f3969db96f7a4/US10579584-20200303-D00001.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/7a/7a/b0/c15d247a2ee24f/US10579584-20200303-D00002.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ea/41/ff/3bbddcd1841416/US10579584-20200303-D00002.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ea/24/95/79bebce94ce6e1/US10579584-20200303-D00003.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/34/3d/af/aa2ed3056b7df8/US10579584-20200303-D00003.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ce/5f/c7/2ea5080775accd/US10579584-20200303-D00004.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/50/a0/5c/53a42ce871df21/US10579584-20200303-D00004.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/15/c5/2e/65fc18357e3fa6/US10579584-20200303-D00005.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/66/d3/15/2009d99a9afad8/US10579584-20200303-D00005.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f6/f4/33/ebfa6a328f1a95/US10579584-20200303-D00006.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/6b/2a/56/180f1846af72cb/US10579584-20200303-D00006.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/99/64/b6/7dd58a33f4cee8/US10579584-20200303-D00007.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/a4/a8/bd/61483f540a1377/US10579584-20200303-D00007.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/1d/58/03/707e96ec3289b9/US10579584-20200303-D00008.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/a5/bc/86/fe2b597fd67508/US10579584-20200303-D00008.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c1/10/a2/3b782af528573d/US10579584-20200303-D00009.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e0/25/8a/b5b1457ccf4916/US10579584-20200303-D00009.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/3f/bc/b6/6812d511a7d759/US10579584-20200303-D00010.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c4/c9/c9/085c2996353314/US10579584-20200303-D00010.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/07/68/44/e5553e0c026e24/US10579584-20200303-D00011.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/9a/52/f7/4f80b266a44dca/US10579584-20200303-D00011.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/8d/41/87/c6f2e088d8e12c/US10579584-20200303-D00012.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/41/97/67/40983a3a3c32e8/US10579584-20200303-D00012.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/8b/32/30/5127ed31eb87c2/US10579584-20200303-D00013.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/16/85/41/57c74af2688aa0/US10579584-20200303-D00013.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/df/3a/19/e725991b6655b7/US10579584-20200303-D00014.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/0d/ab/1b/f5e273c9077793/US10579584-20200303-D00014.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/8f/3c/e3/936ea7da98639a/US10579584-20200303-D00015.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/34/3c/f8/e941c17f5a7575/US10579584-20200303-D00015.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/16/6b/b8/09a8ae0b911f77/US10579584-20200303-D00016.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/15/9d/d8/64d55811937862/US10579584-20200303-D00016.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/04/6d/12/e4872c49fc58f8/US10579584-20200303-D00017.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/8a/b8/88/51bfa8176fea2e/US10579584-20200303-D00017.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/0b/47/54/193ea29659ae15/US10579584-20200303-D00018.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/17/76/53/f33c549238e8f7/US10579584-20200303-D00018.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/08/50/f2/90f6434b45f2ca/US10579584-20200303-D00019.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/68/ae/46/79fb5ab9ba19b3/US10579584-20200303-D00019.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4c/df/48/307e429a8b0c37/US10579584-20200303-D00020.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f9/4f/31/f8f614ed875f4e/US10579584-20200303-D00020.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/5f/90/5f/ffcd6f8daa7990/US10579584-20200303-D00021.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/10/e8/30/1afbdf739a36c1/US10579584-20200303-D00021.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/7e/e9/cd/47c15e2fc6a5ec/US10579584-20200303-D00022.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/da/6b/9f/077788958b07a0/US10579584-20200303-D00022.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/99/d9/67/d9b5dadaa7641f/US10579584-20200303-D00023.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/b1/11/a6/e6016a759b2e10/US10579584-20200303-D00023.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/29/4a/a0/617a94c487d5f6/US10579584-20200303-D00024.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f8/7f/ad/dad27428fa5332/US10579584-20200303-D00024.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/85/f8/88/dd0a3920612610/US10579584-20200303-D00025.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7d/17/5b/3b377ed3c9779a/US10579584-20200303-D00025.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ad/96/7d/00f056ccb9cd7d/US10579584-20200303-D00026.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/04/ad/d0/2d5c2ddce24e85/US10579584-20200303-D00026.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ae/97/31/f6cce230e6e8f8/US10579584-20200303-D00027.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c5/5b/90/d113cd362d77ba/US10579584-20200303-D00027.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d0/e3/47/3c450bc932bb44/US10579584-20200303-D00028.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/d0/dd/c9/51b5005425510a/US10579584-20200303-D00028.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4f/5d/a7/b7224068fd5346/US10579584-20200303-D00029.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c8/3f/c4/3747678f9c9489/US10579584-20200303-D00029.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/43/57/12/1a0453e12f2b11/US10579584-20200303-D00030.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/fc/4e/4f/9ffeb153e62e1d/US10579584-20200303-D00030.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/74/4b/4e/a80e5bac583869/US10579584-20200303-D00031.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/88/59/c3/485f77bece8695/US10579584-20200303-D00031.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ad/ce/d7/b77a98859b2b63/US10579584-20200303-D00032.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/d1/a4/59/e623b3cae8ffef/US10579584-20200303-D00032.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/8e/33/27/e7287784d0afc5/US10579584-20200303-D00033.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/17/8d/3f/55706aa35a4ecd/US10579584-20200303-D00033.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/03/88/7e/da969ad06ef7f6/US10579584-20200303-D00034.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e4/cb/10/3be19b0b794fca/US10579584-20200303-D00034.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4e/e0/4f/e7113baf3eb890/US10579584-20200303-D00035.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/a7/fb/da/3f20ed116e85cd/US10579584-20200303-D00035.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/eb/b8/99/ff2ebb7d8ef110/US10579584-20200303-D00036.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/43/35/de/d791d7c8874a23/US10579584-20200303-D00036.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/05/3b/7a/a47ef6e56ba99d/US10579584-20200303-D00037.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/b7/a7/2c/b8ffabcda9675b/US10579584-20200303-D00037.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ba/22/c8/e2ff23c48d1c2b/US10579584-20200303-D00038.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/b8/2d/20/b49d8bc086d81c/US10579584-20200303-D00038.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b1/51/b8/b6c62658d2e05e/US10579584-20200303-D00039.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/2b/ef/0f/b3fa0e6c9e9ccc/US10579584-20200303-D00039.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/88/66/2e/372f62152b4647/US10579584-20200303-D00040.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/21/66/37/4d4413fd3a2009/US10579584-20200303-D00040.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/44/dd/0a/94a3abffc123e4/US10579584-20200303-D00041.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/8e/3d/ed/6f728ee1e8aafe/US10579584-20200303-D00041.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/0c/1d/06/bc7cc6409b594f/US10579584-20200303-D00042.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/a1/fd/7f/509e8190718085/US10579584-20200303-D00042.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d1/fc/51/4e7d39fd0447e4/US10579584-20200303-D00043.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ee/98/ac/40d95adb6a31c3/US10579584-20200303-D00043.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f7/e8/38/9b7cb54876d044/US10579584-20200303-D00044.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/2f/17/13/957ccfa5364489/US10579584-20200303-D00044.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/79/00/a9/521b01645c2fd6/US10579584-20200303-D00045.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/5b/2d/a8/1abfdc2b808feb/US10579584-20200303-D00045.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/40/f8/5d/7f73c8563d7a78/US10579584-20200303-D00046.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/74/f7/29/a1c642601db980/US10579584-20200303-D00046.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d8/10/41/ed6625a3198189/US10579584-20200303-D00047.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/3b/37/32/b1a5cf6ed029f4/US10579584-20200303-D00047.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/85/e1/dd/3a9ed5f628fb65/US10579584-20200303-D00048.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/37/df/05/b2b61af3a667c6/US10579584-20200303-D00048.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/a0/95/92/741642b14bdb34/US10579584-20200303-D00049.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/40/28/91/8a6501a415e5f0/US10579584-20200303-D00049.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ab/dd/eb/d1b16085b2ecf4/US10579584-20200303-D00050.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e0/74/38/7f202af4be9c29/US10579584-20200303-D00050.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2d/b2/80/d7222e6177de0e/US10579584-20200303-D00051.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4c/bb/45/457e64c75c0ff3/US10579584-20200303-D00051.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e2/6d/b6/d33c1fd2717514/US10579584-20200303-D00052.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/0c/f2/dd/0437eaa3dde916/US10579584-20200303-D00052.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/1b/e1/5a/25f1ed346849a3/US10579584-20200303-D00053.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/65/38/7d/326dc7801a1069/US10579584-20200303-D00053.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/75/1e/53/c0bbb3d41a5f15/US10579584-20200303-D00054.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/3f/a6/e2/9f03bcccbbea7d/US10579584-20200303-D00054.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/79/74/eb/93e092fa06bf91/US10579584-20200303-D00055.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/72/f9/a0/dbe5c2cb7787a2/US10579584-20200303-D00055.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ed/06/26/605e8cb4a34f32/US10579584-20200303-D00056.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/69/5c/ef/12212264d64ba5/US10579584-20200303-D00056.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/34/21/68/8a73fad2e4d3d3/US10579584-20200303-D00057.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/fb/ab/b9/ff579fe8cb5675/US10579584-20200303-D00057.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/a4/2d/96/9d287933ddea81/US10579584-20200303-D00058.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e4/73/70/b739fed7234ad0/US10579584-20200303-D00058.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/7b/a3/05/a101329eceb588/US10579584-20200303-D00059.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/d4/c6/ff/a258df4d6262a1/US10579584-20200303-D00059.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/54/24/18/af7887361b0e4d/US10579584-20200303-D00060.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/14/45/74/e17e11e25fc56d/US10579584-20200303-D00060.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/44/ab/9b/bd1f828c9c578c/US10579584-20200303-D00061.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/16/5c/dc/822520210adcd2/US10579584-20200303-D00061.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/33/86/e3/39c45d088afe0c/US10579584-20200303-D00062.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/93/08/a1/47fc971f264b68/US10579584-20200303-D00062.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2d/4d/d2/60b3bd048c7d36/US10579584-20200303-D00063.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/3e/39/67/b462bdc2837a58/US10579584-20200303-D00063.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/94/2b/c1/a6901fb285fc2f/US10579584-20200303-D00064.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/9d/c3/d3/be56686d917c14/US10579584-20200303-D00064.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/ec/21/af/e4b758169304ad/US10579584-20200303-D00065.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e1/e8/b2/6f0dd6ba8612a4/US10579584-20200303-D00065.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/80/81/cb/7b1d08ae7404b1/US10579584-20200303-D00066.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/e7/53/8d/460d7e75483b43/US10579584-20200303-D00066.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/49/81/c5/0d1dea1104ab5b/US10579584-20200303-D00067.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/44/dd/f0/3723b27c140bbb/US10579584-20200303-D00067.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/75/29/40/f2af75bc404926/US10579584-20200303-D00068.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/bd/c3/39/59311ae6cb2f9c/US10579584-20200303-D00068.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/68/52/be/158af262a50490/US10579584-20200303-D00069.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/9e/df/aa/92b506b76df66b/US10579584-20200303-D00069.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/55/3a/9a/65a833470c1a16/US10579584-20200303-D00070.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c3/79/f4/3860ee83160b11/US10579584-20200303-D00070.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/4d/44/fe/a94fc6a169b556/US10579584-20200303-D00071.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c3/88/95/dcc125a6686daf/US10579584-20200303-D00071.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/1c/d8/10/03d3f35baaa230/US10579584-20200303-D00072.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/1e/70/38/76979e528c4901/US10579584-20200303-D00072.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/51/cc/dc/0b4b73d844f407/US10579584-20200303-D00073.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/89/6d/37/c101bea97edbde/US10579584-20200303-D00073.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/17/8f/34/591f0613d0e150/US10579584-20200303-D00074.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7e/8d/a4/a084d1f6649f07/US10579584-20200303-D00074.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/63/a6/a4/7a91dee7f2ed38/US10579584-20200303-D00075.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/21/b4/f0/3e398492e7b806/US10579584-20200303-D00075.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/93/3a/bd/afa7c5ff1efaf8/US10579584-20200303-D00076.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/30/cf/cd/d93f62ebad8905/US10579584-20200303-D00076.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/25/03/da/57d77ac43862a4/US10579584-20200303-D00077.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/19/7f/cb/664874910570ed/US10579584-20200303-D00077.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/55/26/fe/781167a7ae26f9/US10579584-20200303-D00078.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/d5/24/7e/253ed6094c85c5/US10579584-20200303-D00078.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2e/66/50/a64d37ba65304a/US10579584-20200303-D00079.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/55/c0/bd/7d1d21a521c417/US10579584-20200303-D00079.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/87/7d/fc/f24842ba388462/US10579584-20200303-D00080.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/7d/06/11/4103d8a995a46e/US10579584-20200303-D00080.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/bc/f7/d6/a76895ed05600a/US10579584-20200303-D00081.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/0b/05/3f/9500b1129c3f2a/US10579584-20200303-D00081.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/2c/11/35/209683c9214a08/US10579584-20200303-D00082.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/81/c2/12/c31cd1b962cdae/US10579584-20200303-D00082.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b1/0c/26/84a228ec75de37/US10579584-20200303-D00083.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/f7/09/59/5c77a1461969a1/US10579584-20200303-D00083.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/d6/a8/44/c4ab92c0b7b162/US10579584-20200303-D00084.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/12/91/e6/450275c359aa70/US10579584-20200303-D00084.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/e1/80/8b/498003b7fb9285/US10579584-20200303-D00085.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/01/30/06/4114f4f7e180ef/US10579584-20200303-D00085.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/72/2d/0b/bb94a1c4d4018e/US10579584-20200303-D00086.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/16/84/8b/eb8cb04d00c0cc/US10579584-20200303-D00086.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/62/c6/56/ab397e7803e978/US10579584-20200303-D00087.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/c8/b0/fd/1b20cb00e7d082/US10579584-20200303-D00087.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/c0/67/d4/5afb7cad389158/US10579584-20200303-D00088.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/97/79/6e/50107dba257d88/US10579584-20200303-D00088.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/f6/9d/42/160db7871f9f49/US10579584-20200303-D00089.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ad/2e/b3/faeb80a771eb79/US10579584-20200303-D00089.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/fb/7c/71/3d107c4d1ed958/US10579584-20200303-D00090.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/4a/38/41/a8381e5b78dbb3/US10579584-20200303-D00090.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b2/20/07/4174338d1e3733/US10579584-20200303-D00091.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/40/65/69/c695d78f1a09d6/US10579584-20200303-D00091.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/57/d9/de/96f6826801ec25/US10579584-20200303-D00092.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/ac/6c/10/d933cc65e8b78a/US10579584-20200303-D00092.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/46/2c/f3/484d4a9524ddb9/US10579584-20200303-D00093.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/64/7f/0b/ac4327716fd727/US10579584-20200303-D00093.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/b7/40/64/cfece00bf6a41b/US10579584-20200303-D00094.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/68/44/22/919cc894078e86/US10579584-20200303-D00094.png'
            }
          },
          {
            image: {
              url: 'https://patentimages.storage.googleapis.com/80/db/38/f91bb1d1179fb5/US10579584-20200303-D00095.png'
            },
            thumbnail: {
              url: 'https://patentimages.storage.googleapis.com/00/ea/64/2c4cc83c3b80db/US10579584-20200303-D00095.png'
            }
          }
        ],
        priority: {
          date: '2002-03-21T00:00:00.000Z'
        },
        filing: {
          date: '2015-10-27T00:00:00.000Z'
        },
        grant: {
          date: '2020-03-03T00:00:00.000Z'
        },
        publication: {
          date: '2020-03-03T00:00:00.000Z',
          number: 'US10579584B2'
        }
      },
      {
        title: 'Method of micro specialization in database management system',
        inventor: 'ケイ． デブライ ソーミヤ',
        assignee:
          'ザ アリゾナ ボード オブ リージェンツ オン ビハーフ オブ ザ ユニバーシティー オブ アリゾナ',
        language: 'en',
        pdf: {
          url: 'https://patentimages.storage.googleapis.com/b7/51/60/ebc4a6f8d27c99/JP6491725B2.pdf'
        },
        url: 'https://patents.google.com/patent/JP6491725B2/en',
        description:
          'A computer-implemented method for implementing dynamic template-based specialization, said method comprising: Providing a function, wherein the function verifies an element of an input tuple value and determines which...',
        figures: [],
        priority: {
          date: '2011-12-23T00:00:00.000Z'
        },
        filing: {
          date: '2017-10-25T00:00:00.000Z'
        },
        grant: {
          date: '2019-03-27T00:00:00.000Z'
        },
        publication: {
          date: '2019-03-27T00:00:00.000Z',
          number: 'JP6491725B2'
        }
      }
    ]
  },
  autocomplete: {
    code: `const page = await google(
  'javascript debounce',
  { type: 'autocomplete' }
)`,
    payload: [
      {
        value: 'javascript debounce'
      },
      {
        value: 'javascript debounce function'
      },
      {
        value: 'javascript debounce implementation'
      },
      {
        value: 'javascript debounce vs throttle'
      },
      {
        value: 'javascript debounce function example'
      },
      {
        value: 'javascript debounce example'
      },
      {
        value: 'javascript debounce event listener'
      },
      {
        value: 'javascript debounce and throttle'
      },
      {
        value: 'javascript debounce async function'
      },
      {
        value: 'javascript debounce library'
      }
    ]
  }
}

export default GOOGLE_VERTICAL_EXAMPLES
