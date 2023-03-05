import { useContext } from 'react'
import {
    Context,
    ToolPageLayout,
    SolubilityTable,
} from "@periodic-table-pro/components"

export default function ToolsPage() {

    const { state: { theme: { mode: themeMode }, menuButtonClientRect: rect } } = useContext(Context)

    return (
        <div>
            <ToolPageLayout
                title='溶解性表'
            >
                <SolubilityTable themeClass={themeMode} />
            </ToolPageLayout>
        </div>
    )
}