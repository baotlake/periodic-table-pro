import { useEffect } from 'react'
import { isTaro } from '../../compat'

let useReady = function (callback: () => void) {
    useEffect(callback, [])
}

if (isTaro) {
    const { useReady: useTaroReady } = require('@tarojs/taro')
    useReady = useTaroReady
}

export {
    useReady,
}

export default useReady
