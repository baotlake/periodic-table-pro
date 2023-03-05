import { useEffect } from 'react'
import Taro from '@tarojs/taro'

const PLATFORM = process.env.PLATFORM

export function useInterstitialAd(id: string) {
    useEffect(() => {
        if (PLATFORM == 'weapp' && Taro.createInterstitialAd && id) {
            const ad = Taro.createInterstitialAd({ adUnitId: id })
            ad.onLoad = console.log
            ad.onError = console.error
            ad.onClose = console.log

            if (ad) {
                ad.show().catch(console.error)
            }
        }
    }, [])
}