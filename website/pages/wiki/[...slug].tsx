import { GetStaticPaths, GetStaticProps } from 'next'
import { useContext } from "react"
import classNames from 'classnames/bind'
import {
    Context,
    NavigationHeader,
    Article,
} from "@periodic-table-pro/components"

import { symbol, WikiData } from "@periodic-table-pro/data"

import styles from './wiki.module.scss'
import "@periodic-table-pro/components/wiki.scss"

const cx = classNames.bind(styles)

type Props = {
    atomicNumber: number
    data: WikiData
}

export default function Wiki({ atomicNumber, data }: Props) {

    const {
        state: {
            theme: { mode: theme },
        }
    } = useContext(Context)

    return (
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

const BUCKET_HOST = process.env.BUCKET_HOST

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = [''].concat(context.params.slug)[1]
    const i = symbol.findIndex((s) => s == slug)
    const Z = i + 1
    const url = BUCKET_HOST + '/json/wiki/' + Z + '.json'

    console.log('getStaticProps url: ', url)

    const data = await fetch(url).then((res) => res.json())

    return {
        props: {
            data: data,
        }
    }
}
