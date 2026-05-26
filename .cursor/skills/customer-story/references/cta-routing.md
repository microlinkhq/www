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

- The Hero CTA label ALWAYS follows the format `See how to integrate <product noun>`. The `<product noun>` is the same noun used in the bottom CTA's "Suggested label" column (e.g. `metadata`, `screenshots`, `PDFs`, `markdown`, `brand logos`, `performance audits`). The bottom CTA uses the broader action-oriented label from the table.
- Hero CTA label and bottom CTA label MUST be different. Example pair:
  - Hero: "See how to integrate screenshots"
  - Bottom: "Start capturing screenshots"
- Other examples:
  - `/metadata` → Hero "See how to integrate metadata" / Bottom "Start extracting metadata"
  - `/pdf` → Hero "See how to integrate PDFs" / Bottom "Start generating PDFs"
  - `/markdown` → Hero "See how to integrate markdown" / Bottom "Start scraping to markdown"
  - `/logo` → Hero "See how to integrate brand logos" / Bottom "Start fetching brand logos"
  - `/insights` → Hero "See how to integrate performance audits" / Bottom "Start auditing performance"
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
  See how to integrate screenshots
</ArrowLink>
```

Bottom CTA (inside `CtaSection` component): same `ArrowLink` shape with the broader label from the table above.

The CTA headline uses the accent span pattern via `headlinePrefix` + `headlineAccent` props on `<CtaSection>`. If the target is not `/pricing`, the headline MAY mention the product (e.g. `headlineAccent='screenshots'`).
