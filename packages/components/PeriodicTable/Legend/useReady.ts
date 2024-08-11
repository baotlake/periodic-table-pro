import { useEffect } from 'react'
import { isTaro, Taro } from '../../compat'

let useReady = function (callback: () => void) {
  useEffect(callback, [])
}

if (isTaro) {
  const { useReady: useTaroReady } = Taro
  useReady = useTaroReady
}

export { useReady }

export default useReady
