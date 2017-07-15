/* global APP_TITLE, APP_DESCRIPTION, APP_IMAGE, APP_TWITTER, APP_URL */

import Head from 'next/head'

export default ({
  children,
  title = APP_TITLE,
  description = APP_DESCRIPTION,
  image = APP_IMAGE,
  twitter = APP_TWITTER,
  url = APP_URL,
  className
}) => {
  return (
    <div>
      <Head>
        <title>{ title }</title>

        <meta itemProp='name' content={title} />
        <meta itemProp='description' content={description} />
        <meta itemProp='image' content={image} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:site' content={twitter} />
        <meta name='twitter:image' content={image} />

        <meta name='og:title' content={title} />
        <meta name='og:description' content={description} />
        <meta name='og:image' content={image} />
        <meta name='og:url' content={url} />
        <meta name='og:site_name' content={title} />
        <meta name='og:type' content='website' />

        <link rel='canonical' href={url} />

      </Head>

      <main className={className}>
        { children }
      </main>
    </div>
  )
}
