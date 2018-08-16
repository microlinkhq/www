import { createApiUrl } from 'react-microlink'

const apiUrl = props => createApiUrl({ ...props, video: true })

const React = ({ url }) =>
  `import MicrolinkCard from 'react-microlink'

  <MicrolinkCard
    size='large'
    url='${url}'
    size='large'
    video
  />
`.trim()

React.language = 'jsx'

const cURL = props => `$ curl "${apiUrl(props)}"`.trim()

const HTML = ({ url }) =>
  `<!-- Microlink SDK Vanilla/UMD bundle -->
<script src="//cdn.jsdelivr.net/npm/microlinkjs@latest/umd/microlink.min.js"></script>

<!-- Replace all elements with \`link-preview\` class -->
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    microlink('.link-preview', {
      size: 'large',
      video: true
    })
  })
</script>
`.trim()

HTML.language = 'html'

const Nodejs = ({ url }) =>
  `'use strict'

const got = require('got')

;(async () => {
  try {
    const { body } = await got('https://api.microlink.io?url=${url}&video', { json: true })
    console.log(body)
  } catch(err) {
    console.error(err)
  }
})()
`.trim()

const Ruby = props => `require 'uri'
require 'net/http'

url = URI('${apiUrl(props)}')
http = Net::HTTP.new(url.host, url.port)
request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
`

const PHP = props => `<?php

$client = new http\\Client;
$request = new http\\Client\\Request;

$request->setRequestUrl('${apiUrl(props)}');
$request->setRequestMethod('GET');

$client->enqueue($request)->send();
$response = $client->getResponse();
echo $response->getBody();

?>
`

const Go = props => `func main() {
  url := '${apiUrl(props)}'
  req, _ := http.NewRequest("GET", url)
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)
  fmt.Println(res)
  fmt.Println(string(body))
}
`

const Python = props => `import requests

url = '${apiUrl(props)}'
response = requests.request("GET", url)
print(response.text)
`

const Swift = props => `import Foundation
var request = NSMutableURLRequest(
  URL: NSURL(string: '${apiUrl(props)}')!,
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

dataTask.resume()
`

export default {
  React,
  HTML,
  'Node.js': Nodejs,
  cURL,
  Ruby,
  Go,
  Python,
  PHP,
  Swift
}
