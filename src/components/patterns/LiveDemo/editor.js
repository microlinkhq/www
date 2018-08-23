import { createApiUrl } from 'react-microlink'

const apiUrl = props => createApiUrl({ ...props, video: true, contrast: true })

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

cURL.whiteSpace = 'pre-line'

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

const Nodejs = props =>
  `'use strict'

const got = require('got')

;(async () => {
  try {
    const { body } = await got('${apiUrl(props)}', { json: true })
    console.log(body)
  } catch(err) {
    console.error(err)
  }
})()
`.trim()

const Ruby = props => `require('httparty')

response = HTTParty.get('${apiUrl(props)}')

puts response.body
`

const PHP = props => `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${apiUrl(props)}',
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

const Java = props => `HttpResponse<String> response = Unirest.get('${apiUrl(
  props
)}')
.asString();
`

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
