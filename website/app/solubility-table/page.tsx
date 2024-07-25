'use client'

import { ToolPageLayout, SolubilityTable } from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function ToolsPage() {
  const [themeMode] = useAtom(themeModeState)

  return (
    <div>
      <ToolPageLayout title="溶解性表">
        <SolubilityTable themeClass={themeMode} />
      </ToolPageLayout>
    </div>
  )
}
