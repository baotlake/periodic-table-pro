'use client'

import { DisplayPropertiesModal } from '../Modal'
import { DisplayProperty } from '@periodic-table-pro/data'
import { getTrendData } from '../utils/trend'
import { setStorage } from '../utils/storage'
import { reportEvent } from '../utils/analytics'
import { useAtom, useSetAtom } from 'jotai'
import {
  displayPropertiesModalVisible,
  periodicTableColorSign,
  periodicTableDisplayProperty,
  periodicTableTrendData,
  themeModeState,
} from '../recoil/atom'

export function AutoDisplayPropertiesModal() {
  const [mode] = useAtom(themeModeState)
  const [visible, setVisible] = useAtom(displayPropertiesModalVisible)
  const [displayProperty, setDisplayProperty] = useAtom(
    periodicTableDisplayProperty
  )
  const [colorSign] = useAtom(periodicTableColorSign)
  const setTrendData = useSetAtom(periodicTableTrendData)

  const handleSelectDisplayProperty = (type: DisplayProperty) => {
    setDisplayProperty(type)
    const trendData = getTrendData(type)
    setTrendData(trendData)

    setStorage({ displayProperty: type })
    reportEvent('properties', {
      name: type,
      page: 'index',
    })
  }

  const handleSetVisible = (visible: boolean) => {
    setVisible(visible)
  }

  return (
    <DisplayPropertiesModal
      className={mode}
      visible={visible}
      setVisible={handleSetVisible}
      displayProperty={displayProperty}
      colorSign={colorSign}
      onSelect={handleSelectDisplayProperty}
    />
  )
}
