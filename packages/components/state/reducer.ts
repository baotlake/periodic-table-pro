import {
    DisplayProperty,
    ColorSign,
    Emphasize,
    formalShortAtomicWeights,
} from '@periodic-table-pro/data'
import { parseTrendValue } from '../utils/trend'
import type { Action } from './actions'

export type State = {
    theme: {
        mode: 'dark' | 'light',
        followSystem: boolean,
        initialized: boolean
    },
    menuButtonClientRect: {
        bottom: number
        height: number
        left: number
        right: number
        top: number
        width: number
        windowWidth: number
        windowHeight: number
    },
    periodicTable: {
        emphasize: Emphasize,
        colorSign: ColorSign,
        trendData: ReturnType<typeof parseTrendValue>,
        temperature: number,
        displayProperty: DisplayProperty,
    },
}

export const initialState: State = {
    theme: {
        mode: 'dark',
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
        emphasize: 'symbol',
        colorSign: 'classification',
        trendData: parseTrendValue(formalShortAtomicWeights),
        temperature: 0,
        displayProperty: 'atomicWeight',
    },
}

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