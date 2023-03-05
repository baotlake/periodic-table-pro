import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {
  Context,
  reducer,
  initialState,
  useMenuClientRect,
  useTheme,
  useInitialization,
} from '@periodic-table-pro/components'
import { useReducer } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useTheme(dispatch, state.theme.mode, state.theme.followSystem, state.theme.initialized)
  useMenuClientRect(dispatch)
  useInitialization(dispatch)

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}
