'use strict'

const React = require('react')

const NODE_ENV = process.env.NODE_ENV || 'development'

const isDevelopment = NODE_ENV === 'development'

const VA_SCRIPT = isDevelopment
  ? 'https://cdn.vercel-insights.com/v1/script.debug.js'
  : '/_vercel/insights/script.js'

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key='crisp'
      dangerouslySetInnerHTML={{
        __html:
          'window.$crisp=[];window.$crisp.push(["safe", true]);window.CRISP_WEBSITE_ID="94b59a37-2915-40fe-aacd-5e5301d746a5";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();'
      }}
    />,
    <script
      key='va'
      dangerouslySetInnerHTML={{
        __html: `
        window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments) };
        d = document;
        s = d.createElement("script")
        s.src = '${VA_SCRIPT}';
        s.defer = true;
        s.setAttribute('data-debug', ${JSON.stringify(isDevelopment)});
        d.getElementsByTagName("head")[0].appendChild(s);`
      }}
    />
  ])
}
