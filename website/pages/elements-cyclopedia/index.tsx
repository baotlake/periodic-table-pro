import {
  ElementCyclopedia,
  NavigationHeader,
  ToolPageLayout,
} from '@periodic-table-pro/components'
import { useRecoilState } from 'recoil'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function ToolsPage() {
  const [themeMode] = useRecoilState(themeModeState)

  return (
    <div>
      <ToolPageLayout title="元素百科">
        <ElementCyclopedia themeClass={themeMode} />
      </ToolPageLayout>
    </div>
  )
}
