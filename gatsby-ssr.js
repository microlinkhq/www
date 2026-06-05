'use strict'

const React = require('react')

const isDevelopment = (process.env.NODE_ENV || 'development') === 'development'

const VA_SCRIPT = isDevelopment
  ? 'https://cdn.vercel-insights.com/v1/script.debug.js'
  : '/_vercel/insights/script.js'

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  if (!isDevelopment) {
    setHeadComponents([
      <script
        key='plausible-script'
        async
        src='https://plausible.io/js/pa-9WGGaGH1_X9e8zH2gSymh.js'
      />,
      <script
        key='plausible-init'
        dangerouslySetInnerHTML={{
          __html:
            'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()'
        }}
      />
    ])
  }

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
