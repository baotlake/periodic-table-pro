import Head from 'next/head'
import Script from 'next/script'
import { GetStaticPaths, GetStaticProps } from 'next'
import classNames from 'classnames/bind'
import { NavigationHeader, Article } from '@periodic-table-pro/components'
import { symbol, WikiData } from '@periodic-table-pro/data'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'
import { STATIC_BASE } from '@periodic-table-pro/components/config'
import styles from './wiki.module.scss'
import '@periodic-table-pro/components/wiki.scss'

const cx = classNames.bind(styles)

type Props = {
  atomicNumber: number
  data: WikiData
}

export default function Wiki({ atomicNumber, data }: Props) {
  const [theme] = useAtom(themeModeState)

  return (
    <>
      {/* <Head></Head> */}
      <div className={cx('wiki-page', theme)}>
        <NavigationHeader themeClass={theme} />

        <Article
          themeClass={theme}
          atomicNumber={atomicNumber}
          loading={false}
          heading={data.heading}
          tagline={data.tagline}
          data={data}
        />

        {/* <AdjacentNavigation
                themeClass={theme}
                previous={detailData.previous ? detailData.previous.symbol : '--'}
                current={detailData.symbol}
                next={detailData.next ? detailData.next.symbol : '--'}
            // onTapPrevious={handleTapPrevious}
            // onTapNext={handleTapNext}
            /> */}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = symbol.map((s) => ({
    params: {
      slug: [s],
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = [''].concat(context.params.slug)[1]
  const i = symbol.findIndex((s) => s == slug)
  const Z = i + 1
  const data = await import('../../public/json/wiki/' + Z + '.json')

  return {
    props: {
      data: data.default,
    },
  }
}
