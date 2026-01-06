---
title: 'lazy'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='true'/>

When <Type children='true'/>, card content will be loaded lazily under the user's scroll behavior, using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

<DemoIntegrations caption="Using `lazy` allows to load content on-demand, avoiding unnecessary API calls" parameters={{lazy: true}} />

Additionally, you can pass your own [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) to customize when the card content should be fetched.

<DemoIntegrations caption="The card content will be fetched when 50% of the card reaches the viewport." parameters={{lazy: { threshold: 0.5 }}} />
