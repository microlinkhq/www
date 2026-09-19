export const CONTENT = {
  slug: 'website-to-markdown/youtube-transcripts',
  head: {
    title: 'YouTube video transcripts as Markdown via API',
    description:
      'Point a Markdown request at a YouTube watch, share or shorts URL and get the caption transcript as Markdown, with the video title and author.'
  },
  hero: {
    title: 'Get YouTube video transcripts as Markdown',
    intro:
      'Talks, tutorials and interviews carry knowledge that never reaches a search index because it is spoken, not written. Point the Markdown API at a YouTube URL and the caption transcript comes back as Markdown, ready for summaries, embeddings and notes.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Video is opaque to text pipelines',
    paragraphs: [
      'A summarizer or a RAG index cannot read a video. Downloading media and running speech recognition is slow and expensive, and the captions that already exist on YouTube are locked behind a player.',
      'Microlink recognizes YouTube watch, youtu.be, shorts and embed URLs and returns the video’s caption transcript as the Markdown body, with the title, author, image and date resolved from the video metadata. YouTube sits behind bot protection, so the request needs the built-in proxy, a Pro capability.'
    ]
  },
  how: {
    title: 'Convert the URL, get the transcript',
    intro:
      'The transcript uses the same Markdown rule as any page. Add proxy so the request reaches YouTube, and keep the metadata when you want the title and author alongside.',
    steps: [
      {
        label: '1 · Transcript with the SDK',
        sdk: "const transcript = await microlink.markdown(\n  'https://www.youtube.com/watch?v=tY2M2g-tG1Q',\n  { proxy: true }\n)",
        note: 'The Markdown body is the caption transcript; proxy routes the request through the automatic proxy resolution.'
      },
      {
        label: '2 · Transcript plus video metadata',
        sdk: "const { title, author, date, transcript } = await microlink.metadata(\n  'https://youtu.be/tY2M2g-tG1Q',\n  {\n    proxy: true,\n    data: { transcript: { attr: 'markdown' } }\n  }\n)",
        note: 'Name the rule transcript and it rides along with the normalized video fields.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://www.youtube.com/watch?v=tY2M2g-tG1Q',
          params: {
            data: { transcript: { attr: 'markdown' } },
            meta: false,
            proxy: true
          },
          pro: true
        },
        note: 'The URL form targets the pro endpoint because proxy is a Pro option.'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'data.transcript.attr=markdown asks for the transcript as the Markdown body.'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Required for YouTube, which blocks automated access; Pro plans.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'true keeps the video title, author, image and date; false returns the transcript alone.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return the transcript directly as text/markdown.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Transcripts rarely change; cache them for days on Pro plans.'
      }
    ],
    outro:
      'The transcript is the video’s own caption language: manual subtitles when the creator provided them, otherwise the auto-generated ones. Videos without captions, live streams and private videos return the standard metadata without a transcript body.'
  },
  why: {
    title: 'Why captions beat speech recognition here',
    intro:
      'The transcript already exists. Reusing it is faster, cheaper and often more accurate than transcribing the audio again.',
    cards: [
      {
        kicker: 'No media pipeline',
        title: 'No download, no audio model, no GPU.',
        body: 'Speech-to-text needs the media file, a model and minutes of compute per video. The caption track is text that YouTube already serves; Microlink fetches it and formats it as Markdown in one request.',
        note: 'This applies to any [Markdown conversion](/markdown): the request shape is the same, only the URL is a video.'
      },
      {
        kicker: 'Creator captions when available',
        title: 'Manual subtitles are used before auto-generated ones.',
        body: 'When the creator uploaded subtitles, the transcript uses them, which usually means correct names, terms and punctuation. Auto-generated captions are the fallback.',
        note: 'Keep the metadata when your pipeline routes documents by language or author.'
      },
      {
        kicker: 'Same shape as articles',
        title: 'A talk becomes a document like any other.',
        body: 'The transcript arrives as Markdown with the video title, author and date, so the same chunker, embedder and summarizer handle videos and articles alike.',
        note: 'When not to: videos without captions, live streams and private videos return metadata only. For those, a speech-to-text step is still required.'
      }
    ]
  },
  faq: [
    {
      question: 'Which YouTube URLs are supported for transcripts?',
      answer:
        'Standard watch URLs, youtu.be share links, shorts and embed URLs. Microlink resolves the video and returns its caption transcript as the Markdown body.'
    },
    {
      question: 'Why do I get EPROXYNEEDED on a YouTube URL?',
      answer:
        'YouTube uses antibot protection, so the request needs the built-in proxy. Add proxy: true on a Pro plan; the free endpoint surfaces the signal but cannot route through the proxy.'
    },
    {
      question: 'What language is the transcript in?',
      answer:
        'The video’s own caption language: manual subtitles when the creator provided them, otherwise the auto-generated captions.'
    },
    {
      question: 'What happens with a video that has no captions?',
      answer:
        'The request succeeds and returns the standard video metadata, but there is no transcript body. Live streams and private videos behave the same way.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to read',
    headlineAccent: 'videos as text',
    body: 'Transcripts as Markdown from any YouTube URL, with the title and author attached. Get a Pro key and index your first talk today.',
    href: '/markdown',
    label: 'Get a transcript'
  }
}
