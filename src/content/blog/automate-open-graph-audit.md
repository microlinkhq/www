---
title: 'Audit the Open Graph tags of every page in your sitemap'
subtitle: 'Checking a 5,000-page sitemap with three dependencies'
description: 'Build a Node.js script that reads your sitemap, fetches each URL with Microlink, and reports every page with a missing Open Graph image, title, description, author, date, or logo.'
authors:
  - joseba
date: '2026-01-23'
---

This post builds a Node.js script that reads your sitemap, fetches the metadata of every URL with Microlink, and writes a report of each page with a missing Open Graph image, title, description, author, date, or logo. It takes three dependencies and one file, `audit.js`.

**TL;DR**

- Nobody audits **5,000 pages** by hand, so `audit.js` checks every URL in your sitemap on its own, every time.
- It needs three dependencies: `sitemapper`, `@microlink/mql`, and `p-map`.
- Microlink runs each page in a real headless Chrome browser, so tags set by client-side JavaScript on React, Vue, and Angular sites are checked too.
- On the free plan, keep `CONCURRENCY` at 1. With a Pro plan, raise it to **10 or 20** and get through thousands of pages in minutes.
- Exit with a non-zero code in GitHub Actions or GitLab CI, and a broken preview fails the deploy.

A URL shared without an Open Graph image and a proper title shows up as a bare link, and a bare link gets scrolled past. It is a **conversion leak**. It can also cost you in search, since Google rewards pages that are well maintained.

## One page is easy, 5,000 pages are not

We built the [Sharing Debugger Tool](/tools/sharing-debugger) to check a single page: paste a URL and see how its metadata renders on each social platform. It works well for spot checks.

It does not scale to a sitemap. Nobody audits 5,000 pages by hand in a browser extension, and on a site where several people edit content every day, a page that was fine last week can regress today. The check has to run on its own, on every URL, every time.

## Why broken previews cost more than they look

* **Visual weight:** a rich preview occupies 400% more pixels in a feed than plain text.
* **Developer trust:** if your meta tags are broken, a reader assumes your API is too.
* **Distribution:** you can rank #1 on Google, but with broken social previews your viral coefficient is zero.

The script we walk through below is a simplified version you can extend. It fetches the sitemap with `sitemapper`, validates each page with `@microlink/mql`, and writes the failures to an `errors-<timestamp>.txt` file.

## Three dependencies, no framework

I wanted this to stay small and practical: one `audit.js` file and three npm packages, installed with a single `npm install`.

