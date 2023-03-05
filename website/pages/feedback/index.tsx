import { useContext } from 'react'
import Head from 'next/head'
import {
    Context,
    MenuPageLayout,
    Feedback,
} from "@periodic-table-pro/components"

export default function FeedbackPage() {

    const { state: { theme: { mode: themeMode } } } = useContext(Context)

    return (
        <>
            <Head>
                <title>意见反馈 - 元素周期表PRO 高颜值化学必备小工具</title>
            </Head>
            <div>
                <MenuPageLayout themeClass={themeMode} title="意见反馈">
                    <Feedback themeClass={themeMode} />
                </MenuPageLayout>
            </div>
        </>
    )
}