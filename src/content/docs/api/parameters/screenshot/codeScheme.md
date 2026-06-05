---
title: 'screenshot › codeScheme'
description: 'Beautify HTML and JSON content with professional code syntax highlighting using the codeScheme parameter. Choose from popular Prism themes like Darcula or provide a custom CSS URL.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import {
  CodeSchemeThemeComboPreview,
  CodeSchemeThemePreview
} from 'components/markdown/CodeSchemeThemePreview'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/><br/>
Default: <Type children="'atom-dark'"/>

It enables code syntax highlighting to beautify HTML markup under JSON/Text content type over the target [url](/docs/api/parameters/url).

![](/images/code-scheme.gif)

<MultiCodeEditorInteractive mqlCode={{ url: 'https://emojipedia-api.vercel.app', screenshot: { codeScheme: 'automad-dark', styles: ['span { line-height: 2 }'] } }} />

The theme can be defined as:

- An [automad-prism-themes](https://automadcms.github.io/automad-prism-themes/) identifier (e.g., <Type children="'github'"/>).
- A remote URL (e.g., <Type children="'https://unpkg.com/prism-theme-night-owl'"/>).

You can also customize any theme passing your own [styles](/docs/api/parameters/styles) rules.

## Theme previews

### Combo themes

Combo themes bundle two coordinated styles under one name: a light variant and a dark variant. The light variant is the default.

To keep mode switching explicit and app-controlled, combo themes ignore `prefers-color-scheme`. Dark styles are activated when any of these selectors match:

- `html[class*="dark-"]` enables dark mode whenever the `html` element has a class containing `"dark-"`.
- `html[class*="-dark"]` enables dark mode whenever the `html` element has a class containing `"-dark"`.
- `.dark` enables dark mode for any element nested inside a container with the `"dark"` class.

<CodeSchemeThemeComboPreview />


### Single themes

Use single themes when you want one fixed code style, regardless of light/dark mode.
Set `screenshot.codeScheme` to any identifier below (for example, `'gruvbox-dark'` or `'night-owl'`).

<CodeSchemeThemePreview />
