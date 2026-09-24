export const CONTENT = {
  slug: 'search-api/image-search',
  head: {
    title: 'Google image search API with full-size URLs',
    description: 'Search images by keyword and get full-resolution URLs with width and height, thumbnails, source pages and credits as JSON. Filter by size in code.'
  },
  hero: {
    title: 'Get full-size image URLs and dimensions from a Google image search API',
    intro: 'A Google image search API is what you need when the answer to a query is a picture: each result comes back with the full-resolution image URL, its width and height, a thumbnail, the page it came from, and the creator or credit when Google shows one. Content teams source visuals, catalogs find product shots and dataset builders collect examples by keyword. The [Search API](/search) returns them as JSON.',
    cta: {
      label: 'Start with the Search API',
      href: '/search'
    }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Image results give you thumbnails, not the actual image',
    paragraphs: [
      'Image search is built for browsing. The grid shows thumbnails, the full image sits behind a viewer, and the page that published it is one more click away. For a pipeline that needs the original file at a known size, every one of those hops is work.',
      'Scraping the image grid yourself gets you cached thumbnails and encoded links to the originals, loaded lazily as the page scrolls. Resolving each one to the real file and measuring it means downloading every candidate before you know whether it is big enough to use.',
      'type: images returns each result with image.url, image.width and image.height for the full-resolution file, a thumbnail with its own dimensions, url for the source page, and creator and credit when available. You filter by size and aspect ratio before downloading anything, then read the source page only for the images you keep.'
    ]
  },
  how: {
    title: 'How to find full-size images with the Google image search API',
    intro: 'Search by keyword, keep the images that fit your layout, then check the source before you use one. The [images guide](/docs/guides/search/images) documents the result shape.',
    steps: [
      {
        label: '1 · Search by keyword',
        sdk: "const { results } = await microlink.search('northern lights iceland', {\n  type: 'images'\n})\n\nconst images = results.map(({ title, url, image, thumbnail, creator, credit }) => ({\n  title,\n  source: url,\n  src: image.url,\n  width: image.width,\n  height: image.height,\n  preview: thumbnail.url,\n  creator,\n  credit\n}))",
        note: 'image is the full-resolution file and thumbnail the small preview, each with width and height. url is the page that published the image, where its license terms live.'
      },
      {
        label: '2 · Keep the ones that fit',
        code: 'const wide = results.filter(\n  ({ image }) => image.width >= 1600 && image.width / image.height >= 1.5\n)',
        language: 'js',
        note: 'There is no server-side size filter; the dimensions in each result are the filter. This keeps landscape images at least 1600 pixels wide, before any download.'
      },
      {
        label: '3 · Read the source page',
        sdk: 'const [pick] = wide\n\nconst sourcePage = await pick.markdown()',
        note: 'markdown() fetches the page the image came from as Markdown, one request, so you can read the caption, the credit line and the usage terms around it. See [content expansion](/docs/guides/search/content-expansion) for the HTML variant.'
      }
    ],
    params: [
      {
        name: 'type',
        href: '/docs/sdk/methods/search/images',
        note: "'images' returns title, url, image and thumbnail, plus optional google, creator and credit."
      },
      {
        name: 'location',
        href: '/docs/sdk/methods/search',
        note: 'Two-letter country code that geo-targets the results.'
      },
      {
        name: 'limit',
        href: '/docs/sdk/methods/search',
        note: 'Maximum number of images per page.'
      },
      {
        name: 'page',
        href: '/docs/sdk/methods/search',
        note: 'More candidates when too few pass your size filter, one request per page.'
      }
    ],
    outro: 'The search takes a text query. It does not accept an image as input, so it does no reverse image search and finds no visually similar images. For moving pictures, the [videos surface](/docs/guides/search/videos) returns duration, channel and publish date with the same client.'
  },
  why: {
    title: 'Why image results with dimensions save a download step',
    intro: 'Most image pipelines discard most candidates. Knowing the size up front means the rejected ones are never downloaded.',
    cards: [
      {
        kicker: 'Size before download',
        title: 'width and height for the image and its thumbnail.',
        body: 'Filter for print widths, square crops for avatars or wide frames for hero banners using numbers already in the result. Only the images that pass reach your downloader.',
        note: 'Need a picture of a web page rather than a picture on it? [Capture a mobile screenshot at any viewport](/use-cases/website-screenshot/mobile) with the Screenshot API.'
      },
      {
        kicker: 'Attribution in the result',
        title: 'creator, credit and the source page.',
        body: 'When Google shows them, creator and credit arrive as fields, and url points to the page that published the image. That is what an editor needs to check the rights and credit the photographer.',
        note: 'Looking for products with prices rather than pictures? [Compare prices from Google Shopping](/use-cases/search-api/price-comparison), where each listing can carry its product image.'
      },
      {
        kicker: 'Query in, images out',
        title: 'A keyword and an optional country.',
        body: "The same microlink.search call as every other surface, with type: 'images'. location geo-targets the results by country and next() fetches more candidates, one request per page.",
        note: 'When not to: a search result is not a license. A found image still belongs to its creator, so check the source page before publishing it. And if you want to search by an image rather than for one, this surface does not do reverse image search.'
      }
    ]
  },
  faq: [
    {
      question: 'Does the Google image search API return full-size image URLs?',
      answer: 'Yes. image.url points to the full-resolution file with image.width and image.height, thumbnail carries the smaller preview with its own dimensions, and url is the page the image was published on.'
    },
    {
      question: 'Can I filter image search results by size?',
      answer: 'There is no size parameter. Every result includes its dimensions, so filter in code by minimum width, height or aspect ratio before downloading, and paginate with next() when too few results pass.'
    },
    {
      question: 'Can I do a reverse image search with this API?',
      answer: 'No. The images surface takes a text query and returns matching images. It does not accept an image as input and does not find visually similar images.'
    },
    {
      question: 'Can I publish images found through the image search API?',
      answer: 'The API returns what Google Images lists, with creator and credit when available and the source page URL. Rights stay with the owner, so check the terms on the source page before you publish an image.'
    },
    {
      question: 'How much does the image search API cost, and is it affiliated with Google?',
      answer: 'Each results page is one request. Search has no free tier: it is paid from the first request, and [Pro plans](/pricing) start at €39/month for 46,000 requests. Microlink Search is an independent product, not affiliated with or endorsed by Google; Google is a trademark of Google LLC.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to find',
    headlineAccent: 'full-size images',
    body: 'Full-resolution image URLs with dimensions and attribution as JSON. Get a Pro key and run your first image search today.',
    href: '/search',
    label: 'Search Google Images'
  },
  howTo: {
    name: 'How to find full-size images with a Google image search API',
    steps: [
      {
        title: 'Search by keyword',
        description: "Call microlink.search with the keyword and type: 'images', and read the full-resolution URL, width, height, thumbnail, source page, creator and credit of each result."
      },
      {
        title: 'Keep the images that fit',
        description: 'Filter the results in code by minimum width and aspect ratio using the dimensions each result already carries.'
      },
      {
        title: 'Read the source page',
        description: 'Call markdown() on the image you picked to fetch its source page as Markdown and check the caption, credit and usage terms.'
      }
    ]
  }
}
