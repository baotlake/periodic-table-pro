import { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { Initialization } from '@periodic-table-pro/components'
import { CompatProvider } from '@periodic-table-pro/components/compat'
import ProgressBar from '@/components/ProgressBar'
import './globals.scss'
import 'nprogress/nprogress.css'

const APP_ORIGIN = process.env.APP_ORIGIN

export const metadata: Metadata = {
  title: '元素周期表PRO - 高颜值化学必备工具',
  description:
    '元素周期表Pro —— 高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {process.env.NODE_ENV == 'production' ? (
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-P8WKBB4L3Q"
            strategy="afterInteractive"
          />
        ) : null}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-P8WKBB4L3Q');
          `}
        </Script>

        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4389514501307591"
          crossOrigin="anonymous"
        ></Script>

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <meta
          name="application-name"
          content="元素周期表PRO - 高颜值化学必备工具"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="元素周期表PRO - 高颜值化学必备工具"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="msapplication-config" content="/pwa/browserconfig.xml" /> */}
        <meta name="msapplication-TileColor" content="#121314" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#121314" />
        {/* 180x180 */}
        <link rel="apple-touch-icon" href="/pwa/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/pwa/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/pwa/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/pwa/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/pwa/logo_32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/pwa/logo_16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/pwa/logo.svg" color="#121314" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta
          property="og:title"
          content="元素周期表PRO - 高颜值化学必备工具"
        />
        <meta property="og:image" content="/og_image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={APP_ORIGIN} />
      </head>
      <body>
        <CompatProvider>
          <Initialization />
          <Suspense>
            <ProgressBar />
          </Suspense>
          {children}
        </CompatProvider>
      </body>
    </html>
  )
}
