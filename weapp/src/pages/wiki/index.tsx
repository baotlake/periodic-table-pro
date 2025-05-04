import { useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import useShareMessage from '../../hooks/useShareMessage'
import { NavigationHeader, Article } from '@packages/components'
import { WikiData, getSkeletonWikiData } from '@packages/data'
import { useInterstitialAd } from '../../hooks'
import { useAtom } from 'jotai'
import { STATIC_BASE, themeModeState } from '@packages/components'
import '@packages/components/wiki.scss'
import './index.scss'

const PLATFORM = process.env.PLATFORM
const WIKI_INTERSTITIAL_AD = process.env.WIKI_INTERSTITIAL_AD

export default function Wiki() {
  const router = useRouter()
  const [atomicNumber, setAtomicNumber] = useState(0)
  const [data, setData] = useState<WikiData | null>(null)
  // const [theme,] = useThemeMode()
  const [theme] = useAtom(themeModeState)
  const [loading, setLoading] = useState(false)
  useShareMessage({
    path: '/pages/wiki/index?Z=' + router.params.Z,
    posterImage: false,
  })
  useInterstitialAd(WIKI_INTERSTITIAL_AD)

  useEffect(() => {
    let Z = parseInt(router.params.Z || '1')
    if (!isFinite(Z)) Z = 1
    setAtomicNumber(Z)
  }, [router])

  useEffect(() => {
    const Z = atomicNumber
    const weapp = ['weapp'].includes(PLATFORM)

    if (weapp && false) {
      const db = Taro.cloud.database()
      db.collection('wiki')
        .where({ _id: Z + '' })
        .get()
        .then((result) => {
          console.log(result.data)
          if (result.data) {
            setData(result.data[0] as any)
          }
        })
    }

    if (Z > 0 && true) {
      const url = STATIC_BASE + '/json/wiki/' + Z + '.json'
      setData(getSkeletonWikiData(Z))
      setLoading(true)
      Taro.request({
        url: url,
        success: function (res) {
          console.log(res.data)
          setData(res.data)
          setLoading(false)
        },
      })
    }
  }, [atomicNumber])

  useEffect(() => {
    let Z = parseInt(router.params.Z || '1')
    if (!isFinite(Z)) Z = 1

    const handleKeyup = (e: KeyboardEvent) => {
      console.log(e)
      let step = 1
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          step = 1
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          step = -1
          break
      }

      Taro.redirectTo({
        url: '/pages/wiki/index?Z=' + (Z + step),
      })
      setAtomicNumber(Z)
    }

    if (PLATFORM === 'h5') {
      window.addEventListener('keyup', handleKeyup)
    }

    return () => {
      if (PLATFORM === 'h5') {
        window.removeEventListener('keyup', handleKeyup)
      }
    }
  }, [])

  return (
    <View className={classNames('wiki-page', theme)}>
      <NavigationHeader />

      <Article
        atomicNumber={atomicNumber}
        loading={loading}
        heading={data?.heading}
        tagline={data?.tagline}
        data={data}
      />
    </View>
  )
}
