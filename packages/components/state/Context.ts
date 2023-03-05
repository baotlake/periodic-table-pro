import { createContext, Dispatch } from 'react'
import { initialState } from './reducer'
import type { State, Action } from './index'

type Value = {
    state: State
    dispatch: Dispatch<Action> | null
}

export const Context = createContext<Value>({ state: initialState, dispatch: null })