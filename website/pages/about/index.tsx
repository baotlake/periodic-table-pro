import { useContext } from 'react'
import Head from 'next/head'
import {
    Context,
    MenuPageLayout,
    About,
} from "@periodic-table-pro/components"

export default function AboutPage() {

    const { state: { theme: { mode: themeMode } } } = useContext(Context)

    return (
        <>
            <Head>
                <title>关于 - 元素周期表PRO 高颜值化学必备小工具</title>
            </Head>
            <div>
                <MenuPageLayout themeClass={themeMode} title="关于">
                    <About themeClass={themeMode} />
                </MenuPageLayout>
            </div>
        </>
    )
}