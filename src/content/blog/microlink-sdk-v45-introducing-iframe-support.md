---
title: 'Microlink SDK v4.5 embeds native iframes from oEmbed providers'
description: 'Enhance your link previews with native iframe support in Microlink SDK v4.5. Learn how to embed rich content from Spotify, YouTube, and Instagram using oEmbed.'
authors:
  - kiko
date: '2019-12-29'
---

import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'
import { Microlink } from 'components/markdown/Microlink'

[Microlink SDK v4.5.0](https://github.com/microlinkhq/sdk/releases/tag/v4.5.0) can embed a provider’s **native iframe** instead of a link preview card. Set `iframe` as the [media](/docs/sdk-legacy/parameters/media/) value and the SDK renders the same player Spotify, SoundCloud, or Instagram would show on their own site.

**TL;DR**

- Microlink SDK v4.5.0 can embed a provider’s **native iframe** instead of a link preview card: set `iframe` as the `media` value.
- `media: ['iframe']` enables iframe detection, and the response carries the provider’s embed markup in `html` and any scripts it needs in `scripts`.
- `media` is an array of fallbacks: the SDK uses the first value the URL can satisfy, down to `image`.
- Any provider that implements the oEmbed specification works, including Spotify, SoundCloud, Instagram, and YouTube.

## The card has three sizes

**Microlink SDK** turns every link into a preview card, displayed in one of three [size](/docs/sdk-legacy/parameters/size/) variations: `'small'`, `'normal'` and `'large'`.

<Microlink media={['audio']} size='small' url='{{demolinks.spotify.url}}' />
<Microlink media={['audio']} url='{{demolinks.spotify.url}}' />
<Microlink media={['audio']} size='large' url='{{demolinks.spotify.url}}' />

<Figcaption>
Microlink SDK <Link href='/docs/sdk-legacy/parameters/size/'>size</Link> variations.
</Figcaption>

The card gives any website or application a consistent URL preview. Some domains, like **Instagram**, **SoundCloud**, **Spotify**, **Facebook**, and **X**, have their own way of embedding their content, and next to it a generic card is less recognizable.

## `media: ['iframe']` uses the provider’s own embed

**Microlink SDK v4.5** accepts `iframe` as a [media](/docs/sdk-legacy/parameters/media/) value. When the provider has a native embed, the SDK uses it:

<Microlink media={['iframe']} url='{{demolinks.spotify.url}}' style={{textAlign:'center'}} />

The [media](/docs/sdk-legacy/parameters/media/) value decides how the SDK calls the [Microlink API](/docs/api/getting-started/overview), so the response carries the field that media type needs.

For an audio provider like **SoundCloud** or **Spotify**, `media: ['audio']` tells Microlink API to detect the streaming source behind the URL by enabling the [audio](/docs/api/parameters/audio) parameter. The response includes an `audio` field with the source URL, its type, duration, and size:

```json
{
  "audio": {
    "url": "https://p.scdn.co/mp3-preview/4036341425a86cbe3fe0aa39a034ba7b6c5e4432?cid=6313d40896f64a2ead4f67035049a647",
    "type": "mp3",
    "duration": 30.040816,
    "size": 362861,
    "duration_pretty": "30s",
    "size_pretty": "363 kB"
  }
}
```

Here that is a 30s `mp3` preview of 363 kB served from `p.scdn.co`, and **Microlink SDK** builds the audio preview card from it.

`media: ['iframe']` works the same way, enabling [iframe](/docs/api/parameters/iframe) detection instead. The response includes an `iframe` field with the provider’s embed markup in `html` and any scripts it needs in `scripts`:

```json
{
  "iframe": {
    "html": "<iframe width=\"300\" height=\"380\" allowtransparency=\"true\" frameborder=\"0\" allow=\"encrypted-media\" title=\"Spotify Embed: Space Spine\" src=\"https://open.spotify.com/embed/album/49ax7HUaKuueaVtZBkEZD4?highlight=spotify:track:1W2919zs8SBCLTrOB1ftQT\"></iframe>",
    "scripts": []
  }
}
```

For a Spotify track, that is a 300 by 380 `<iframe>` pointing at `open.spotify.com/embed`, and **Microlink SDK** mounts it in place of the card.

## Media values fall back in order

`media` is an array because each value after the first is a fallback. The SDK uses the first one the URL can satisfy:

```jsx
import Microlink from '@microlink/react'

export default props => (
  // The card media could be:
  // - `iframe`, if the URL provider supports it.
  // - `video`, in case `iframe` hasn't been satisfied.
  // - `audio`, in case `video` and `iframe` haven't been satisfied.
  // - `image`, in case neither of the previous values have been satisfied.
  <Microlink media={['iframe', 'video', 'audio' 'image']} {...props} />
)
```

This covers URLs whose provider doesn’t support iframes, and URLs where you don’t know in advance whether there is an audio or video streaming source to consume. When none of the first three is satisfied, the card falls back to `image`.

## Every oEmbed provider is supported

Any provider that implements the [oEmbed](https://oembed.com/) specification works with `media: ['iframe']`. A non-exhaustive list of the most common ones:

- [CodePen](/meta?url=https%3A%2F%2Fcodepen.io%2Fhbagency%2Fpen%2FeKyObz)
- [CodeSandbox](/meta?url=https%3A%2F%2Fcodesandbox.io%2Fs%2Fgracious-blackburn-n5w839zm4m)
- [Dailymotion](/meta?url=https%3A%2F%2Fwww.dailymotion.com%2Fvideo%2Fx7ntzjb%3Fplaylist%3Dx5v2j4)
- [Facebook](/meta?url=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D10156364216738951)
- [Flickr](/meta?url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2F68166820%40N08%2F46358385844%2F)
- [Genial.ly](/meta?url=https%3A%2F%2Fview.genial.ly%2F5dc53cfa759d2a0f4c7db5f4)
- [Instagram](/meta?url=https%3A%2F%2Finstagram.com%2Fp%2FBeV6tOhFUor)
- [Reddit](/meta?url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fcablefail%2Fcomments%2F68e3uk%2Fholy_bjeezus_ted_talks_av_aftermath%2F)
- [SoundCloud](/meta?url=https%3A%2F%2Fsoundcloud.com%2Fbeautybrainsp%2Fbeauty-brain-swag-bandicoot)
- [Spotify](/meta?url=https%3A%2F%2Fopen.spotify.com%2Ftrack%2F1W2919zs8SBCLTrOB1ftQT)
- [TED](/meta?url=https%3A%2F%2Fwww.ted.com%2Ftalks%2Fmonique_w_morris_why_black_girls_are_targeted_for_punishment_at_school_and_how_to_change_that%3Futm_campaign%3Dtedspread%26utm_medium%3Dreferral%26utm_source%3Dtedcomshare)
- [Twitch](/meta?url=https%3A%2F%2Fwww.twitch.tv%2Fshroud%2Fclip%2FAuspiciousTubularBunnyFUNgineer)
- [Vimeo](/meta?url=https%3A%2F%2Fvimeo.com%2F186386161)
- [X](/meta?url=https%3A%2F%2Fx.com%2Ffuturism%2Fstatus%2F882987478541533189)
- [YouTube](/meta?url=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3D9P6rdqiybaw)

To use native embeds in your own previews, upgrade to Microlink SDK v4.5.0 and add `'iframe'` to the front of your `media` array.
