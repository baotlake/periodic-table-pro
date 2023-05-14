import type { State } from './reducer'
// import type { MenuButtonClientRect } from '../types/other'

interface MenuButtonClientRect {
    bottom: number
    height: number
    left: number
    right: number
    top: number
    width: number
    windowWidth: number
    windowHeight: number
}

export function setTheme(theme: Partial<State['theme']>) {
    return {
        type: 'setTheme' as 'setTheme',
        payload: theme,
    }
}

export function setMenuButtonClientRect(rect: MenuButtonClientRect) {
    return {
        type: 'setMenuButtonClientRect' as 'setMenuButtonClientRect',
        payload: rect,
    }
}

export function setEmphasize(emphasize: State['periodicTable']['emphasize']) {
    return {
        type: 'setEmphasize' as 'setEmphasize',
        payload: {
            emphasize,
        }
    }
}

export function setColorSign(colorSign: State['periodicTable']['colorSign']) {
    return {
        type: 'setColorSign' as 'setColorSign',
        payload: {
            colorSign,
        }
    }
}

export function setTrendData(trendData: State['periodicTable']['trendData']) {
    return {
        type: 'setTrendData' as 'setTrendData',
        payload: {
            trendData,
        }
    }
}

export function setTemperature(temperature: number) {
    return {
        type: 'setTemperature' as 'setTemperature',
        payload: {
            temperature,
        }
    }
}

export function setDisplayProperty(displayProperty: State['periodicTable']['displayProperty']) {
    return {
        type: 'setDisplayProperty' as 'setDisplayProperty',
        payload: {
            displayProperty,
        }
    }
}

export function setPtZoom(zoom: number) {
    return {
        type: 'setPtZoom' as 'setPtZoom',
        payload: {
            zoom,
        }
    }
}

type ActionFunc = | typeof setTheme
    | typeof setMenuButtonClientRect
    | typeof setEmphasize
    | typeof setColorSign
    | typeof setTrendData
    | typeof setTemperature
    | typeof setDisplayProperty
    | typeof setPtZoom

export type Action = ReturnType<ActionFunc>
