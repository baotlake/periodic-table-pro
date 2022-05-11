import classNames from "classnames"
import { View, Image, Button } from "@tarojs/components"

import { useEffect, useRef, useState } from "react"
import { StorageKey } from "types/storage"
import Taro, { RewardedVideoAd } from "@tarojs/taro"

import lockSvg from '../../assets/icons/lock.svg'
import './index.scss'

type Props = {
    themeClass?: string
    featureKey: StorageKey
}

export function PremiumFeatureGuard({ themeClass, featureKey }: Props) {
    const dataRef = useRef({
        ad: null as RewardedVideoAd | null,
    })
    const [unlock, setUnlock] = useState(true)
    const [visible, setVisible] = useState(false)
    const [countdown, setCountdown] = useState(3)

    useEffect(() => {
        let mount = true
        const searchFeature = Taro.getStorageSync<boolean>(featureKey) ?? false
        let ad: RewardedVideoAd | null = null
        const weaap = process.env.TARO_ENV === 'weapp'

        // setUnlock(false)
        // setVisible(true)

        if (weaap && !searchFeature) {
            setUnlock(false)
            ad = Taro.createRewardedVideoAd({
                adUnitId: SEARCH_REWARDED_AD,
            })
            dataRef.current.ad = ad
            ad.onError((res) => {
                console.log(res)
            })
            ad.onClose((res) => {
                console.log('onClose', res)
                if (res.isEnded) {
                    Taro.setStorageSync(featureKey, true)
                    mount && setUnlock(true)
                }
                mount && setVisible(false)
            })
            ad.onLoad((res) => {
                console.log(res)
                mount && setVisible(true)
            })
            ad.load()
        }

        return () => {
            mount = false
            if (ad) {
                ad.destroy()
            }
        }
    }, [])

    useEffect(() => {
        let fresh = true
        if (countdown > 0) {
            setTimeout(() => {
                fresh && setCountdown(countdown - 1)
            }, 1000)
        }

        return () => {
            fresh = false
        }
    }, [countdown])

    const unlockFeature = async () => {
        const { ad } = dataRef.current
        if (ad) {
            ad.show()
        }
    }

    return (
        <View
            className={classNames("premium-feature-guard",
                themeClass,
                {
                    unlock: unlock,
                }
            )}
        >
            <View
                className="alert-bar"
                onClick={unlockFeature}
            >
                <Image
                    className="icon"
                    src={lockSvg}
                />
                点击观看视频，免费在该设备解锁搜索功能
            </View>

            <View
                className={classNames("dialog-backdrop", {
                    visible: visible,
                })}
            >
                <View className="dialog">
                    <View className="content">
                        观看视频短片，即可免费在该设备上解锁搜索功能。
                    </View>
                    <View className="button-group">
                        <View
                            className={classNames("button", {
                                disable: countdown > 0,
                            })}
                            onClick={() => countdown <= 0 && setVisible(false)}
                        >跳过({countdown})</View>
                        <View
                            className="button"
                            onClick={unlockFeature}
                        >解锁</View>
                    </View>

                    <View className="share">
                        <Button
                            className="button"
                            type="primary"
                            openType="share"
                            onClick={() => setVisible(false)}
                        >
                            分享
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}