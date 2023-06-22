import { useRecoilState } from 'recoil'
import { themeModeState } from '../recoil/atom'
import { useEffect } from 'react'
import { Taro } from '../compat'

const PLATFORM = process.env.PLATFORM

export function usePageMeta() {
  const [mode] = useRecoilState(themeModeState)

  useEffect(() => {
    if (PLATFORM == 'weapp') {
      const bgColor = mode == 'dark' ? '#272829' : '#FFFFFF'
      Taro.setBackgroundColor?.({
        backgroundColor: bgColor,
      })
      Taro.setBackgroundTextStyle?.({
        textStyle: mode,
      })
    }
  }, [mode])
}
