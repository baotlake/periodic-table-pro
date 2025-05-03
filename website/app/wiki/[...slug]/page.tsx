import { Metadata } from 'next'
import classNames from 'classnames/bind'
import { NavigationHeader, Article } from '@periodic-table-pro/components'
import { symbol, WikiData } from '@periodic-table-pro/data'
import '@periodic-table-pro/components/wiki.scss'

const cx = classNames.bind({})

type Props = {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  return symbol.map((s) => ({
    slug: [s],
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {}
}

export default async function Wiki({ params }: Props) {
  const { slug } = await params
  const id = slug[0]
  const i = symbol.findIndex((s) => s == id)
  const Z = i + 1
  const wikiJson = await import('../../../public/json/wiki/' + Z + '.json')
  const data: WikiData = wikiJson.default

  return (
    <div className={cx('wiki-page', '')}>
      <NavigationHeader />

      <Article
        // atomicNumber={atomicNumber}
        atomicNumber={Z}
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
  )
}
