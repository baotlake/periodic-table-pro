import { atom } from 'jotai'
import type { ThemeMode, TrendData, ZoomControllerInterface } from '../type'
import {
  type Emphasize,
  type ColorSign,
  type DisplayProperty,
  formalShortAtomicWeights,
} from '@periodic-table-pro/data'
import { parseTrendValue } from '../utils/trend'

export const themeModeState = atom('dark' as ThemeMode)
export const themeFollowSystem = atom(false)

export const themeInitialized = atom(false)

export const menuButtonClientRect = atom({
  bottom: 56,
  height: 32,
  left: 320,
  right: 407,
  top: 24,
  width: 87,
  windowWidth: 414,
  windowHeight: 736,
  inited: false,
})

export const periodicTableEmphasize = atom('symbol' as Emphasize)

export const periodicTableColorSign = atom('classification' as ColorSign)

export const periodicTableTrendData = atom(
  parseTrendValue(formalShortAtomicWeights) as TrendData[]
)

export const periodicTableTemperature = atom(0)

export const periodicTableDisplayProperty = atom(
  'atomicWeight' as DisplayProperty
)

export const periodicTableZoom = atom(1)

export const ptZoomControler = atom(null as ZoomControllerInterface | null)

export const displayPropertiesModalVisible = atom(false)

export const zoomModalVisible = atom(false)
