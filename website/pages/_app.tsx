import type { AppProps } from 'next/app'
import { Initialization } from '@periodic-table-pro/components'
import { RecoilRoot } from 'recoil'
import '../styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Initialization />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
