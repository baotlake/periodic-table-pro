import { useContext } from 'react'
import Head from 'next/head'
import {
    Context,
    MenuPageLayout,
    Setting,
} from "@periodic-table-pro/components"

export default function ToolsPage() {

    const { state: { theme: { mode: themeMode } } } = useContext(Context)

    return (
        <>
            <Head>
                <title>设置 - 元素周期表PRO 高颜值化学必备小工具</title>
            </Head>
            <div>
                <MenuPageLayout themeClass={themeMode} title="设置">
                    <Setting />
                </MenuPageLayout>
            </div>
        </>
    )
}