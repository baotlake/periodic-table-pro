import {
    DisplayProperty,
    ColorSign,
    Emphasize,
    formalShortAtomicWeights,
} from '@periodic-table-pro/data'
import { parseTrendValue } from '../utils/trend'
import type { Action } from './actions'

type ThemeMode = 'dark' | 'light'

export const initialState = {
    theme: {
        mode: 'dark' as ThemeMode,
        followSystem: false,
        initialized: false,
    },
    menuButtonClientRect: {
        bottom: 56,
        height: 32,
        left: 320,
        right: 407,
        top: 24,
        width: 87,
        windowWidth: 414,
        windowHeight: 736,
    },
    periodicTable: {
        emphasize: 'symbol' as Emphasize,
        colorSign: 'classification' as ColorSign,
        trendData: parseTrendValue(formalShortAtomicWeights),
        temperature: 0,
        displayProperty: 'atomicWeight' as DisplayProperty,
        zoom: 1,
    },
}

export type State = typeof initialState

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setTheme':
            return { ...state, theme: { ...state.theme, ...action.payload } }
        case 'setMenuButtonClientRect':
            return { ...state, menuButtonClientRect: { ...state.menuButtonClientRect, ...action.payload } }
        case 'setEmphasize':
        case 'setColorSign':
        case 'setTrendData':
        case 'setTemperature':
        case 'setDisplayProperty':
        case 'setPtZoom':
            return {
                ...state,
                periodicTable: {
                    ...state.periodicTable,
                    ...action.payload,
                }
            }
        default:
            return { ...state }
    }
}