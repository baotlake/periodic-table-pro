import type { State } from './reducer'
import type { MenuButtonClientRect } from '../types/other'


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

export type Action =
    | ReturnType<typeof setTheme>
    | ReturnType<typeof setMenuButtonClientRect>