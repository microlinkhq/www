---
title: 'prerender'
description: 'Optimize how content is fetched from the target URL by choosing between a headless browser or a simple HTTP request.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<string>'/></TypeContainer><br/>
Default: <Type children="'auto'"/><br/>
Values: <TypeContainer><Type children="'auto'"/> | <Type children='true'/> | <Type children='false'/></TypeContainer>

It sets how the content over the target [url](/docs/api/parameters/url) should be fetched.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.sportsnet.ca/hockey/nhl/leafs-john-tavares-return-new-york-hope-positive', { prerender: 'auto' })} />

The prerendering is a technique that consists of preloading all the elements of the page as a previous step before a web crawler can see the page correctly. Three values be used there:

- **true**: A headless browser will be spawned for getting the content of the site. It could be slower since it will use [waitUntil](/docs/api/parameters/waitUntil) to determinte what browser event to wait until consider content is ready.
- **false**: A simple HTTP GET will be performed for getting the content of the site. It's faster, since it doesn't evaluate scripts inside the HTML markup.
- **auto**: The service will determine if a site needs to have prerendering enabled to retrieve the content or not.

You are going to be interested in to use prerendering for a bunch of reasons; one of them is because a high percentage of internet websites are *Single Page Application* (SPA). 

That means that a major part of the content is built on the client when the user enters in the page, like React, Ember, Angular, etc.

In practice, there is no difference between doing that and being a normal user since both interact using a browser, so prerendering is a better way to simulate a normal user and see the content exactly as he would see it.

However, prerendering have a little trade-off: the cloud-based browser needs to wait until DOM events are done, taking extra time for that. But if you do not do this you will not get the data in any way.

We provided two extra headers for reflecting the decision taken by the service. They are:

- `x-fetch-mode`: It determines which fetch technique has been used (being possible <Type children="'prerender'"/> or <Type children="'fetch'"/> as values).
- `x-fetch-time`: It represents the total amount of time spent into the fetch step in a human readable format.

We just recommend to disable prerendering explicitly if you know the target url doesn't need it.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.sportsnet.ca/hockey/nhl/leafs-john-tavares-return-new-york-hope-positive', { prerender: false })} />
