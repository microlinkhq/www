# CTA routing

The Hero CTA and the bottom CTA point to the Microlink page that best matches the customer's primary use case. The skill MUST propose a target based on the user's "how they use Microlink" answer (step 4) and confirm it before writing.

## Use-case → target table

Match keywords from the user's description (case-insensitive). First match wins, top to bottom.

| Keyword(s) in use case                                                | CTA href      | Suggested label                  |
| --------------------------------------------------------------------- | ------------- | -------------------------------- |
| `screenshot`, `thumbnail`, `preview image`, `og image`, `social card` | `/screenshot` | Start capturing screenshots      |
| `pdf`                                                                 | `/pdf`        | Start generating PDFs            |
| `metadata`, `unfurl`, `link preview`, `og`, `open graph`, `oembed`    | `/metadata`   | Start extracting metadata        |
| `markdown`, `scrape content`, `article extraction`, `readability`    | `/markdown`   | Start scraping to markdown       |
| `logo`, `brand asset`, `favicon at scale`                             | `/logo`       | Start fetching brand logos       |
| `insights`, `lighthouse`, `performance audit`, `web vitals`           | `/insights`   | Start auditing performance       |
| `enterprise`, `dedicated infra`, `private cluster`                    | `/enterprise` | Talk to enterprise               |
| multi-product, generic, "everything", or no clear keyword             | `/pricing`    | Start your integration           |

## Heuristics

- If the use case mentions two products (e.g. "screenshots AND metadata"), pick the product the customer described **first** and surface the second one in the body copy of the CTA section.
- If the description is mostly about scale, billing, or volume rather than a specific endpoint, default to `/pricing`.
- Never silently pick. The skill MUST present the proposed `href` + label to the user and accept an override before writing the file.

## CTA copy rules

- The Hero CTA label and the bottom CTA label SHOULD be different (Hero invites action specific to the customer's outcome; bottom CTA is broader). Example pair:
  - Hero: "See how they integrated screenshots"
  - Bottom: "Start capturing screenshots"
- Both labels are sentence case, no terminal period, no emoji.
- Keep labels under 6 words.
- Never use "Get started for free" — this repo's voice is more direct.

## Output shape

Hero CTA (inside `Hero` component):

```jsx
<ArrowLink
  href='/screenshot'
  css={theme({
    color: 'link',
    fontWeight: 'bold',
    fontSize: [2, 2, 3, 3]
  })}
>
  See how they integrated screenshots
</ArrowLink>
```

Bottom CTA (inside `CtaSection` component): same `ArrowLink` shape with the broader label.

The CTA section's headline retains the accent span pattern:

```jsx
<SubheadBase ...>
  Ready to ship with{' '}
  <span css={theme({ color: ACCENT.text })}>Microlink</span>?
</SubheadBase>
```

If the chosen target is not `/pricing`, the headline MAY be customized to mention the product (e.g. "Ready to ship screenshots?"), but only if the user agrees during the confirmation step.
