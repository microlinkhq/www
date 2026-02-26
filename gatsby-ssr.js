'use strict'

const React = require('react')

const isDevelopment = (process.env.NODE_ENV || 'development') === 'development'

const VA_SCRIPT = isDevelopment
  ? 'https://cdn.vercel-insights.com/v1/script.debug.js'
  : '/_vercel/insights/script.js'

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
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
