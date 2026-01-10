---
title: 'Styling'
description: Customize the look and feel of your link previews using CSS variables and BEM classes. Learn how to style Microlink SDK components to match your brand's design system.
---

import { Color } from 'components/markdown/Color/Color'

We don't inject any CSS into your application.

Instead, the card previsualization is shipped with a default minimal inline style.

If you need to adapt the _look and feel_, two can use one of the following strategies

## CSS Variables

You can use [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to overwrite the default values:

--microlink-background-color: <Color>#fff</Color><br/>
--microlink-border-style: solid<br/>
--microlink-border-width: 1px<br/>
--microlink-border: 1px solid <Color>#e1e8ed</Color><br/>
--microlink-color: <Color>#181919</Color><br/>
--microlink-hover-background-color: <Color>#f5f8fa</Color><br/>
--microlink-hover-border-color: <Color>#8899A680</Color><br/>
--microlink-max-width: 500px<br/>

## CSS Classes

When the microlink UI card is rendered, each subcomponent of the card has been assigned a [BEM](http://getbem.com/introduction) class name:

- **microlink_card** <br/>
The root element of the card.

- **microlink_card\_\_content_description** <br/>
The `p` tag of the card description.

- **microlink_card\_\_content_title** <br/>
The `p` tag of the card title.

- **microlink_card\_\_content_url** <br/>
The `span` tag of the card url link.

- **microlink_card\_\_content** <br/>
The wrapper `div` around the content preview.

- **microlink_card\_\_media_audio_wrapper** <br/>
The wrapper `div` around the audio preview.

- **microlink_card\_\_media_audio** <br/>
The `audio` element for the audio preview.

- **microlink_card\_\_media_image** <br/>
The `div` holding the `background-image` of the image preview.

- **microlink_card\_\_media_video_wrapper** <br/>
The wrapper `div` around the video preview.

- **microlink_card\_\_media_video** <br/>
The `video` element for the video preview.

- **microlink_card\_\_media** <br/>
The media element, regardless of the media type (`video`, `image`, etc.).

- **microlink_card\_\_progress_bar** <br/>
The `div` tag of the card progress.

- **microlink_card\_\_spinner** <br/>
The `div` tag of the loading spinner in the card.

For each SDK package there are some specific class names too:

- **microlink_vanilla** <br/>
A root `div` used in [Vanilla](/docs/sdk/integrations/vanilla) to render the virtual DOM.

- **microlink_vue** <br/>
A root `div` used in [Vue](/docs/sdk/integrations/vue) to render the virtual DOM.
