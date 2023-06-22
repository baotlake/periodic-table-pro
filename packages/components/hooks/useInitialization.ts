import { useEffect } from 'react'
import { getStorage } from '../utils/storage'
import { getTrendData } from '../utils/trend'
import { maxPtZoom, minPtZoom } from '../config'
import { useSetRecoilState } from 'recoil'
import {
  periodicTableDisplayProperty,
  periodicTableTrendData,
  periodicTableZoom,
} from '../recoil/atom'

export function useInitialization() {
  const setDisplayProperty = useSetRecoilState(periodicTableDisplayProperty)
  const setTrendData = useSetRecoilState(periodicTableTrendData)
  const setZoom = useSetRecoilState(periodicTableZoom)

  useEffect(() => {
    Promise.all([
      getStorage('displayProperty'),
      getStorage('periodicTableZoom'),
    ]).then(([v1, v2]) => {
      let { displayProperty, periodicTableZoom } = { ...v1, ...v2 }

      console.log('periodicTableZoom', periodicTableZoom)
      if (!(periodicTableZoom > minPtZoom && periodicTableZoom < maxPtZoom)) {
        periodicTableZoom = 1
      }

      setDisplayProperty(displayProperty)
      const trendData = getTrendData(displayProperty)
      setTrendData(trendData)
      setZoom(periodicTableZoom)
    })
  }, [])
}
