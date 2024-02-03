import {
  ElementCyclopedia,
  NavigationHeader,
  ToolPageLayout,
} from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function ToolsPage() {
  const [themeMode] = useAtom(themeModeState)

  return (
    <div>
      <ToolPageLayout title="元素百科">
        <ElementCyclopedia themeClass={themeMode} />
      </ToolPageLayout>
    </div>
  )
}
