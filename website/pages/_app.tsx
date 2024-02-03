import type { AppProps } from 'next/app'
import { Initialization } from '@periodic-table-pro/components'

import '../styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Initialization />
      <Component {...pageProps} />
    </>
  )
}
