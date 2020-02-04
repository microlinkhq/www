---
title: 'Considerations'
---

The **Microlink SDK** is the way to consume [Microlink API](/docs/api) directly from your UI.

Based on that premise, **Microlink SDK** has been designed with three things in mind:

- **Common surface**: Although they may have different interface API, every specific integration has the same functionalities.
- **Lightweight & fast**: The bundle size tends to be equal or less than 10KB (no polyfills included).
- **Customizable style**: At least you can customize style using universal CSS classes present on the markup.

## Pollyfills

Since the **Microlink SDK** consumes the [Microlink API](/docs/api) and turns the raw data into a beautiful preview, it needs to perform an internal request to obtain it from the target URL.

To do that, our integrations use the standard [Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API). However, **Microlink SDK** doesn't add it as part of the bundle: It will take it from `window`.

That means that `window.fetch` should be available and accesible.

Although nowadays the [fetch browser compatibility](https://caniuse.com/#search=fetch) is good enough, you need to be sure that the environment **Microlink SDK** is running on has it available.

We recommend using the [polyfill.io](https://polyfill.io/v3/) CDN for that purpose, it will only load the polyfill if `window.fetch` isn't globally detected.

```html
<script>
  crossorigin="anonymous"
  src="https://polyfill.io/v3/polyfill.min.js?features=fetch">
</script>
```

Just add the above to your main markup before the closing `body` tag.

## CSS Classnames

We don't inject any CSS into your application.

The card previsualization is shipped with a default minimal inline style.

If you need to adapt the _look and feel_, each component of the card has been assigned a [BEM](http://getbem.com/introduction) class name:

- **microlink_card**: The root element of the card.
- **microlink_card\_\_media**: The media element, regardless of the media type (`video`, `image`, etc.).
- **microlink_card\_\_media_image**: The `div` holding the `background-image` of the image preview.
- **microlink_card\_\_media_video_wrapper**: The wrapper `div` around the video preview.
- **microlink_card\_\_media_audio_wrapper**: The wrapper `div` around the audio preview.
- **microlink_card\_\_media_video**: The `video` element for the video preview.
- **microlink_card\_\_media_audio**: The `audio` element for the audio preview.
- **microlink_card\_\_content**: The wrapper `div` around the content preview.
- **microlink_card\_\_content_title**: The `p` tag of the card title.
- **microlink_card\_\_content_description**: The `p` tag of the card description.
- **microlink_card\_\_content_url**: The `span` tag of the card url link.

For each SDK package there are some specific class names too:

- **microlink_vanilla_dom**: A root `div` used in [Vanilla](/docs/sdk/integrations/vanilla) to render the virtual DOM.
- **microlink_vue_dom**: A root `div` used in [Vue](/docs/sdk/integrations/vue) to render the virtual DOM.
- **microlink_angular_dom**: A root `div` used in [Angular](/docs/sdk/integrations/angular) to render the virtual DOM.
