import React from 'react'
import components from 'components/markdown'
import md from 'markdown-in-js'

import postLayout from 'layouts/post'

export default postLayout({
  title: 'Hello World',
  date: '19 January 2018'
})(md(components)`
#### **Headers**

# A Header 1

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

## A Header 2

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

### A Header 3

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

#### A Header 4

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

##### A Header 5

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

###### A Header 6

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

#### **Text**

*Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.*

**Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.**

~~Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.~~

<mark>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</mark>

Pellentesque *habitant* morbi tristique senectus et netus et malesuada fames ac turpis **egestas**. Vestibulum tortor <mark>quam</mark>, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet ~~quam~~ egestas semper. Aenean ultricies mi vitae est. Mauris [placerat](http://kikobeats.com) eleifend leo.

#### **Quote**

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

> Whenever you find yourself on the side of the majority, it is time to pause and reflect
<cite>Mark Twain</cite>

Source code:

> Whenever you find yourself on the side of the majority, it is time to pause and reflect
<cite>Mark Twain</cite>

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

#### **Emoji**

😬 😍 💸 😱

Hello 😁 how are you? 🤓.

:smile:

#### **List**

* Bird
* [McHale](http://)
* \`Parish\`

#### **Sort List**

1. Bird
2. [McHale](http://)
3. \`Parish\`

#### **Code**

A \`Map\` is the new \`ECMAScript6\` data structure. You can use a \`Object\` as a \`Map\`.
`)
