import { ToolPageLayout, SolubilityTable } from '@periodic-table-pro/components'
import { useRecoilState } from 'recoil'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function ToolsPage() {
  const [themeMode] = useRecoilState(themeModeState)

  return (
    <div>
      <ToolPageLayout title="溶解性表">
        <SolubilityTable themeClass={themeMode} />
      </ToolPageLayout>
    </div>
  )
}
