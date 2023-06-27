---
title: 'margin'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<object'/></TypeContainer><br/>
Default: <Type children="'0.35cm'"/>

It sets the paper margins for the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/pdf/basecamp.pdf" />

<MultiCodeEditor languages={mqlCode('https://basecamp.com/shapeup/0.3-chapter-01', { pdf: { margin: '4mm' } })} />

All possible units are:

- <Type children="'px'"/> for pixel.
- <Type children="'in'"/> for inches.
- <Type children="'cm'"/> for centimeters.
- <Type children="'mm'"/> for millimeters.

You can pass an <Type children='<object>'/> specifing each corner side of the paper:

```js
{
  margin: {
    top: '4mm',
    bottom: '4mm',
    left: '4mm',
    right: '4mm'
  }
}
```

Or, in case you pass an <Type children='<string>'/>, it will be used for all the sides:

```js
{
  margin: '4mm'
}
```
