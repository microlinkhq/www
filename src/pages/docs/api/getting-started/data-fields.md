---
title: 'Data Fields'
--- 

The following data fields are detect for any [url](/docs/api/api-parameters/url) provided:

- `author` — eg. *SpaceX*<br/>
  A human-readable representation of the author's name.
- `date` — eg. *2018-01-24T18:39:47.000Z*<br/>
  An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) representation of the date the article was published.
- `description` — eg. *First static fire test of Falcon Heavy…* <br/>
  The publisher's chosen description of the article.
- `image` — eg. *https://cdninstagram.com/…/26867070_171196260320789.jpg*<br/>
  An image URL that best represents the article.
- `video` — eg. *https://cdninstagram.com/…/26867070_171196260320789.mp4*<br/>
  A video URL that best represents the article.
- `lang` — eg. *en*<br/>
  An [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) representation of the url content language.
- `logo` — eg. *https://www.instagram.com/static/images/ico/favicon-192.png/b407fa101800.png*<br/>
  An image URL that best represents the publisher brand.
- `publisher` — eg. *Instagram*<br/>
  A human-readable representation of the publisher's name.
- `title` — eg. *SpaceX on Instagram*<br/>
  The publisher's chosen title of the article.
- `url` — eg. *https://www.instagram.com/p/BeV6tOhFUor*<br/>
  The URL of the article.

Additionally, for any media we add some useful contextual information.

  - `width`: file width in pixels.
  - `height`: file width in pixels.
  - `type`: file type extension.
  - `size`: file size in bytes.
  - `size_pretty` file size in a human readable format.

In addition, if the detected multimedia content is reproducible (such as [video](/docs/api/api-parameters/video) or [audio](/docs/api/api-parameters/audio)), the following fields will be added as well:

  - `duration`: source duration in seconds.
  - `duration_pretty` source duration in a human readable format.
