'use client'

import {
  PanPinch,
  PeriodicTable,
  periodicTableZoom,
  maxPtZoom,
  minPtZoom,
} from '@packages/components'
import { useAtom } from 'jotai'

export default function ZoomablePtTable() {
  const [zoom] = useAtom(periodicTableZoom)

  return (
    <PanPinch value={zoom} min={minPtZoom} max={maxPtZoom}>
      <PeriodicTable />
    </PanPinch>
  )
}
