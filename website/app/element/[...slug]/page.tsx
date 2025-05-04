import {
  NavigationHeader,
  DetailContent,
  AdjacentNavigation,
} from '@packages/components'
import { getDetailData, symbol } from '@packages/data'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  return symbol.map((s) => ({
    slug: [s],
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const id = slug[0]
  const i = symbol.findIndex((s) => s == id)
  const detailData = getDetailData(i + 1)
  const title = symbol[i] + ' - 元素周期表PRO 高颜值化学必备小工具'
  return {
    title,
  }
}

export default async function Element({ params }: Props) {
  const { slug } = await params
  const id = slug[0]
  const i = symbol.findIndex((s) => s == id)
  const detailData = getDetailData(i + 1)

  return (
    <div>
      <NavigationHeader />
      <DetailContent detailData={detailData} />
      <AdjacentNavigation
        previous={detailData.previous}
        current={{
          symbol: detailData.symbol,
          atomicNumber: detailData.atomicNumber,
        }}
        next={detailData.next}
      />
    </div>
  )
}
