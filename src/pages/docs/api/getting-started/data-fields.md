---
title: 'Data fields'
--- 

When you send a [url](/docs/api/parameters/url) to Microlink API, the following data fields are detected by default:

- `author` <small>(e.g., <Type children="'SpaceX'"/>)</small><br/>
  A human-readable representation of the author's name.
- `date` <small>(e.g., <Type children='2018-01-24T18:39:47.000Z'/>)</small><br/>
  An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) representation of the date the article was published.
- `description` <small>(e.g., <Type children="'First static fire test of Falcon Heavy…'"/>)</small><br/>
  The publisher's chosen description of the article.
- `image` <small>x(e.g., <Type children="https://cdn.instagram.com/…/171196260320789.jpg"/>)</small><br/>
  An image URL that best represents the article.
- `video` <small>(e.g., <Type children="'https://cdn.instagram.com/…/26867070.mp4'"/>)</small><br/>
  A video URL that best represents the article.
- `lang` <small>(e.g., <Type children="en"/>)</small><br/>
  An [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) representation of the url content language.
- `logo` <small>(e.g., <Type children="'https://logo.clearbit.com/instagram.com'"/>)</small><br/>
  An image URL that best represents the publisher brand.
- `publisher` <small>(e.g., <Type children="'Instagram'"/>)</small><br/>
  A human-readable representation of the publisher's name.
- `title` <small>(e.g., <Type children="'Manufactures Advanced Rockets & Spacecraft'"/>)</small><br/>
  The publisher's chosen title of the article.
- `url` <small>(e.g., <Type children="'https://instagram.com/p/BeV6tOhFUor'"/>)</small><br/>
  The URL of the article.

When a data field is media content, the following contextual data will be also returned:

  - `width`: file width in pixels.
  - `height`: file width in pixels.
  - `type`: file type extension.
  - `size`: file size in bytes.
  - `size_pretty` file size in a human readable format.

Moreover, if the media content is playable (such as [video](/docs/api/parameters/video) or [audio](/docs/api/parameters/audio)), the following fields will be added as well:

  - `duration`: source duration in seconds.
  - `duration_pretty` source duration in a human readable format.

You can customize this behavior via [meta](/docs/api/parameters/meta) and/or [data](/docs/api/parameters/data) in order to add specific data rules over the target URL.

Additionally, Microlink gives you some HTTP information over the target URL, such as:

  - `statusCode`: The HTTP status code associated with the url response.
  - `headers`: The HTTP response headers associated with the url response.

The service also returns a `status` field to represent the stage of the current transaction. 

You can read [format](/docs/api/basics/format) section to know more about that.
