import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="icon" href="/favicon.png" />
        {
          process.env.NODE_ENV == 'production' ? (
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-P8WKBB4L3Q"
              strategy="afterInteractive"
            />
          ) : null
        }
        <Script id="google-analytics" strategy='afterInteractive' >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-P8WKBB4L3Q');
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
