'use client'

import classNames from 'classnames/bind'
import { Image, Button } from '../compat'
import { Taro } from '../compat'
import { useEffect, useRef, useState } from 'react'
import { StorageKey } from '../utils/storage'
import type { RewardedVideoAd } from '@tarojs/taro'
import { getStorage } from '../utils/storage'
// import type * as L from 'lodash-es'

import lockSvg from '../assets/icons/lock.svg'
import styles from './index.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM
const SEARCH_REWARDED_AD = process.env.SEARCH_REWARDED_AD

type Props = {
  themeClass?: string
  featureKey: StorageKey
//   a?: L
}

export function PremiumFeatureGuard({ themeClass, featureKey }: Props) {
  const dataRef = useRef({
    ad: null as RewardedVideoAd | null,
  })
  const [unlock, setUnlock] = useState(true)
  const [visible, setVisible] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let mount = true
    const searchFeature = Taro.getStorageSync<boolean>(featureKey) ?? false
    let ad: RewardedVideoAd | null = null
    const weaap = PLATFORM === 'weapp'

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
    <div
      className={cx('premium-feature-guard', themeClass, {
        unlock: unlock,
      })}
    >
      <div className={cx('alert-bar')} onClick={unlockFeature}>
        <Image className={cx('icon')} src={lockSvg} />
        点击观看视频，免费在该设备解锁搜索功能
      </div>

      <div
        className={cx('dialog-backdrop', {
          visible: visible,
        })}
      >
        <div className={cx('dialog')}>
          <div className={cx('content')}>
            观看视频短片，即可免费在该设备上解锁搜索功能。
          </div>
          <div className={cx('button-group')}>
            <div
              className={cx('button', {
                disable: countdown > 0,
              })}
              onClick={() => countdown <= 0 && setVisible(false)}
            >
              跳过({countdown})
            </div>
            <div className={cx('button')} onClick={unlockFeature}>
              解锁
            </div>
          </div>

          <div className={cx('share')}>
            <Button
              className={cx('button')}
              type="primary"
              openType="share"
              onClick={() => setVisible(false)}
            >
              分享
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumFeatureGuard
