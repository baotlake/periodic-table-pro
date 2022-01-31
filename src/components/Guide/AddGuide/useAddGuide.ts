import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { StorageKey } from '../../../types/storage'

export default function useAddGuide(): [boolean, () => void] {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let mount = true
        const closedAt = Taro.getStorageSync<number | undefined>(StorageKey.closeAddGuideAt) || 0
        const now = Date.now()
        const days21 = 1000 * 60 * 60 * 24 * 21
        const weapp = process.env.TARO_ENV === 'weapp'
            || process.env.NODE_ENV === 'development'

        if (now - closedAt > days21 && weapp) {
            setTimeout(() => {
                mount && setVisible(true)
            }, 1000 * 6)
            // 18 seconds
            setTimeout(() => {
                mount && setVisible(false)
            }, 1000 * 24)
        }

        return () => {
            mount = false
        }
    }, [])

    const handleClose = () => {
        setVisible(false)
        Taro.setStorageSync(StorageKey.closeAddGuideAt, Date.now())
    }

    return [visible, handleClose]
}