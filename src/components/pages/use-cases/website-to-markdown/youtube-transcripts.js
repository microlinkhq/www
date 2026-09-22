export const CONTENT = {
  slug: 'website-to-markdown/youtube-transcripts',
  head: {
    title: 'Get a YouTube transcript as Markdown with one API call',
    description:
      'Send a YouTube watch, share, shorts or embed URL and get the caption transcript back as Markdown, with the video title, author, image and date.'
  },
  hero: {
    title: 'Get YouTube video transcripts as Markdown',
    intro:
      'A YouTube transcript API call is the same Markdown request you use for web pages: point it at a video URL and the caption transcript comes back as Markdown. Talks, tutorials, podcasts and interviews carry knowledge that never reaches a search index because it is spoken, not written. As text, it is ready for summaries, embeddings, show notes and study guides.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'YouTube videos are opaque to text pipelines',
    paragraphs: [
      'A summarizer or a RAG index cannot read a video. The knowledge in a conference talk or a product walkthrough stays out of reach of search, of your support bot and of the model you want to ask about it.',
      'Turning a YouTube video to text yourself means downloading the media and running speech recognition: minutes of compute per video, a model to host and transcripts that stumble over names and technical terms. The captions that already exist on YouTube would be better, but they sit behind a player and behind bot protection.',
      'Microlink recognizes YouTube watch, youtu.be, shorts and embed URLs and returns the video’s caption transcript as the Markdown body, with the title, author, image and date resolved from the video metadata. YouTube blocks automated access, so the request needs the [built-in proxy](/features/proxy): send it with a Pro key and the proxy resolves automatically, with no parameter.'
    ]
  },
  how: {
    title: 'How to get a YouTube transcript as Markdown',
    intro:
      'The transcript uses the same Markdown rule as any page, as the [URL to Markdown guide](/docs/guides/content-conversion/url-to-markdown) shows. Send it with a Pro key so the automatic proxy reaches YouTube, and keep the metadata when you want the title and author alongside.',
    steps: [
      {
        label: '1 · Transcript with the SDK',
        sdk: "const transcript = await microlink.markdown(\n  'https://www.youtube.com/watch?v=tY2M2g-tG1Q'\n)",
        note: 'The call resolves to a string: the caption transcript of the video as Markdown. The client carries your Pro key, so automatic proxy resolution reaches YouTube with no extra option.'
      },
      {
        label: '2 · Transcript plus video metadata',
        sdk: "const { title, author, date, transcript } = await microlink.metadata(\n  'https://youtu.be/tY2M2g-tG1Q',\n  {\n    data: { transcript: { attr: 'markdown' } }\n  }\n)",
        note: 'Name the rule transcript and it rides along with the normalized video fields, so one request gives you the text plus the title, channel and publication date to cite it with.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://www.youtube.com/watch?v=tY2M2g-tG1Q',
          params: {
            data: { transcript: { attr: 'markdown' } },
            meta: false
          },
          pro: true
        },
        note: 'The URL form targets the pro endpoint because YouTube needs the proxy that comes with a Pro key. Read the transcript from data.transcript in the JSON response, or add embed=transcript to receive it directly as the response body.'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'data.transcript.attr=markdown asks for the caption transcript as the Markdown body.'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        note: 'Automatic on Pro plans with no value needed. YouTube blocks automated access, so transcripts need a Pro key.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'true keeps the video title, author, image and date. false returns the transcript alone. Default true.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return the transcript field directly as the response body instead of JSON.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Transcripts rarely change, so cache them for up to 31 days. Pro plans.'
      }
    ],
    outro:
      'The transcript is in the video’s own caption language: manual subtitles when the creator provided them, otherwise the auto-generated ones. Videos without captions, live streams and private videos return the standard metadata without a transcript body, so check the field before you index it.'
  },
  why: {
    title: 'Why YouTube captions beat speech recognition for transcripts',
    intro:
      'The transcript already exists. Reusing it is faster and cheaper than transcribing the audio again, and it is often more accurate.',
    cards: [
      {
        kicker: 'No media pipeline',
        title: 'No download, no audio model, no GPU.',
        body: 'Speech-to-text needs the media file, a model and minutes of compute per video. The caption track is text that YouTube already serves, and Microlink fetches it and formats it as Markdown in one request.',
        note: 'The request shape is the same as any other [Markdown API](/markdown) conversion. Only the URL is a video, so a transcript drops straight into [LLM context built from a URL](/use-cases/website-to-markdown/llm-context).'
      },
      {
        kicker: 'Creator captions when available',
        title: 'Manual subtitles are used before auto-generated ones.',
        body: 'When the creator uploaded subtitles, the transcript uses them, which usually means correct names, terms and punctuation. Auto-generated captions are the fallback, so a video without manual subtitles can still return a transcript.',
        note: 'Keep the metadata when your pipeline routes documents by author or date. [Markdown with metadata frontmatter](/use-cases/website-to-markdown/with-metadata) shows how to attach it to the file itself.'
      },
      {
        kicker: 'Same shape as articles',
        title: 'A talk becomes a document like any other.',
        body: 'The transcript arrives as Markdown with the video title, author and date, so the same chunker, embedder and summarizer handle videos and articles alike. Cached transcripts do not count against your quota when you read them again.',
        note: 'When not to: videos without captions, live streams and private videos return metadata only. For those, a speech-to-text step is still required.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I get the transcript of a YouTube video as Markdown?',
      answer:
        'Send the video URL with a Markdown rule, for example data.transcript.attr=markdown, and send it with a [Pro plan](/pricing) key so the proxy resolves automatically. Microlink resolves the video and returns its caption transcript as Markdown, with the title, author, image and date when meta is on.'
    },
    {
      question: 'Which YouTube URLs return a Markdown transcript?',
      answer:
        'Standard watch URLs, youtu.be share links, shorts and embed URLs. All of them resolve to the same video, so the transcript is identical whichever form your users paste.'
    },
    {
      question: 'Why does my YouTube Markdown request fail with EPROXYNEEDED?',
      answer:
        'YouTube uses antibot protection, so the request needs the built-in proxy. Send it with a Pro key and the proxy resolves automatically, with no parameter. The free endpoint surfaces the signal but cannot route through the proxy, the same behavior described in [Markdown from bot-protected pages](/use-cases/website-to-markdown/blocked-sites).'
    },
    {
      question: 'What language is the YouTube Markdown transcript in?',
      answer:
        'The video’s own caption language: manual subtitles when the creator provided them, otherwise the auto-generated captions. The transcript is not translated, so a Spanish talk returns Spanish text.'
    },
    {
      question: 'What does the Markdown request return for a video with no captions?',
      answer:
        'The request succeeds and returns the standard video metadata, but there is no transcript body. Live streams and private videos behave the same way, so check the field before passing it to a summarizer. For a playlist or a channel, run the URLs through [bulk Markdown conversion](/use-cases/website-to-markdown/bulk-conversion).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to read',
    headlineAccent: 'videos as text',
    body: 'Transcripts as Markdown from any YouTube URL, with the title and author attached. Get a Pro key and index your first talk today.',
    href: '/markdown',
    label: 'Get a transcript'
  },
  howTo: {
    name: 'How to get a YouTube video transcript as Markdown',
    steps: [
      {
        title: 'Request the transcript with the SDK',
        description:
          'Call the Markdown method with the YouTube URL on a Pro key. It resolves to the caption transcript of the video as a Markdown string.'
      },
      {
        title: 'Add the video metadata',
        description:
          'Call the metadata method on a Pro key with a data rule named transcript with attr set to markdown. The title, author and date come back next to the transcript.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Request the pro endpoint with url, data.transcript.attr=markdown, and meta=false with your API key, and read the transcript from data.transcript in the JSON response.'
      }
    ]
  }
}
