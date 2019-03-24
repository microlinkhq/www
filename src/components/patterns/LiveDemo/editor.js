import mql from '@microlink/mql'

const createApiUrl = props => {
  const [url] = mql.apiUrl(props.url)
  return url
}

const React = ({ url }) =>
  `import MicrolinkCard from '@microlink/react'

<MicrolinkCard
  url='${url}'
  size='large'
  video />`

React.language = 'jsx'

const cURL = props => `$ curl "${createApiUrl(props)}"`

cURL.language = 'bash'

// cURL.whiteSpace = 'pre-line'

const HTML = ({ url }) =>
  `<!-- Microlink SDK Vanilla/UMD bundle -->
<script src="//cdn.jsdelivr.net/npm/@microlink/vanilla/umd/microlink.min.js"></script>

<!-- Replace all elements with \`link-preview\` class -->
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    microlink('.link-preview', {
      size: 'large',
      video: true
    })
  })
</script>`

HTML.language = 'html'

const Nodejs = props =>
  `const mql = require('@microlink/mql')

const url = '${props.url}'

const { status, data } = await mql(url)`

Nodejs.language = 'javascript'

const Ruby = props =>
  `require('httparty')

response = HTTParty.get('${createApiUrl(props)}')

puts response.body`

Ruby.language = 'ruby'

const PHP = props =>
  `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${createApiUrl(props)}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo 'cURL Error #:' . $err;
} else {
  echo $response;
}

?>`

PHP.language = 'php'

const Go = props =>
  `package main

import (
  "encoding/json"
  "net/http"
  "os"
)

func main() {
  url := "${createApiUrl(props)}"

  if res, err := http.Get(url); err == nil {
  var payload Schema

  json.NewDecoder(res.Body).Decode(&payload)
  json.NewEncoder(os.Stdout).Encode(payload)

  res.Body.Close()
  }
}

// Microlink API follows JSend schema format
// See more: https://labs.omniti.com/labs/jsend
type Schema struct {
  Status  string \`json:"status"\`
  Message string \`json:"message,omitempty"\`
  Data    *Data  \`json:"data,omitempty"\`
}

type Data struct {
  Author      string    \`json:"author,omitempty"\`
  Lang        string    \`json:"lang,omitempty"\`
  Date        string    \`json:"date,omitempty"\`
  Title       string    \`json:"title,omitempty"\`
  Description string    \`json:"description,omitempty"\`
  Publisher   string    \`json:"publisher,omitempty"\`
  URL         string    \`json:"url"\`
  Image       *ImageURL \`json:"image,omitempty"\`
  Video       *ImageURL \`json:"video,omitempty"\`
  Logo        *ImageURL \`json:"logo,omitempty"\`
  Screenshot  *ImageURL \`json:"screenshot,omitempty"\`
}

type ImageURL struct {
  Width            int      \`json:"width,omitempty"\`
  Height           int      \`json:"height,omitempty"\`
  Size             int      \`json:"size,omitempty"\`
  SizePretty       string   \`json:"size_pretty,omitempty"\`
  Duration         int      \`json:"duration,omitempty"\`
  DurationPretty   string   \`json:"duration_pretty,omitempty"\`
  Type             string   \`json:"type,omitempty"\`
  URL              string   \`json:"url"\`
  Palette          []string \`json:"palette,omitempty"\`
  BackgroundColor  string   \`json:"background_color,omitempty"\`
  AlternativeColor string   \`json:"alternative_color,omitempty"\`
  Color            string   \`json:"color,omitempty"\`
}`

Go.language = 'go'

const Python = props =>
  `import requests

url = '${createApiUrl(props)}'
response = requests.request("GET", url)
print(response.text)`

Python.language = 'python'

const Swift = props =>
  `import Foundation
var request = NSMutableURLRequest(
  URL: NSURL(string: '${createApiUrl(props)}')!,
  cachePolicy: .UseProtocolCachePolicy,
  timeoutInterval: 10.0
)

request.HTTPMethod = "GET"

let session = NSURLSession.sharedSession()
let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    println(error)
  } else {
    let httpResponse = response as? NSHTTPURLResponse
    println(httpResponse)
  }
})

dataTask.resume()`

Swift.language = 'swift'

const Java = props =>
  `HttpResponse<String> response = Unirest.get('${createApiUrl(
    props
  )}').asString();`

Java.language = 'java'

export default {
  React,
  HTML,
  'Node.js': Nodejs,
  cURL,
  Ruby,
  Go,
  Java,
  Python,
  PHP,
  Swift
}
