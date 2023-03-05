import { useContext } from "react"
import {
    Context,
    NavigationHeader,
    DetailContent,
    AdjacentNavigation,
} from "@periodic-table-pro/components"
import { useRouter } from "next/router"
import Head from "next/head"

import { DetailData, getDetailData, symbol } from "@periodic-table-pro/data"
import { GetStaticPaths, GetStaticProps } from "next"
import { getDetailPath } from "@periodic-table-pro/components/utils/routes"

type Props = {
    title: string
    detailData: DetailData
}

export default function Element({ title, detailData }: Props) {
    const router = useRouter()
    const {
        state: {
            theme: { mode: theme },
        }
    } = useContext(Context)

    const handleTapPrevious = () => {
        if (detailData?.previous?.atomicNumber) {
            router.replace(getDetailPath(detailData.previous.atomicNumber))
        }
    }

    const handleTapNext = () => {
        if (detailData?.next?.atomicNumber) {
            router.replace(getDetailPath(detailData.next.atomicNumber))
        }
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <NavigationHeader themeClass={theme} />

                <DetailContent
                    detailData={detailData}
                />

                <AdjacentNavigation
                    themeClass={theme}
                    previous={detailData.previous ? detailData.previous.symbol : '--'}
                    current={detailData.symbol}
                    next={detailData.next ? detailData.next.symbol : '--'}
                    onTapPrevious={handleTapPrevious}
                    onTapNext={handleTapNext}
                />
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const paths = symbol.map((s) => ({
        params: {
            slug: [s]
        }
    }))
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {

    const slug = [''].concat(context.params.slug)[1]
    const i = symbol.findIndex((s) => s == slug)
    const detailData = getDetailData(i + 1)

    const title = symbol[i] + ' - 元素周期表PRO 高颜值化学必备小工具'

    return {
        props: {
            title,
            detailData,
        }
    }
}
