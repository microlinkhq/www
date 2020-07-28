import mql from '@microlink/mql'

const createApiUrl = ({ url = 'https://example.com', ...props } = {}) => {
  const [apiUrl] = mql.getApiUrl(url, props)
  return apiUrl
}

const createDataUrl = props => (url = 'https://example.com') =>
  createApiUrl({ url, ...props })

const mqlCode = (props, stringProps) => {
  const dataUrl = createDataUrl(props)

  const React = args => {
    const { url = '{{demolinks.spotify.url}}', size = 'large' } = {
      ...props,
      ...args
    }

    return `import Microlink from '@microlink/react'

export default props => (
  <Microlink
    url='${url}'
    size='${size}'
    {...props}
  />
)`
  }

  React.language = 'jsx'

  const Nodejs = args => {
    const { url = '{{demolinks.spotify.url}}' } = { ...props, ...args }

    return `
const mql = require('@microlink/mql')

module.exports = props => {
  const { status, data } = await mql('${url}', {
    ${stringProps},
    ...props
  })
}`
  }

  Nodejs.language = 'javascript'

  const cURL = () => `curl -sL \\
  ${dataUrl()} \\
  | jq`

  cURL.language = 'bash'

  const Shell = () =>
    `${dataUrl().replace('https://api.microlink.io?url=', 'microlink-api ')}`

  cURL.language = 'bash'

  const Ruby = props =>
    `require('httparty')

response = HTTParty.get('${dataUrl()}')

puts response.body`

  Ruby.language = 'ruby'

  const PHP = () =>
    `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${dataUrl()}',
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

  const Go = () =>
    `package main

import (
  "encoding/json"
  "net/http"
  "os"
)

func main() {
  url := "${dataUrl()}"

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

  const Python = () =>
    `import requests

url = '${dataUrl()}'
response = requests.request("GET", url)

print(response.text)`

  Python.language = 'python'

  const Java = () => `

public class Main {
  public static void main(String[] args) {
    HttpResponse<String> response = Unirest.get('${dataUrl()}').asJson();
    System.out.println(response);
  }
}
`

  Java.language = 'java'

  const Swift = () =>
    `import Foundation
var request = NSMutableURLRequest(
  URL: NSURL(string: '${dataUrl()}')!,
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

  const C = () => `
CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");
curl_easy_setopt(hnd, CURLOPT_URL, "${dataUrl()}");

CURLcode ret = curl_easy_perform(hnd)`

  C.language = 'c'

  const Clojure = () => `
(require '[clj-http.client :as client])

(client/get "${dataUrl()}")`

  Clojure.language = 'clojure'

  const CSharp = () => `
var client = new RestClient("${dataUrl()}");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);`

  CSharp.language = 'c#'

  return {
    'Node.js': Nodejs,
    cURL,
    Go,
    Java,
    PHP,
    Python,
    React,
    Clojure,
    C,
    'C#': CSharp,
    Ruby,
    Shell,
    Swift
  }
}

mqlCode.json = (data, props = '') => `
// npm install @microlink/cli --global
// microlink-api ${data.url}${props}\n
${JSON.stringify(data, null, 2)}
`

mqlCode.html = (props = {}) => {
  const { size = 'large' } = props

  return `
<!-- Microlink SDK Vanilla/UMD bundle -->
<script src="//cdn.jsdelivr.net/npm/@microlink/vanilla/umd/microlink.min.js"></script>

<!-- Replace all elements with \`link-preview\` class -->
<script>
document.addEventListener("DOMContentLoaded", function(event) {
  microlink('.link-preview', {
    size: '${size}'
  })
})
</script>`
}

export default mqlCode
