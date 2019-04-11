---
title: 'Considerations'
--- 

The **Microlink SDK** is the way to consume [Microlink API](/docs/api) directly from your UI.

Based on that premise, **Microlink SDK** has been designed with two premises on the mind.

* **Common surface**: Although they may have different interface API, every specific integration has the same functionalities.
* **Lightweight & Fast**: The bundle size tend to be equal or less than 10KB (no polyfills included).
* **Customizable Style**: At least you can customize style using universal CSS classes present on the markup.

## Pollyfills

Since **Microlink SDK** consume [Microlink API](/docs/api) and turn the raw data into a beauty preview, it needs to perform an internal request for getting from the target URL.

For doing that, our integrations use standard [fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API). However, **Microlink SDK** doesn't add it as part of the bundle: It will take it from `window`.

That means that `window.fetch` should be available and accesible.

Although nowadays the [fetch browser compatibility](https://caniuse.com/#search=fetch) is enough good, you need to be sure the environment under **Microlink SDK** is running have it available.

We recommend use [polyfill.io](https://polyfill.io/v3/) CDN for that purpose, it will only load polyfill if fetch is not globally detected.

```html
<script 
  crossorigin="anonymous" 
  src="https://polyfill.io/v3/polyfill.min.js?features=fetch">
</script>
```

Just add it in your main markup before closing your `body` tag.

## CSS Classnames

We don't inject any CSS into your application. 

The card previsualization is shipped with a default minimal inline style.

If you need to adapt the *look and feel*, each component of the card has been assigned a [BEM](http://getbem.com/introduction) class name:

* **microlink_card**: The root `div` of the card.
* **microlink_card__media**: The media element, regardless of whether it's `video` or `image`.
* **microlink_card__media_image**: The `div` holding the `background-image` of the image preview of the link.
* **microlink_card__media_video_wrapper**: The wrapper `div` around the video preview of the link.
* **microlink_card__media_video**: The `video` element for the video preview of the link.
* **microlink_card__content**: The wrapper `div` around the content preview of the link.
* **microlink_card__content_title**: The `p` tag of the card title.
* **microlink_card__content_description**: The `p` tag of the card description.
* **microlink_card__content_url**: The `span` tag of the card url link.
