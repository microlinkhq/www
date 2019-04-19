---
title: 'Data Types'
---

The **Microlink API** is working all time with data.

Because that, we must make sure that the data is what it is said to be.

Let me put an example: how can you be sure [instagram.com/p/BeV6tOhFUor](https://www.instagram.com/p/BeV6tOhFUor) is a reachable URL, not just an `string`?

For doing that, we introduce the concept of **Data Type**: A set of validators we run over the original value extracted just to be sure it has a determinate shape.

**Microlink API** supports the following builtin **Data Types**:

- `author` — eg. *SpaceX*<br/>
  A human-readable representation of the author's name.
- `date` — eg. *2018-01-24T18:39:47.000Z*<br/>
  An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) representation of the date the article was published.
- `description` — eg. *First static fire test of Falcon Heavy…* <br/>
  The publisher's chosen description of the article.
- `title` — eg. *SpaceX on Instagram*<br/>
  The publisher's chosen title of the article.
- `url` — eg. *https://www.instagram.com/p/BeV6tOhFUor*<br/>
  The URL of the article.
- `lang` — eg. *en*<br/>
  An [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) representation of the url content language.
- `publisher` — eg. *Instagram*<br/>
  A human-readable representation of the publisher's name.
