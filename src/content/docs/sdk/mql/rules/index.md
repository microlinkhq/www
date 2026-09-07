---
title: 'Rules definition'
description: 'How custom data extraction rules are defined in Microlink Query Language: the basic rule, nested rules that build objects, and fallback rules that make extraction resilient.'
---

A **rule** declares one value you want from a page. It combines a DOM query, the attribute to read, and the type the value is validated as; rules can be nested to build objects and listed to define fallbacks. The same grammar powers the [data](/docs/api/parameters/data) parameter of the API, the [extract](/docs/sdk/methods/extract) method of the SDK, and the [content](/docs/sdk/methods/markdown) and [collection](/docs/sdk/methods/collections) methods built on top of it.

- [Basic rule](/docs/sdk/mql/rules/basic) — the three primitives every rule is made of, and how they combine.
- [Nested rules](/docs/sdk/mql/rules/nested) — map a DOM structure into a JSON object by nesting rules under a parent.
- [Rules fallbacks](/docs/sdk/mql/rules/fallbacks) — try several rules in order until one yields a value.

The primitives themselves — [selector](/docs/sdk/mql/data/selector), [selectorAll](/docs/sdk/mql/data/selectorAll), [attr](/docs/sdk/mql/data/attr), [type](/docs/sdk/mql/data/type), and [evaluate](/docs/sdk/mql/data/evaluate) — are documented under [data definition](/docs/sdk/mql/data).