* [**sitemapper**](https://www.npmjs.com/package/sitemapper): reads every URL from your sitemap, including nested sitemap indexes.
* [**microlink/mql**](/docs/mql/getting-started/installation): fetches metadata the same way social networks see it.
* [**p-map**](https://www.npmjs.com/package/p-map): limits concurrency so a run stays inside the free tier of the API.

Setup takes five minutes. Create a folder, initialize it, and install the three packages:

```shell
mkdir sitemap-validator
cd sitemap-validator
npm init -y
npm install sitemapper @microlink/mql p-map --save
```

## The audit script

Create **audit.js** with the following content:

```javascript
import Sitemapper from 'sitemapper';
import mql from '@microlink/mql';
import pMap from 'p-map';
import fs from  'fs'

// CONFIGURATION
const SITEMAP_URL = process.env.SITEMAP_URL || 'https://YOUR_WEB_PAGE.com/sitemap.xml';
const API_KEY = process.env.API_KEY; // Optional, but recommended to large sitemaps

const CONCURRENCY = 1; // Keep it low for free tier
const FREE_TIER_LIMIT = 25; // 25 requests per day for free tier
const FIRST_BATCH = 0; // If the free tier gets small make batch by batch

const validateUrl = async (url) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Avoid free tier limits
  try {
    // We request 'meta' data specifically.
    // Microlink mimics a browser to extract OG tags.
    const { status, data, response } = await mql(url, {
      meta: true,
      apiKey: API_KEY
    });

    if (status !== 'success') {
      return { url, error: 'API Error', status };
    }

    const errors = [];
    
    // Validation logic

    if (!data.image || !data.image.url) errors.push('Missing OG Image');
    
    if (!data.title) errors.push('Missing OG Title');
    else if (data.title.length > 60) errors.push('OG Title is too long')

    if (!data.description) errors.push('Missing Description');
    else if (data.description.length < 50) errors.push('Description too short');

    if (!data.author) errors.push('Missing Author');

    if (!data.date) errors.push('Missing Date');
    else if (isNaN(new Date(data.date).getTime())) errors.push('Invalid Date');

    if (!data.logo) errors.push('Missing Logo');

    return { valid: !errors.length, url, errors };

  } catch (err) {
    return { url, error: err.message, valid: false };
  }
};

const runAudit = async () => {
  console.log(`🗺️  Fetching sitemap: ${SITEMAP_URL}...`);
  
  const sitemap = new Sitemapper({ url: SITEMAP_URL, timeout: 15000 });

  let { sites } = await sitemap.fetch();
  if (sites.length > FREE_TIER_LIMIT && !API_KEY) {
    console.log(`Total URLs exceeds free tier limit. Cutting from ${sites.length} to ${FREE_TIER_LIMIT}` );
    sites = sites.slice(FREE_TIER_LIMIT * FIRST_BATCH, FREE_TIER_LIMIT);
  }

  const totalUrls = sites.length;
  let processedCount = 0;
  
  console.log(`Found ${totalUrls} URLs. Starting validation...`);

  // Use p-map to control concurrency with progress tracking
  const results = await pMap(sites, async (url) => {
    const result = await validateUrl(url);
    processedCount++;
    const percent = ((processedCount / totalUrls) * 100).toFixed(1);
    process.stdout.write(`\r⏳ Progress: ${processedCount}/${totalUrls} (${percent}%)`);
    return result;
  }, { concurrency: CONCURRENCY });

  // Reporting
  const failures = results.filter(r => !r.valid);
  
  console.log('\n\n--- 📊 AUDIT REPORT ---');
  console.log(`Total Scanned: ${results.length}`);
  console.log(`Passed: ${results.length - failures.length}`);
  console.log(`Failed: ${failures.length}`);
  
  if (failures.length > 0) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const errorFilePath = `./errors-${timestamp}.txt`;
    
    let errorContent = '❌ FAILED URLS:\n';
    failures.forEach(f => {
      errorContent += `\n${f.url}\n`;
      if (f.errors) f.errors.forEach(e => errorContent += `   - ${e}\n`);
      if (f.error) errorContent += `   - System Error: ${f.error}\n`;
    });

    fs.writeFileSync(errorFilePath, errorContent);
    console.log(`\n❌ Errors saved to: ${errorFilePath}`);
  } else {
    console.log('\n✅ All systems nominal. Your sitemap is perfect.');
  }
};

runAudit();
```

The script has two parts. `validateUrl` waits 1000&nbsp;ms, calls `mql(url, { meta: true })`, and checks the returned `data` field by field:

* `data.image.url` must exist, or the page gets `Missing OG Image`.
* `data.title` must exist and be at most 60 characters long.
* `data.description` must exist and be at least 50 characters long.
* `data.author` and `data.logo` must exist.
* `data.date` must exist and parse into a valid `Date`.

`runAudit` fetches the sitemap with a 15000&nbsp;ms timeout. Without an `API_KEY`, it cuts the list to `FREE_TIER_LIMIT` (25 URLs), and `FIRST_BATCH` sets where that slice starts. Then `pMap` validates the URLs at the configured `CONCURRENCY`, printing progress as it goes.

At the end it prints how many URLs were scanned, passed, and failed. When anything failed, it writes every failing URL and its errors to `errors-<timestamp>.txt` in the current folder.

## Run the first audit

Set `SITEMAP_URL` to your sitemap, and `API_KEY` if you have one, then run:

```bash
node audit.js
```

On the free plan, keep `CONCURRENCY` at 1. That avoids 429 errors from the rate limiter. With a [Pro plan](/pricing), you can raise it to 10 or 20 and get through thousands of pages in minutes.

## Why client-rendered pages pass too

`mql(url, { meta: true })` does not just parse the HTML the server returns. It runs the page in a [real headless Chrome browser](/blog/what-is-a-headless-browser).

That matters for React, Vue, and Angular sites. If your tags are set by client-side JavaScript, Microlink executes it and reads the tags after they are populated, so the audit sees what a visitor's browser sees.

## Check the copy with an LLM

The script already fetches each page, so it can also fetch the page text and ask an LLM whether the title and description match it. Add a `data` rule with `selector: 'body'` and `type: 'text'` to get the combined text of the page body as `data.content`:

```javascript
const mql = require('@microlink/mql')

// ... prev code
const { status, data, response } = await mql(url, {
  meta: true,
  data: {
    content: {
      selector: 'body', // get the body of the page
      type: 'text' // get combined text content
    }
  }
})

console.log(`The content of the url -> ${data.content}`)
// next code ...
```

Pass `data.title`, `data.description`, and `data.content` to your model with a prompt like the one below. It asks for a JSON verdict with `valid`, `reasoning`, and suggested replacements, and checks relevance, length (a 50-60 character title, a 150-160 character description), search intent, and uniqueness:

```bash
You are an expert Technical SEO Auditor and Content Analyst. Your goal is to evaluate the semantic coherence between a webpage's metadata and its actual body content, adhering to Google's latest search documentation and best practices.

**INPUT DATA:**
1.  `current_title`: The content of the <title> tag.
2.  `current_description`: The content of the <meta name="description"> tag.
3.  `page_content`: The main body text of the URL (scraped/cleaned text).

**ANALYSIS CRITERIA:**
1.  **Relevance:** Does the title and description accurately reflect the primary topic (H1 and main body) of the page content?
2.  **Length:** * Title: Should be approx. 50-60 characters (max 600 pixels).
    * Description: Should be approx. 150-160 characters.
3.  **Intent:** Does the metadata match the search intent (Informational, Transactional, etc.) of the content?
4.  **uniqueness:** Is the current metadata generic or specific to the content provided?

**OUTPUT INSTRUCTIONS:**
Return ONLY a valid JSON object. Do not include markdown formatting (like ```json).

The JSON object must follow this schema:
{
  "valid": boolean, // true if current metadata is coherent, optimal length, and accurate. false otherwise.
  "reasoning": "string", // Brief technical explanation of why it passed or failed (e.g., 'Title too long', 'Miss-matched intent', 'Keyword stuffing').
  "suggestions": {
    "title": "string", // ONLY if valid is false. Provide an optimized title.
    "description": "string" // ONLY if valid is false. Provide an optimized meta description.
  }
}

**OPTIMIZATION RULES (If valid is false):**
* **Title:** format as "Primary Keyword | Context/Brand" or "Compelling Hook - Brand". Front-load important keywords.
* **Description:** Use active voice. Include a clear value proposition and a call-to-action (implicit or explicit) if the content is commercial.
* **Tone:** Professional, clear, and engaging.

**INPUT TO PROCESS:**
Current Title: {{current_title}}
Current Description: {{current_description}}
Page Content: {{page_content}}
```

A `valid: false` result comes back with a rewritten title and description. That turns the audit from a list of missing tags into a list of fixes you can apply for your own site or for your clients.

## Port it to another language

This example uses Node.js because that is what I work with every day. The Microlink API at `https://api.microlink.io` works from any language.

To port the script to Python, Ruby, Go, or anything else, paste this prompt into Claude, ChatGPT, or the AI tool you use, together with the code above:

```bash
I need to rewrite this Open Graph validation script for [YOUR LANGUAGE]. The script should:
1. Parse an XML sitemap and extract all URLs
2. Make API requests to Microlink (https://api.microlink.io) with the meta: true parameter
3. Validate that each page has: og:image, og:title, and og:description
4. Generate a report showing which URLs failed validation
5. Handle concurrency to avoid rate limits
Here's the original Node.js version: [paste the code from above]
Please rewrite this in [YOUR LANGUAGE] using idiomatic patterns and popular libraries for that ecosystem.
```

The model translates the script and picks the libraries for your ecosystem. I've seen people port it to Python (with requests and [BeautifulSoup](https://beautiful-soup-4.readthedocs.io/en/latest/)), to Ruby (with [Nokogiri](https://nokogiri.org/index.html)), and even to shell scripts with curl.

## Fail the deploy on a broken preview

To stop broken Open Graph tags from reaching production, run `audit.js` in GitHub Actions or GitLab CI and exit with a non-zero code when any URL fails:

```javascript
if (failures.length > 0) {
  process.exit(1);
}
```

With that check in place, a deploy fails the moment someone breaks the social metadata of a page. Your marketing team will thank you.

## About the author

I'm Joseba. I've been a CTO and full-stack developer for 15+ years, and I'm now scaling Microlink. For questions about the API or link previews, write to joseba@microlink.io.
