import { defaultValue } from '../utils/storage'
import type { Action } from './actions'

export const initialState = {
    theme: {
        mode: defaultValue.themeMode,
        followSystem: defaultValue.followSystemTheme,
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
}

export type State = typeof initialState

export function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'setTheme':
            return { ...state, theme: { ...state.theme, ...action.payload } }
        case 'setMenuButtonClientRect':
            return { ...state, menuButtonClientRect: { ...state.menuButtonClientRect, ...action.payload } }
        default:
            return { ...state }
    }
}