'use strict'

const React = require('react')

const isDevelopment = (process.env.NODE_ENV || 'development') === 'development'

const VA_SCRIPT = isDevelopment
  ? 'https://cdn.vercel-insights.com/v1/script.debug.js'
  : '/_vercel/insights/script.js'

const GA_TRACKING_ID = 'G-4MN95ELTLZ'
const CONSENT_STORAGE_KEY = 'microlink-cookie-consent'

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      key='service-desc'
      rel='service-desc'
      type='application/openapi+json'
      href='https://microlink.io/openapi.json'
    />,
    <link
      key='service-doc'
      rel='service-doc'
      type='text/html'
      href='https://microlink.io/docs/api/getting-started/overview'
    />,
    <link
      key='api-catalog'
      rel='api-catalog'
      type='application/linkset+json'
      href='https://microlink.io/.well-known/api-catalog'
    />
  ])

  if (!isDevelopment) {
    setHeadComponents([
      <script
        key='gtag-script'
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />,
      <script
        key='gtag-init'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
var consent='granted';try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='denied')consent='denied'}catch(e){}
gtag('consent','default',{ad_storage:consent,ad_user_data:consent,ad_personalization:consent,analytics_storage:consent});
gtag('set','ads_data_redaction',consent==='denied');
gtag('js',new Date());
gtag('config','${GA_TRACKING_ID}');`
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
