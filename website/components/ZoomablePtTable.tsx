'use client'

import { PanPinch } from '@periodic-table-pro/components/PanPinch'
import { PeriodicTable } from '@periodic-table-pro/components/PeriodicTable'
import { periodicTableZoom } from '@periodic-table-pro/components/recoil/atom'
import { maxPtZoom, minPtZoom } from '@periodic-table-pro/components/config'
import { useAtom } from 'jotai'

export default function ZoomablePtTable() {
  const [zoom] = useAtom(periodicTableZoom)

  return (
    <PanPinch value={zoom} min={minPtZoom} max={maxPtZoom}>
      <PeriodicTable />
    </PanPinch>
  )
}
