const GOOGLE_EXAMPLES = {
  search: [
    {
      query: 'technical seo checklist',
      description: 'Audit and optimization guides from top SEO tools.',
      payload: [
        {
          title:
            'Full Technical SEO Checklist (from Start to Finish) - Semrush',
          url: 'https://www.semrush.com/blog/technical-seo-checklist/',
          description:
            'The full technical SEO checklist covers crawling and indexing issues, optimizing for user experience,. While creating this checklist, we also ...'
        },
        {
          title:
            'Technical SEO Checklist - The Roadmap to a ... - cognitiveSEO',
          url: 'https://cognitiveseo.com/blog/17963/technical-seo-checklist/',
          description:
            '31 steps within an technical SEO checklist that will help you create an SEO audit considering usability, UX, crawlability, navigation, functionality, ...'
        },
        {
          title: 'A Comprehensive Technical SEO Checklist for 2026 - DashThis',
          url: 'https://dashthis.com/blog/technical-seo-checklist/',
          description:
            'Technical SEO checklist · 1. Audit your website · 2. Speed up your site · 3. Improve crawling · 4. Make your site mobile-friendly · 5. Boost core web vitals · 6 ...'
        }
      ]
    },
    {
      query: 'react server components',
      description: 'Framework documentation and community discussions.',
      payload: [
        {
          title:
            'Explain me React Server Components like I am 10 years old. : r/nextjs',
          url: 'https://www.reddit.com/r/nextjs/comments/1aezfrs/explain_me_react_server_components_like_i_am_10/',
          description:
            'React Server Components are a new feature in React that allows developers to build components that can be rendered on the server and sent to the ...'
        },
        {
          title: 'Server Components - React',
          url: 'https://react.dev/reference/rsc/server-components',
          description:
            'Server Components are a new type of Component that renders ahead of time, before bundling, in an environment separate from your client app or SSR server.'
        },
        {
          title: 'An Introduction to React Server Components - DebugBear',
          url: 'https://www.debugbear.com/blog/react-server-components',
          description:
            "React Server Components (RSCs) introduce a server-first execution model where components that don't need interactivity are rendered exclusively ..."
        }
      ]
    },
    {
      query: 'site:developer.mozilla.org fetch api',
      description: 'Use operators to narrow results to a specific source.',
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
          title: 'Window: fetch() method - Web APIs - MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch',
          description:
            'The fetch() method of the Window interface starts the process of fetching a resource from the network, returning a promise that is fulfilled once the response ...'
        }
      ]
    }
  ],
  news: [
    {
      query: 'artificial intelligence',
      description: 'Breaking coverage across major publishers.',
      payload: [
        {
          title:
            'Artificial Intelligence Floods Court Dockets with Home-Brewed Lawsuits',
          publisher: 'The New York Times',
          date: '2026-05-25T15:13:08.232Z',
          url: 'https://www.nytimes.com/2026/05/25/us/politics/artificial-intelliegence-courts.html',
          description:
            'For years, courts have welcomed cases brought by self-represented litigants. Now those plaintiffs have A.I., and their filings are consuming...'
        },
        {
          title:
            'Improving multimodal wearable sensing for healthcare with artificial intelligence',
          publisher: 'Nature',
          date: '2026-05-27T15:13:08.234Z',
          url: 'https://www.nature.com/articles/s41587-026-03134-z',
          description:
            'This Comment explores artificial intelligence-driven strategies to accelerate the clinical translation of multimodal wearable sensors.'
        },
        {
          title: 'Florida budget considers AI for SNAP eligibility',
          publisher: 'WKMG',
          date: '2026-05-28T15:01:08.234Z',
          url: 'https://www.clickorlando.com/news/florida/2026/05/28/florida-budget-considers-ai-for-snap-eligibility/',
          description:
            'ORLANDO, Fla. – Florida is considering a $4 million investment in artificial intelligence to help determine who qualifies for food...'
        }
      ]
    },
    {
      query: 'tech layoffs',
      description: 'Track workforce changes in the tech industry.',
      payload: [
        {
          title: 'What ClickUp’s mass layoff tells us about the future of work',
          publisher: 'TechCrunch',
          date: '2026-05-26T15:43:07.503Z',
          url: 'https://techcrunch.com/2026/05/25/what-clickups-mass-layoff-tells-us-about-the-future-of-work/',
          description:
            'The nine-year-old startup is replacing hundreds of employees with thousands of AI agents.'
        },
        {
          title:
            'Tech’s Mass Layoffs Are Brutal—but They’ve Created a Massive Opening',
          publisher: 'Inc.com',
          date: '2026-05-27T15:43:07.504Z',
          url: 'https://www.inc.com/joe-procopio/techs-mass-layoffs-are-brutal-but-theyve-created-a-massive-opening/91349880',
          description:
            'As corporate tech goes all in on AI, the unintended consequences are creating opportunities for savvy workers and entrepreneurs alike.'
        },
        {
          title:
            'Meta lays off nearly 1,400 Washington employees in latest tech workforce cut',
          publisher: 'Fox Business',
          date: '2026-05-27T15:43:07.504Z',
          url: 'https://www.foxbusiness.com/technology/meta-lays-off-nearly-1400-washington-employees-latest-tech-workforce-cut',
          description:
            'Meta is laying off nearly 1400 employees across Washington state as Mark Zuckerberg pushes deeper into artificial intelligence investments...'
        }
      ]
    },
    {
      query: 'climate change summit',
      description: 'Follow international policy and summit coverage.',
      payload: [
        {
          title:
            'Scientists know how to phase out fossil fuels. These countries might be listening',
          publisher: 'Scientific American',
          date: '2026-04-28T15:43:08.762Z',
          url: 'https://www.scientificamerican.com/article/at-shadow-climate-summit-on-phasing-out-fossil-fuels-scientists-are-center-stage/',
          description:
            'Representatives of more than 50 nations gathered in Santa Marta, Colombia, this week at what was billed as the first global summit on...'
        },
        {
          title:
            'Santa Marta: Key outcomes from first summit on ‘transitioning away’ from fossil fuels',
          publisher: 'Carbon Brief',
          date: '2026-04-28T15:43:08.766Z',
          url: 'https://www.carbonbrief.org/santa-marta-key-outcomes-from-first-summit-on-transitioning-away-from-fossil-fuels/',
          description:
            'Countries attending a first-of-its-kind summit have walked away with plans to develop national roadmaps away from fossil fuels,...'
        },
        {
          title:
            'Santa Marta summit kick-starts work on key steps for fossil fuel transition',
          publisher: 'Climate Home News',
          date: '2026-04-28T15:43:08.766Z',
          url: 'https://www.climatechangenews.com/2026/04/30/santa-marta-summit-kick-starts-work-on-key-steps-for-fossil-fuel-transition/',
          description:
            'The conference offers some 60 nations help to develop roadmaps to shift their economies away from coal, oil and gas, and make international...'
        }
      ]
    }
  ],
  images: [
    {
      query: 'northern lights',
      description: 'High-resolution aurora photos with attribution.',
      payload: [
        {
          title:
            'Northern lights (aurora borealis) — What they are and how to see them |  Space',
          image: {
            url: 'https://cdn.mos.cms.futurecdn.net/57jQMDN5MZLYfV8ps8HuZQ.jpg',
            width: 2121,
            height: 1193
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKTwHpVqCxOgupSwj5tnQkfBpG8thtV5J4A&s',
            width: 300,
            height: 168
          },
          url: 'https://www.space.com/15139-northern-lights-auroras-earth-facts-sdcmp.html'
        },
        {
          title:
            'Northern Lights: The 10 Best Places to See the Magical Aurora Borealis | AD  Middle East',
          image: {
            url: 'https://media.admiddleeast.com/photos/67d44ac7d097ab3b0a5e99dc/2:3/w_2496,h_3744,c_limit/northern-lights-02.jpg',
            width: 2496,
            height: 3744
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHNw55gWyIcnpco0W0BskfR2s0WfE7_4IlA&s',
            width: 183,
            height: 275
          },
          url: 'https://www.admiddleeast.com/gallery/northern-lights-best-places-to-see-the-magical-aurora-borealis'
        },
        {
          title: 'How to see the northern lights: 14 top tips',
          image: {
            url: 'https://www.thetimes.com/imageserver/image/d54db4b8-dfc1-4c7e-a380-1a24b8290010.jpg?strip=all&format=webp&crop=1600px%2C900px%2C0px%2C0px&resize=1328',
            width: 1327,
            height: 746
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjtnsanQiGWfnc414ttefV6nA6y55mzyGOA&s',
            width: 300,
            height: 168
          },
          url: 'https://www.thetimes.com/travel/inspiration/adventure/where-can-i-see-the-northern-lights-bgbsf88r9'
        }
      ]
    },
    {
      query: 'mars surface nasa',
      description: 'Space imagery from official NASA sources.',
      payload: [
        {
          title:
            "Preparing for Martian Explorers: NASA's ESCAPADE Investigates Mars Space  Weather",
          image: {
            url: 'https://science.nasa.gov/wp-content/uploads/2017/11/pia17944.jpg',
            width: 1600,
            height: 900
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvc9m5Kq4PLkLJNiphhMSng1SCrh9mFGQ3Lg&s',
            width: 300,
            height: 168
          },
          url: 'https://science.nasa.gov/mars/facts/'
        },
        {
          title:
            "NASA Just Released the Highest Resolution Photo of Mars' Surface Ever -  National Space Grant Foundation",
          image: {
            url: 'https://spacegrant.org/wp-content/uploads/2020/03/Mars-surface.jpg',
            width: 1280,
            height: 740
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC_rFGstaQQYVc9St56IW_zSyC3Ru8v-bPaw&s',
            width: 295,
            height: 171
          },
          url: 'https://spacegrant.org/2020/03/16/nasa-just-released-the-highest-resolution-photo-of-mars-surface-ever/'
        },
        {
          title:
            "NASA's Curiosity Rover May Have Solved Mars' Missing Carbonate Mystery |  NASA Jet Propulsion Laboratory (JPL)",
          image: {
            url: 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/1-PIA26554-Curiosity_Surveys_the_Ubajara_Sampling_Site_4-Figure_A.jpg',
            width: 1896,
            height: 2110
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9X5D7D87iNyDi5jlXGF1lkjHtYorgi8coQ&s',
            width: 213,
            height: 237
          },
          url: 'https://www.jpl.nasa.gov/news/nasas-curiosity-rover-may-have-solved-mars-missing-carbonate-mystery/'
        }
      ]
    },
    {
      query: 'react architecture diagram',
      description: 'Technical diagrams for framework documentation.',
      payload: [
        {
          title: 'Architecture | Hands on React',
          image: {
            url: 'https://user-images.githubusercontent.com/1474579/65395139-5daf2580-dd5c-11e9-88bd-489848766507.png',
            width: 720,
            height: 405
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPzd0X80FYyxjMZrgSad_7OQy4Dj4hxgH1RA&s',
            width: 300,
            height: 168
          },
          url: 'https://handsonreact.com/docs/architecture'
        },
        {
          title: 'Architecture | Hands on React',
          image: {
            url: 'https://user-images.githubusercontent.com/1474579/65373190-30715300-dc48-11e9-8343-84fa96372e1b.png',
            width: 932,
            height: 540
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoNJfloCAlGtFTQbtZbiitajujKQ5R-pyjBA&s',
            width: 295,
            height: 171
          },
          url: 'https://handsonreact.com/docs/architecture'
        },
        {
          title:
            'React Architecture: A Complete Guide for Scalable Front-End Applications |  by Rohit Kuwar | Medium',
          image: {
            url: 'https://miro.medium.com/v2/resize:fit:1400/1*-l9HwOuRs0pXB7WFydrFOw.png',
            width: 1400,
            height: 933
          },
          thumbnail: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW506OvVNb3-Awo5Gk8dVL4EOYK3wi2cnRDg&s',
            width: 275,
            height: 183
          },
          url: 'https://medium.com/@rohitkuwar/react-architecture-a-complete-guide-for-scalable-front-end-applications-05e2ab8a79d7'
        }
      ]
    }
  ],
  videos: [
    {
      query: 'node.js streams',
      description: 'In-depth tutorials on streaming data in Node.',
      payload: [
        {
          title:
            'Learn Node.js Streams in 25 minutes | NodeJS Tutorials for ...',
          channel: 'Dipesh Malvia',
          date: '2024-08-22T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=EcznOgzOdxI',
          description:
            'In this video we will understand what are streams, types of streams and their uses in Node.js ? You will learn how to create Readable, ...',
          publisher: 'YouTube',
          duration: 1502000,
          duration_pretty: '25m'
        },
        {
          title: 'Everything You Should Know about Node.js Streams ...',
          channel: 'Erick Wendel',
          date: '2022-05-24T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=BdePYKgrMh0',
          description:
            "Hello, my friend. I'm Erick Wendel and welcome to one of the most important videos on this channel. Today is the #NodejsStreams day, ...",
          publisher: 'YouTube',
          duration: 2690000,
          duration_pretty: '45m'
        },
        {
          title: 'A Deep Dive into Node.js Streams | Masterclass',
          channel: 'Platformatic',
          date: '2024-04-22T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=edB964-YYpE',
          description:
            'Streams are the lifeblood of many Node.js applications, enabling efficient data processing and manipulation. But their evolution has been ...',
          publisher: 'YouTube',
          duration: 4546000,
          duration_pretty: '1h'
        }
      ]
    },
    {
      query: 'typescript generics tutorial',
      description: 'Step-by-step guides for TypeScript type parameters.',
      payload: [
        {
          title: 'Learn TypeScript Generics In 13 Minutes',
          channel: 'Web Dev Simplified',
          date: '2023-12-26T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=EcCTIExsqmI',
          description:
            'I tought myself the generic stuff by using it in my daily work and I still keep watching videos like this to learn about the very edgew cases - ...',
          publisher: 'YouTube',
          duration: 772000,
          duration_pretty: '13m'
        },
        {
          title: 'Typescript Generics | Beginners Tutorial with Examples',
          channel: 'Dave Gray',
          date: '2022-11-15T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=RWG66gIo7PM',
          description:
            'Web Dev Roadmap for Beginners (Free!): https://bit.ly/DaveGrayWebDevRoadmap Learn about Typescript Generics in this Typescript beginners ...',
          publisher: 'YouTube',
          duration: 1483000,
          duration_pretty: '25m'
        },
        {
          title:
            "Mastering Generics in TypeScript: The Ultimate Beginner's ...",
          channel: 'WebDev Frontiers',
          date: '2024-04-10T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=WBb7e0zYc4k',
          description:
            'Struggling with TypeScript Generics? Fear not, my friends! This "Mastering Generics in TypeScript: The Ultimate Beginner\'s Guide" is ...',
          publisher: 'YouTube',
          duration: 951000,
          duration_pretty: '16m'
        }
      ]
    },
    {
      query: 'css grid layout',
      description: 'Visual layout tutorials for modern CSS.',
      payload: [
        {
          title: 'CSS Grid Intro and Basic Layout Tutorial for Beginners',
          channel: 'Dave Gray',
          date: '2022-05-10T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=EaWj2AWI5Es',
          description:
            'Web Dev Roadmap for Beginners (Free!): https://bit.ly/DaveGrayWebDevRoadmap In this CSS Grid intro and basic layout tutorial for beginners, ...',
          publisher: 'YouTube',
          duration: 1538000,
          duration_pretty: '26m'
        },
        {
          title: 'CSS Grid Layout Crash Course',
          channel: 'Traversy Media',
          date: '2017-08-01T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=jV8B24rSN5o',
          description:
            '2022 Updated Crash Course - https://www.youtube.com/watch?v=0xMQfnTU6oo In this video we will look at the new CSS Grid layout and how to ...',
          publisher: 'YouTube',
          duration: 1675000,
          duration_pretty: '28m'
        },
        {
          title: 'Incredibly Easy Layouts with CSS Grid',
          channel: 'Layout Land',
          date: '2018-01-16T12:00:00.000Z',
          url: 'https://www.youtube.com/watch?v=tFKrK4eAiUQ',
          description:
            'The concepts of "implicit" and "explicit" explained — and what they mean in CSS Grid. Jen shows you how to do a common responsive image ...',
          publisher: 'YouTube',
          duration: 542000,
          duration_pretty: '9m'
        }
      ]
    }
  ],
  places: [
    {
      query: 'coworking spaces barcelona',
      description: 'Local coworking listings with ratings and coordinates.',
      payload: [
        {
          title: 'Betahaus | Coworking Barcelona',
          address: 'Carrer de Vilafranca, 7, 08024 Barcelona, Spain',
          latitude: 41.406982,
          longitude: 2.1567652,
          rating: 4.8,
          category: 'Coworking space',
          cid: '15533147541347981884',
          ratingCount: 417
        },
        {
          title: 'La Vaca Coworking Barcelona',
          address: 'Carrer de la Creu dels Molers, 19, 08004 Barcelona, Spain',
          latitude: 41.37411,
          longitude: 2.161943,
          rating: 4.8,
          category: 'Coworking space',
          cid: '4834554333533549252',
          ratingCount: 236
        },
        {
          title: 'OneCoWork Plaça Catalunya | Coworking Barcelona',
          address: "Carrer d'Estruc, 9, 08002 Barcelona, Spain",
          latitude: 41.386887,
          longitude: 2.1725054,
          rating: 4.8,
          category: 'Coworking space',
          cid: '17996530463156601469',
          ratingCount: 416
        }
      ]
    },
    {
      query: 'coffee shops lisbon',
      description: 'Cafés in Lisbon with reviews and contact info.',
      payload: [
        {
          title: 'The Folks Сhiado',
          address: 'R. dos Sapateiros 111',
          latitude: 38.711105,
          longitude: -9.138382,
          rating: 4.7,
          category: 'Coffee shop',
          cid: '18031604682027130059',
          ratingCount: 5900
        },
        {
          title: 'The Folks Sé',
          address: 'R. das Pedras Negras 7',
          latitude: 38.7105,
          longitude: -9.134333,
          rating: 4.8,
          category: 'Coffee shop',
          cid: '5134752419247404725',
          ratingCount: 2800
        },
        {
          title: 'FÁBRICA COFFEE ROASTERS',
          address: 'Rua das Flores 63',
          latitude: 38.709423,
          longitude: -9.143625,
          rating: 4.5,
          category: 'Coffee shop',
          cid: '14597490749978793313',
          ratingCount: 1600
        }
      ]
    },
    {
      query: 'bookstores tokyo',
      description: 'Bookstores in Tokyo with addresses and ratings.',
      payload: [
        {
          title: 'Tsutaya Books Daikanyama',
          address:
            'Sarugakucho, 17−5 代官山Ｔ－ＳＩＴＥ １号館～３号館 １階～２階',
          latitude: 35.648888,
          longitude: 139.69978,
          rating: 4.5,
          category: 'Book store',
          cid: '15490653164204088489',
          ratingCount: 9600
        },
        {
          title: 'Books Kinokuniya Tokyo',
          address: 'Sendagaya, 5 Chome−24−2 タカシマヤタイムズスクエア 南館 6F',
          latitude: 35.68598,
          longitude: 139.70242,
          rating: 4.5,
          category: 'Book store',
          cid: '15359765041214497677',
          ratingCount: 1400
        },
        {
          title: 'MARUZEN Marunouchi',
          address: 'Marunouchi, 1 Chome−6−4 丸の内オアゾ 1階～4階',
          latitude: 35.683514,
          longitude: 139.76666,
          rating: 4.4,
          category: 'Book store',
          cid: '13934615491403162587',
          ratingCount: 8100
        }
      ]
    }
  ],
  maps: [
    {
      query: 'restaurants madrid',
      description: 'Full restaurant metadata with hours and pricing.',
      payload: [
        {
          title: 'Rosi La Loca',
          address: 'C. de Cádiz, 4, Centro, 28012 Madrid, Spain',
          latitude: 40.4158037,
          longitude: -3.7029837,
          rating: 4.7,
          type: 'Restaurant',
          ratingCount: 25007,
          price: {
            level: '€20–40'
          },
          url: 'http://www.rosilaloca.com/',
          cid: '7112650868937611535',
          place: {
            id: 'ChIJgwIBTHkoQg0RD1lm5kc2tWI'
          }
        },
        {
          title: 'D-Sunset Madrid',
          address: 'C. de Espoz y Mina, 14, Centro, 28012 Madrid, Spain',
          latitude: 40.4156335,
          longitude: -3.7023857999999996,
          rating: 4.9,
          type: 'Restaurant',
          ratingCount: 1221,
          price: {
            level: '€10–20'
          },
          url: 'https://d-sunset.com/',
          cid: '5630448866125061776',
          place: {
            id: 'ChIJH-mF4MkpQg0RkJ5ij2lfI04'
          }
        },
        {
          title: 'Angelita Madrid',
          address: 'C. de la Reina, 4, Centro, 28004 Madrid, Spain',
          latitude: 40.420361299999996,
          longitude: -3.700395,
          rating: 4.7,
          type: 'Cocktail bar',
          ratingCount: 3357,
          price: {
            level: '€20–70'
          },
          url: 'http://madrid-angelita.es/',
          cid: '522308721330498010',
          place: {
            id: 'ChIJsTMCAocoQg0R2in-xQOdPwc'
          }
        }
      ]
    },
    {
      query: 'museums paris',
      description: 'Cultural venues with opening hours and ratings.',
      payload: [
        {
          title: 'Musée Rodin',
          address: '77 Rue de Varenne, 75007 Paris, France',
          latitude: 48.8553072,
          longitude: 2.3158354,
          rating: 4.7,
          type: 'Sculpture museum',
          ratingCount: 20363,
          url: 'https://www.musee-rodin.fr/',
          cid: '7235270467978162264',
          place: {
            id: 'ChIJQ9vMHipw5kcRWHC2ESjYaGQ'
          }
        },
        {
          title: "Musée d'Orsay",
          address: "Esplanade Valéry Giscard d'Estaing, 75007 Paris, France",
          latitude: 48.859961399999996,
          longitude: 2.3265614,
          rating: 4.8,
          type: 'Art museum',
          ratingCount: 113742,
          url: 'https://www.musee-orsay.fr/fr',
          cid: '15019994644224418776',
          place: {
            id: 'ChIJG5Qwtitu5kcR2CNEsYy9cdA'
          }
        },
        {
          title: 'Louvre Museum',
          address: '75001 Paris, France',
          latitude: 48.8606111,
          longitude: 2.337644,
          rating: 4.7,
          type: 'Art museum',
          ratingCount: 366887,
          url: 'https://www.louvre.fr/',
          cid: '13363865620386383060',
          place: {
            id: 'ChIJD3uTd9hx5kcR1IQvGfr8dbk'
          }
        }
      ]
    },
    {
      query: 'hotels amsterdam',
      description: 'Hotel listings with pricing and review counts.',
      payload: [
        {
          title: 'Monet Garden Hotel Amsterdam',
          address: 'Valkenburgerstraat 76, 1011 LZ Amsterdam, Netherlands',
          latitude: 52.3699155,
          longitude: 4.9073163,
          rating: 4.6,
          type: 'Hotel',
          ratingCount: 1533,
          url: 'https://www.monetgardenhotelamsterdam.com/?utm_source=GoogleBusiness',
          cid: '1606367725206128288',
          place: {
            id: 'ChIJR0UpAL0JxkcRoEaQZ-_2ShY'
          }
        },
        {
          title: 'Leonardo Eden Hotel Amsterdam City Center',
          address: 'Amstel 144, 1017 AE Amsterdam, Netherlands',
          latitude: 52.3668376,
          longitude: 4.8986899,
          rating: 4.1,
          type: 'Hotel',
          ratingCount: 4133,
          url: 'https://www.leonardo-hotels.com/amsterdam/leonardo-eden-hotel-amsterdam-city-center',
          cid: '11105840629229533852',
          place: {
            id: 'ChIJ-1hUL74JxkcRnLpTBTbfH5o'
          }
        },
        {
          title: 'Ciao Papa Hotel Amsterdam Central Station',
          address: 'Nieuwendijk 15-1, 1012 LZ Amsterdam, Netherlands',
          latitude: 52.378642299999996,
          longitude: 4.8952412999999995,
          rating: 4.3,
          type: 'Hotel',
          ratingCount: 369,
          url: 'https://www.ciaopapahotel.com/',
          cid: '1678210622287823819',
          place: {
            id: 'ChIJ__-EFcgJxkcRy8PAX6szShc'
          }
        }
      ]
    }
  ],
  shopping: [
    {
      query: 'macbook pro',
      description: 'Apple laptop pricing across retailers.',
      payload: [
        {
          title: '14-inch MacBook Pro Apple M5 chip CPU and GPU',
          url: 'https://www.google.com/search?ibp=oshop&q=macbook+pro&prds=localAnnotatedOfferId:1,catalogid:1293272249390991376,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: 'Apple',
          id: '1293272249390991376',
          price: {
            symbol: '$',
            amount: 1699
          },
          rating: {
            score: 4.8,
            total: 5,
            reviews: 2400
          }
        },
        {
          title: 'Apple 13.3 inch MacBook Pro SSD',
          url: 'https://www.google.com/search?ibp=oshop&q=macbook+pro&prds=localAnnotatedOfferId:1,catalogid:17689651069453647396,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: 'Walmart - Gadget Replay',
          id: '17689651069453647396',
          price: {
            symbol: '$',
            amount: 311.49
          },
          rating: {
            score: 4,
            total: 5,
            reviews: 710
          }
        },
        {
          title: 'Apple MacBook Pro 16-inch M4 Max Chip (Refurbished)',
          url: 'https://www.google.com/search?ibp=oshop&q=macbook+pro&prds=localAnnotatedOfferId:1,catalogid:16313566802190130465,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: 'Apple',
          id: '16313566802190130465',
          price: {
            symbol: '$',
            amount: 2119
          },
          rating: {
            score: 4.8,
            total: 5,
            reviews: 2300
          }
        }
      ]
    },
    {
      query: 'sony headphones',
      description: 'Audio product comparison with ratings.',
      payload: [
        {
          title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
          url: 'https://www.google.com/search?ibp=oshop&q=sony+headphones&prds=localAnnotatedOfferId:1,catalogid:17755277695162489284,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: 'Best Buy',
          id: '17755277695162489284',
          price: {
            symbol: '$',
            amount: 248
          },
          rating: {
            score: 4.7,
            total: 5,
            reviews: 26000
          }
        },
        {
          title: 'Sony WH-CH720N Noise Canceling Wireless Headphones',
          url: 'https://www.google.com/search?ibp=oshop&q=sony+headphones&prds=localAnnotatedOfferId:1,catalogid:7305018235342173179,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: 'Target',
          id: '7305018235342173179',
          price: {
            symbol: '$',
            amount: 99.99
          },
          rating: {
            score: 4.6,
            total: 5,
            reviews: 15000
          }
        },
        {
          title: 'Sony WH-1000XM6 Wireless Noise Canceling Headphones',
          url: 'https://www.google.com/search?ibp=oshop&q=sony+headphones&prds=localAnnotatedOfferId:1,catalogid:5636327565946258541,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: "Macy's",
          id: '5636327565946258541',
          price: {
            symbol: '$',
            amount: 398
          },
          rating: {
            score: 4.7,
            total: 5,
            reviews: 6600
          }
        }
      ]
    },
    {
      query: 'mechanical keyboard',
      description: 'Keyboard pricing from multiple merchants.',
      payload: [
        {
          title:
            'RK ROYAL KLUDGE RK61 Wired 60% Mechanical Gaming Keyboard RGB',
          url: 'https://www.google.com/search?ibp=oshop&q=mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:16070495412881733855,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: 'RK Royal Kludge',
          id: '16070495412881733855',
          price: {
            symbol: '$',
            amount: 49.99
          },
          rating: {
            score: 4.8,
            total: 5,
            reviews: 5900
          }
        },
        {
          title: 'HyperX Alloy Origins 65% Mechanical Gaming Keyboard',
          url: 'https://www.google.com/search?ibp=oshop&q=mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:10412508201090334370,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: 'Target',
          id: '10412508201090334370',
          price: {
            symbol: '$',
            amount: 69.99
          },
          rating: {
            score: 4.8,
            total: 5,
            reviews: 661
          }
        },
        {
          title: 'Ajazz AK820',
          url: 'https://www.google.com/search?ibp=oshop&q=mechanical+keyboard&prds=localAnnotatedOfferId:1,catalogid:10877257236709751183,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPROD_PC_6027158597472037202&gl=us&udm=28&pvorigin=2',
          publisher: 'Walmart - LexonTech',
          id: '10877257236709751183',
          price: {
            symbol: '$',
            amount: 39.09
          },
          rating: {
            score: 4.7,
            total: 5,
            reviews: 2800
          }
        }
      ]
    }
  ],
  scholar: [
    {
      query: 'attention is all you need',
      description: 'Landmark transformer papers and citation data.',
      payload: [
        {
          title: 'Attention is all you need',
          year: 2017,
          id: '5Gohgn6QFikJ',
          url: 'https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html',
          publisher:
            'A Vaswani, N Shazeer, N Parmar… - Advances in neural …, 2017 - proceedings.neurips.cc',
          citations: 249883
        },
        {
          title:
            'Attention is all you need: utilizing attention in AI-enabled drug discovery',
          year: 2024,
          id: '4ZRunyZN6eIJ',
          url: 'https://academic.oup.com/bib/article-abstract/25/1/bbad467/7512647',
          publisher:
            'Y Zhang, C Liu, M Liu, T Liu, H Lin… - Briefings in …, 2024 - academic.oup.com',
          citations: 169
        },
        {
          title: 'Attention is all you need in speech separation',
          year: 2021,
          id: 'BwvwD2whQ64J',
          url: 'https://ieeexplore.ieee.org/abstract/document/9413901/',
          publisher:
            'C Subakan, M Ravanelli, S Cornell… - ICASSP 2021-2021 …, 2021 - ieeexplore.ieee.org',
          citations: 1054
        }
      ]
    },
    {
      query: 'large language models',
      description: 'Survey papers on LLM capabilities and evaluation.',
      payload: [
        {
          title: 'A survey on evaluation of large language models',
          year: 2024,
          id: 'o93zfHYlUTIJ',
          url: 'https://dl.acm.org/doi/abs/10.1145/3641289',
          publisher:
            'Y Chang, X Wang, J Wang, Y Wu, L Yang… - ACM transactions on …, 2024 - dl.acm.org',
          citations: 5980
        },
        {
          title:
            'ChatGPT for good? On opportunities and challenges of large language models for education',
          year: 2023,
          id: 'uthwmf2nU3EJ',
          url: 'https://www.sciencedirect.com/science/article/pii/S1041608023000195',
          publisher:
            'E Kasneci, K Seßler, S Küchemann, M Bannert… - Learning and individual …, 2023 - Elsevier',
          citations: 10134
        },
        {
          title: 'A survey of large language models',
          year: 2023,
          id: 'Laj3JsRSUToJ',
          url: 'https://openreview.net/pdf?id=W4tk39cy2b',
          publisher:
            'WX Zhao, K Zhou, J Li, T Tang, X Wang… - arXiv preprint arXiv …, 2023 - openreview.net',
          citations: 8672
        }
      ]
    },
    {
      query: 'neural machine translation',
      description: 'Academic research on sequence-to-sequence models.',
      payload: [
        {
          title: 'Neural machine translation: A review',
          year: 2020,
          id: '1TMsOIfiy8gJ',
          url: 'https://www.jair.org/index.php/jair/article/view/12007',
          publisher:
            'F Stahlberg - Journal of Artificial Intelligence Research, 2020 - jair.org',
          citations: 742
        },
        {
          title: 'A survey of multilingual neural machine translation',
          year: 2020,
          id: '0HKqfB-o-YAJ',
          url: 'https://dl.acm.org/doi/abs/10.1145/3406095',
          publisher:
            'R Dabre, C Chu, A Kunchukuttan - ACM Computing Surveys (CSUR), 2020 - dl.acm.org',
          citations: 530
        },
        {
          title:
            'Neural machine translation by jointly learning to align and translate',
          year: 1409,
          id: '7shpF8Tg3oIJ',
          url: 'https://peerj.com/articles/cs-2607/code.zip',
          publisher:
            'D Bahdanau, K Cho, Y Bengio - arXiv preprint arXiv:1409.0473, 2014 - peerj.com',
          citations: 43704
        }
      ]
    }
  ],
  patents: [
    {
      query: 'compiler optimization',
      description: 'Compiler patents with priority dates and PDFs.',
      payload: [
        {
          title: 'Prefetching associated with predicated load instructions',
          inventor: 'Douglas C. Burger',
          assignee: 'Microsoft Technology Licensing, Llc',
          language: 'en',
          url: 'https://patents.google.com/patent/US20170083338A1/en',
          publication: {
            date: '2017-03-23T00:00:00.000Z',
            number: 'US20170083338A1'
          }
        },
        {
          title:
            'Systems and methods for parallelization of program code, interactive data …',
          inventor: 'Luke Hutchison',
          assignee: 'Luke Hutchison',
          language: 'en',
          url: 'https://patents.google.com/patent/US10209963B2/en',
          publication: {
            date: '2019-02-19T00:00:00.000Z',
            number: 'US10209963B2'
          }
        },
        {
          title: 'Automated compiler specialization for global optimization',
          inventor: 'Colin A. McEwan',
          assignee: 'Mstar Semiconductor, Inc.',
          language: 'en',
          url: 'https://patents.google.com/patent/US9552193B2/en',
          publication: {
            date: '2017-01-24T00:00:00.000Z',
            number: 'US9552193B2'
          }
        }
      ]
    },
    {
      query: 'machine learning inference',
      description: 'ML inference hardware and optimization patents.',
      payload: [
        {
          title:
            'Massively parallel real-time database-integrated machine learning inference …',
          inventor: 'Dylan Tong',
          assignee: 'Amazon Technologies, Inc.',
          language: 'en',
          url: 'https://patents.google.com/patent/US11429893B1/en',
          publication: {
            date: '2022-08-30T00:00:00.000Z',
            number: 'US11429893B1'
          }
        },
        {
          title:
            'High performance machine learning inference framework for edge devices',
          inventor: 'Gang Chen',
          assignee: 'Amazon Technologies, Inc.',
          language: 'en',
          url: 'https://patents.google.com/patent/US11704577B1/en',
          publication: {
            date: '2023-07-18T00:00:00.000Z',
            number: 'US11704577B1'
          }
        },
        {
          title: 'Machine learning inference system',
          inventor: 'Lewis Carl Christiansen',
          assignee: 'Onfido Ltd',
          language: 'en',
          url: 'https://patents.google.com/patent/US20210125104A1/en',
          publication: {
            date: '2021-04-29T00:00:00.000Z',
            number: 'US20210125104A1'
          }
        }
      ]
    },
    {
      query: 'natural language processing',
      description: 'NLP system patents with inventor metadata.',
      payload: [
        {
          title:
            'Apparatus, program, and computer-implemented method for automated processing of …',
          inventor: 'Not Given',
          assignee: 'Xero Limited',
          language: 'en',
          url: 'https://patents.google.com/patent/AU2024901753A0/en',
          publication: {
            date: '2024-06-27T00:00:00.000Z',
            number: 'AU2024901753A0'
          }
        },
        {
          title:
            'Apparatus, program, and computer-implemented method for automated processing of …',
          inventor: 'Not Given',
          assignee: 'Xero Limited',
          language: 'en',
          url: 'https://patents.google.com/patent/AU2024900526A0/en',
          publication: {
            date: '2024-03-14T00:00:00.000Z',
            number: 'AU2024900526A0'
          }
        },
        {
          title:
            'Automatic post-editing model for generated natural language text',
          inventor: 'Markus Freitag',
          assignee: 'Google Llc',
          language: 'en',
          url: 'https://patents.google.com/patent/US12039286B2/en',
          publication: {
            date: '2024-07-16T00:00:00.000Z',
            number: 'US12039286B2'
          }
        }
      ]
    }
  ],
  autocomplete: [
    {
      query: 'javascript debounce',
      description: 'Code utility pattern',
      payload: [
        {
          value: 'javascript debounce'
        },
        {
          value: 'javascript debounce function'
        },
        {
          value: 'javascript debounce vs throttle'
        }
      ]
    },
    {
      query: 'python async',
      description: 'Language feature',
      payload: [
        {
          value: 'python async'
        },
        {
          value: 'python asyncio'
        },
        {
          value: 'python async await'
        }
      ]
    },
    {
      query: 'react hooks',
      description: 'Framework concept',
      payload: [
        {
          value: 'react hooks'
        },
        {
          value: 'react hooks explained'
        },
        {
          value: 'react hooks cheat sheet'
        }
      ]
    }
  ]
}

export default GOOGLE_EXAMPLES
