import { useContext } from 'react'
import {
    Context,
    ElementCyclopedia,
    NavigationHeader,
    ToolPageLayout,
} from "@periodic-table-pro/components"

export default function ToolsPage() {

    const { state: { theme: { mode: themeMode }, menuButtonClientRect: rect } } = useContext(Context)

    return (
        <div>
            <ToolPageLayout
                title='元素百科'
            >
                <ElementCyclopedia themeClass={themeMode} />
            </ToolPageLayout>
        </div>
    )
}