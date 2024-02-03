import Taro from '@tarojs/taro'
import { useEffect } from 'react'
// import { initStorage } from './utils/storage'
import { Initialization } from '@periodic-table-pro/components'

import './app.scss'

const PLATFORM = process.env.PLATFORM
const ENV_ID = process.env.ENV_ID

export default function App(props) {
  useEffect(() => {
    if (PLATFORM == 'weapp' && ENV_ID) {
      Taro.cloud?.init({
        env: ENV_ID,
      })
    }
  }, [])

  return (
    <>
      <Initialization />
      {props.children}
    </>
  )
}
