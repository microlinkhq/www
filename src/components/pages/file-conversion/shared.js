import React from 'react'
import { colors } from 'theme'
import {
  Repeat as RepeatIcon,
  FileText as FileTextIcon,
  Table as TableIcon,
  Cpu as CpuIcon,
  CheckSquare as CheckSquareIcon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.orange8
export const TILE_BG = colors.orange0

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.red9} 0%,
  ${colors.red9} 48%,
  ${colors.orange9} 48%,
  ${colors.orange9} 52%,
  ${colors.orange8} 52%,
  ${colors.orange8} 65%,
  ${colors.orange7} 65%,
  ${colors.orange7} 79%,
  ${colors.yellow7} 79%,
  ${colors.yellow7} 100%
)`

export const HERO = {
  title: 'File conversion API for developers',
  description:
    'Point the API at a document and get HTML, Markdown or clean text back. PDFs, Word files, spreadsheets and slide decks become content your code can read.',
  ctaHref: '/docs/guides/content-conversion',
  ctaLabel: 'Get Started',
  editorHeight: 100,
  examples: [
    {
      label: 'PDF → Markdown',
      mqlCode: {
        url: 'https://arxiv.org/pdf/1706.03762',
        data: { markdown: { attr: 'markdown' } },
        meta: false
      }
    },
    {
      label: 'DOCX → HTML',
      mqlCode: {
        url: 'https://cdn.microlink.io/file-examples/sample.docx',
        data: { html: { attr: 'html' } },
        meta: false
      }
    },
    {
      label: 'XLSX → PDF',
      mqlCode: {
        url: 'https://cdn.microlink.io/file-examples/sample.xlsx',
        pdf: true,
        meta: false
      }
    },
    {
      label: 'XLSX → Markdown',
      mqlCode: {
        url: 'https://cdn.microlink.io/file-examples/sample.xlsx',
        data: { markdown: { attr: 'markdown' } },
        meta: false
      }
    },
    {
      label: 'PPTX → Text',
      mqlCode: {
        url: 'https://cdn.microlink.io/file-examples/sample.pptx',
        data: { text: { attr: 'text' } },
        meta: false
      }
    }
  ]
}

export const TIMINGS = {
  title: 'Send the file URL',
  subtitle: 'Get readable content back',
  stats: [
    { healthcheckKey: 'meta', label: 'P95 cold response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: 'One endpoint',
  titleAccent: 'for every file type.',
  caption:
    'Documents arrive in whatever format their author chose. Instead of maintaining a parser per extension, send the URL and pick the output you want.',
  items: [
    {
      icon: FileTextIcon,
      title: 'Documents and decks',
      description:
        'PDFs, Word documents, presentations and rich text all resolve to readable content through the same request, with no per-format library to install.'
    },
    {
      icon: TableIcon,
      title: 'Spreadsheets and data files',
      description: (
        <>
          Tabular formats convert too. The{' '}
          <Link href='/formats'>supported formats table</Link> lists everything
          the converter accepts today.
        </>
      )
    },
    {
      icon: RepeatIcon,
      title: 'Pick your output',
      description: (
        <>
          The same source can come back as <Link href='/html'>HTML</Link>,{' '}
          <Link href='/markdown'>Markdown</Link> or{' '}
          <Link href='/text'>plain text</Link> — whichever fits what consumes
          it.
        </>
      )
    },
    {
      icon: CpuIcon,
      title: 'No local toolchain',
      description:
        'No LibreOffice container to run, no Ghostscript to patch, no parser dependencies to keep current. The conversion happens on our infrastructure.'
    },
    {
      icon: CheckSquareIcon,
      title: 'Structure preserved',
      description:
        'Headings, lists, tables and links survive the conversion when the output format supports them, so documents stay navigable downstream.'
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. The file conversion API is free to start — just call the endpoint.'

export const CTA = {
  caption:
    'Get 25 requests/day with zero commitment. The file conversion API is free to use, with no account and no credit card. Send a document URL and get readable content back in seconds.',
  ctaHref: '/docs/guides/content-conversion',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'Everything you need to know about the Microlink file conversion API.'

export const FAQ_ITEMS = [
  {
    question: 'Which file formats can I convert?',
    text: 'Documents, presentations, spreadsheets and rich text formats are all supported, alongside regular web pages. The formats page lists every format the converter currently accepts and what it converts to.',
    answer: (
      <>
        <div>
          Documents, presentations, spreadsheets and rich text formats are all
          supported, alongside regular web pages.
        </div>
        <div>
          The <Link href='/formats'>formats page</Link> lists every format the
          converter currently accepts and what it converts to.
        </div>
      </>
    )
  },
  {
    question: 'What output formats can I ask for?',
    text: 'HTML, Markdown or plain text. Choose HTML when you need the full markup, Markdown when structure matters for a model or a docs pipeline, and plain text when you want the smallest possible payload.',
    answer: (
      <>
        <div>
          <Link href='/html'>HTML</Link>, <Link href='/markdown'>Markdown</Link>{' '}
          or <Link href='/text'>plain text</Link>.
        </div>
        <div>
          Choose HTML when you need the full markup, Markdown when structure
          matters for a model or a docs pipeline, and plain text when you want
          the smallest possible payload.
        </div>
      </>
    )
  },
  {
    question: 'Do I need to upload the file?',
    text: 'No. You pass a URL and the file is fetched and converted on our infrastructure. That keeps the integration to a single request and means you never proxy large binaries through your own servers.'
  },
  {
    question: 'Is document structure preserved?',
    text: 'Where the output format can represent it, yes. Headings, lists, tables and links survive the conversion, so a converted document stays navigable rather than collapsing into an undifferentiated block of text.'
  },
  {
    question: 'Do I need to run conversion tooling myself?',
    text: 'No. There is no LibreOffice container to operate, no Ghostscript to patch and no per-format parser to keep up to date. The conversion runs on Microlink infrastructure behind one API call.'
  },
  {
    question: 'Is every conversion billed?',
    text: 'No. Set a ttl and repeat conversions of the same file inside that window are served from the edge cache instantly, at no cost and without reprocessing the document.'
  }
]

export const META = {
  title: 'File Conversion API - Files to Markdown & Text',
  description:
    'Convert PDFs, Word documents, spreadsheets and slide decks into HTML, Markdown or clean text with one API call. No local toolchain. 25 free requests/day.',
  structuredName: 'Microlink File Conversion API',
  structuredDescription:
    'A developer-first API that converts documents, presentations and spreadsheets at any URL into HTML, Markdown or clean plain text, with structure preservation and global edge caching.',
  keywords: [
    'file conversion api',
    'pdf to markdown api',
    'document to text api',
    'convert file to html api',
    'docx to markdown api',
    'document parsing api'
  ],
  about: [
    {
      name: 'File format',
      sameAs: 'https://en.wikipedia.org/wiki/File_format'
    },
    {
      name: 'Data conversion',
      sameAs: 'https://en.wikipedia.org/wiki/Data_conversion'
    },
    {
      name: 'Markdown',
      sameAs: 'https://en.wikipedia.org/wiki/Markdown'
    }
  ]
}
