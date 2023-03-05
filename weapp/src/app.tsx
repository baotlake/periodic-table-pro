import Taro from '@tarojs/taro'
import { useEffect, useReducer } from 'react'
// import { initStorage } from './utils/storage'
import {
  Context as ComponentsContext,
  initialState as componentsInitialState,
  reducer as componentsReducer,
  useMenuClientRect,
  useTheme,
} from '@periodic-table-pro/components'

import './app.scss'

const PLATFORM = process.env.PLATFORM
const ENV_ID = process.env.ENV_ID

export default function App(props) {

  const [state, dispatch] = useReducer(componentsReducer, componentsInitialState)
  useTheme(dispatch, state.theme.mode, state.theme.followSystem, state.theme.initialized)
  useMenuClientRect(dispatch)

  useEffect(() => {
    if (PLATFORM == 'weapp' && ENV_ID) {
      Taro.cloud.init({
        env: ENV_ID,
      })
    }
  }, [])

  return (
    <ComponentsContext.Provider value={{ state: state, dispatch: dispatch }}>
        {props.children}
    </ComponentsContext.Provider>
  )
}
