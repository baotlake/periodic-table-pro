import { atom } from "recoil"
import type { ThemeMode, TrendData, ZoomControlInterface } from "../type"
import { type Emphasize, type ColorSign, type DisplayProperty, formalShortAtomicWeights } from '@periodic-table-pro/data'
import { parseTrendValue } from "../utils/trend"

export const themeModeState = atom<ThemeMode>({
    key: "themeMode",
    default: 'dark'
})

export const themeFollowSystem = atom({
    key: 'themeFollowSystem',
    default: false,
})

export const themeInitialized = atom({
    key: 'themeInitialized',
    default: false,
})

export const menuButtonClientRect = atom({
    key: 'menuButtonClientRect',
    default: {
        bottom: 56,
        height: 32,
        left: 320,
        right: 407,
        top: 24,
        width: 87,
        windowWidth: 414,
        windowHeight: 736,
    }
})

export const periodicTableEmphasize = atom<Emphasize>({
    key: 'periodicTableEmphasize',
    default: 'symbol',
})

export const periodicTableColorSign = atom<ColorSign>({
    key: 'periodicTableColorSign',
    default: 'classification',
})

export const periodicTableTrendData = atom<TrendData[]>({
    key: 'periodicTableTrendData',
    default: parseTrendValue(formalShortAtomicWeights)
})

export const periodicTableTemperature = atom({
    key: 'periodicTableTemperature',
    default: 0,
})

export const periodicTableDisplayProperty = atom<DisplayProperty>({
    key: 'periodicTableDisplayProperty',
    default: 'atomicWeight'
})

export const periodicTableZoom = atom({
    key: 'periodicTableZoom',
    default: 1,
})

export const periodicTableZoomControl = atom<ZoomControlInterface | null>({
    key: 'periodicTableZoomControl',
    default: null,
    dangerouslyAllowMutability: true,
})

export const displayPropertiesModalVisible = atom({
    key: 'displayPropertiesModalVisible',
    default: false,
})

export const zoomModalVisible = atom({
    key: 'zoomModalVisible',
    default: false,
})
