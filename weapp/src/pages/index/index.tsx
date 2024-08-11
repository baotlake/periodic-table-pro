import { View, MovableArea, MovableView } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import classNames from 'classnames'
import { reportEvent } from '../../utils/analytics'

import {
  BottomNavigation,
  ZoomablePT,
  PanPinch,
  PeriodicTable,
  AddGuide,
  MenuHomeLayout,
  CustomWrapper,
  AutoDisplayPropertiesModal,
  AutoZoomModal,
  usePageMeta,
} from '@periodic-table-pro/components'
import { useShareMessage } from '../../hooks'
import { useAtom } from 'jotai'
import {
  periodicTableZoom,
  themeModeState,
} from '@periodic-table-pro/components/recoil/atom'
import './index.scss'

export default function Index() {
  const [theme] = useAtom(themeModeState)
  const [zoom] = useAtom(periodicTableZoom)

  usePageMeta()
  useShareMessage()

  return (
    <View className={classNames('index page', theme)}>
      <MenuHomeLayout className={theme}>
        <AddGuide themeClass={theme} />
        {/* <ZoomablePT /> */}
        <PanPinch value={zoom} min={0.5} max={6} className={theme}>
          <CustomWrapper>
            <PeriodicTable />
          </CustomWrapper>
        </PanPinch>

        <BottomNavigation className={theme} />

        <AutoDisplayPropertiesModal />
        <AutoZoomModal />
      </MenuHomeLayout>
    </View>
  )
}
