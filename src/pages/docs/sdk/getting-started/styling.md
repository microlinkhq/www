---
title: 'Styling'
---

We don't inject any CSS into your application.

Instead, the card previsualization is shipped with a default minimal inline style.

If you need to adapt the _look and feel_, two can use one of the following strategies

## CSS Variables

You can use [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to overwrite the default values:

**--microlink-hover-background-color**: `#f5f8fa`
**--microlink-hover-border-color**: `#8899A680`
**--microlink-background-color**: `#fff`
**--microlink-border-style**: `solid`
**--microlink-border-width**: `1px`
**--microlink-border**: `1px solid #e1e8ed`
**--microlink-color**: `#181919`
**--microlink-color**: `#e1e8ed`
**--microlink-max-width**: `500px`

## CSS Classes

When the microlink UI card is rendered, each subcomponent of the card has been assigned a [BEM](http://getbem.com/introduction) class name:

- **microlink_card**: The root element of the card.
- **microlink_card\_\_content_description**: The `p` tag of the card description.
- **microlink_card\_\_content_title**: The `p` tag of the card title.
- **microlink_card\_\_content_url**: The `span` tag of the card url link.
- **microlink_card\_\_content**: The wrapper `div` around the content preview.
- **microlink_card\_\_media_audio_wrapper**: The wrapper `div` around the audio preview.
- **microlink_card\_\_media_audio**: The `audio` element for the audio preview.
- **microlink_card\_\_media_image**: The `div` holding the `background-image` of the image preview.
- **microlink_card\_\_media_video_wrapper**: The wrapper `div` around the video preview.
- **microlink_card\_\_media_video**: The `video` element for the video preview.
- **microlink_card\_\_media**: The media element, regardless of the media type (`video`, `image`, etc.).
- **microlink_card\_\_progress_bar**: The `div` tag of the card progress.
- **microlink_card\_\_spinner**: The `div` tag of the loading spinner in the card.

For each SDK package there are some specific class names too:

- **microlink_vanilla**: A root `div` used in [Vanilla](/docs/sdk/integrations/vanilla) to render the virtual DOM.
- **microlink_vue**: A root `div` used in [Vue](/docs/sdk/integrations/vue) to render the virtual DOM.
