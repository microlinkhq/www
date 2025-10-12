---
title: 'Microlink SDK v4.5: Introducing iframe support'
date: '2019-12-29'
---

We released [Microlink SDK v4.5.0](https://github.com/microlinkhq/sdk/releases/tag/v4.5.0), introducing a powerful functionality: the ability to embed **native iframes** 🔥.

Every time you use **Microlink SDK**, it turns any link into a beautiful link preview, where the card can be displayed with three [size](/docs/sdk/parameters/size/) variations: `'small'`, `'normal'` and `'large'`.

<Microlink media={['audio']} size='small' url='{{demolinks.spotify.url}}' />
<Microlink media={['audio']} url='{{demolinks.spotify.url}}' />
<Microlink media={['audio']} size='large' url='{{demolinks.spotify.url}}' />

<Figcaption>
Microlink SDK <Link href='/docs/sdk/parameters/size/'>size</Link> variations.
</Figcaption>

The card approach improves a lot of the URL preview experience, making it possible for you to adopt it on your own website or application.

However, some domains on the Internet (like **Instagram**, **SoundCloud**, **Spotify**, **Facebook**, **X**,…) have their own way of embedding their content, making the Microlink card displayed less recognizable than using their own way.

**Microlink SDK v4.5** introduces the ability to set `iframe` as the [media](/docs/sdk/parameters/media/) property for using a native embed solution always when it's available.

<Microlink media={['iframe']} url='{{demolinks.spotify.url}}' style={{textAlign:'center'}} />

The [media](/docs/sdk/parameters/media/) property takes into consideration the URL preferences, setting up the [Microlink API](/docs/api/getting-started/overview) call in order to satisfy the media requirements.

For example, when the URL is an audio provider (like **SoundCloud** or **Spotify**) if you set `media: ['audio']` you are telling Microlink API that you want to detect the streaming source of audio behind the URL, enabling [audio](/docs/api/parameters/audio) for that purpose.

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

If the audio detection is done successfully, [Microlink API](/docs/api/getting-started/overview) will return an audio data field as part of the response that will be used by **Microlink SDK** for creating the audio preview.

In the same way, in case you prefer to use provider iframes, just need to set `media: ['iframe']` for enabling [iframe](/docs/api/parameters/iframe) detection.

```json
{
  "iframe": {
    "html": "<iframe width=\"300\" height=\"380\" allowtransparency=\"true\" frameborder=\"0\" allow=\"encrypted-media\" title=\"Spotify Embed: Space Spine\" src=\"https://open.spotify.com/embed/album/49ax7HUaKuueaVtZBkEZD4?highlight=spotify:track:1W2919zs8SBCLTrOB1ftQT\"></iframe>",
    "scripts": []
  }
}
```

After that, Microlink API does the magic and returns you the iframe, leveraging into **Microlink SDK** for embedding it properly.

Note that we are specifying [media](/docs/sdk/parameters/media/) as a collection. That's because you can add more than one value to be used as fallbacks.

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

That's specially useful for the cases where the URL provider doesn't support iframe, or you don't know if the URL is exposing and audio/video streaming source to consume.

## Providers supported

That's the best part: Any provider that implements [oembed](https://oembed.com/) specification is supported.

A non exhaustive list of the most common providers could be:

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
