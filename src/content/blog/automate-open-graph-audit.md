---
title: 'Automate Open Graph Audit'
subtitle: 'Stop Shipping Broken Link Previews'
description: 'Learn how to build a Node.js script that automatically validates Open Graph tags across your entire sitemap.'
date: '2026-01-23'
---

A naked URL without an Open Graph image and proper metadata is a **conversion leak**. It looks unprofessional, and it gets scrolled past. Additionally, SEO can be affected since Google values those who maintain their pages better.

We built a [Sharing Debugger Tool](/tools/sharing-debugger) for exactly this: paste in any URL and instantly see how your metadata looks across different platforms. It's perfect for spot-checking individual pages.

The problem is **scale**. You can't manually audit a sitemap with 5,000 pages using a browser extension. You need infrastructure that scales with your deployment.

### The cost of broken links

* **Visually Dominant:** Rich previews occupy 400% more pixels in a feed than plain text.
* **Developer Trust:** If your meta tags are broken, maybe your API too.
* **CTR is King:** You can rank #1 on Google, but if your social sharing is broken, your viral coefficient is zero.

For organizations with thousands of pages, content updates happen daily. When multiple employees have the ability to modify pages, you need a robust solution that can recurrently analyze all your sitemaps to catch regressions.

In this post you'll learn to use Microlink to automate your own scans to maintain quality. We're going to look at a simplified example that gives you the foundation to build on.

### The simple stack

I wanted this to be lightweight and practical, not some enterprise monstrosity. Three dependencies, that's it:

* [**sitemapper**](https://www.npmjs.com/package/sitemapper): Grabs every URL from your sitemap (even handles nested sitemap indexes).
* [**microlink/mql**](/docs/mql/getting-started/installation): Fetches metadata exactly like social networks see it.
* [**p-map**](https://www.npmjs.com/package/p-map): Manages concurrency so you don't melt the free tier API.

### Getting started

Five minutes of setup:

```shell
mkdir sitemap-validator
cd sitemap-validator
npm init -y
npm install sitemapper @microlink/mql p-map --save
```

### The script that does the heavy lifting

Create **audit.js** file and drop this in:

```javascript
import Sitemapper from 'sitemapper';
import mql from '@microlink/mql';
import pMap from 'p-map';
import fs from  'fs'

// CONFIGURATION
const SITEMAP_URL = process.env.SITEMAP_URL || 'https://YOUR_WEB_PAGE.com/sitemap.xml';
const API_KEY = process.env.API_KEY; // Optional, but recommended to large sitemaps

const CONCURRENCY = 1; // Keep it low for free tier
const FREE_TIER_LIMIT = 50; // 50 requests per day for free tier
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
    else if (data.title > 60) errors.push('OG Title is too long')

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

### Running your first audit

Just fire it up:

```bash
node audit.js
```

**A quick heads-up on rate limits:** If you're on the free plan, keep CONCURRENCY at 1. You'll avoid those annoying 429 errors. With a [Pro plan](/#pricing), you can crank it to 10 or 20 and blast through thousands of pages in minutes.

### What Makes This Actually Work

When you call ```mql(url, { meta: true })```, we're not just parsing HTML. We spin up a [real headless Chrome browser](/blog/what-is-a-headless-browser).

**Why does this matter?**

Your React/Vue/Angular site renders properly. Even if you're doing client-side rendering we execute the JavaScript and grab the tags after they're populated.

### Level up, semantic SEO with AI

Since you are already fetching the page metadata, why not validate the quality of the content?

Once you have it running, you can add extra features as elaborate as you want. You could take the title and description and ask an LLM that, by analyzing the website content, checks and improves both the title and description if it considers appropriate to climb positions in Google's ranking.

```javascript
const mql = require('@microlink/mql')

// ... prev code
const { status, data, response } = mql(url, {
  meta: true,
  data: {
    content: {
      selector: 'body' // get the body of the page
      type: 'text' // get combined text content
    }
  }
})

console.log(`The content of the url -> ${data.content}`)
// next code ...
```

You can extend and adapt to your use case or your clients' and offer a service that makes a difference.

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

### Not a Node.js Developer?

This example uses Node.js because that's what I work with daily, but the Microlink API works with any language. 

Want to rewrite this in Python, Ruby, Go, or whatever you're comfortable with?

Here's how to adapt it:

Copy this prompt and paste it into Claude, ChatGPT, or your AI tool of choice:

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

The AI will handle the translation and suggest the right libraries for your language. I've seen people successfully port this to Python (using requests and [BeautifulSoup](https://beautiful-soup-4.readthedocs.io/en/latest/)), Ruby (with [Nokogiri](https://nokogiri.org/index.html)), and even shell scripts with curl.

### Make this part of your deploy process

Want to never ship broken OG tags again? Add this to your GitHub Actions or GitLab CI:

```javascript
if (failures.length > 0) {
  process.exit(1);
}
```

Now your deploy will fail if someone breaks the social metadata. Trust me, your marketing team will love you for this.

### About me
I'm Joseba, and I've been a CTO and full-stack developer for 15+ years. Now I'm scaling Microlink.

Questions about the API or link previews? Hit me up at joseba@microlink.io