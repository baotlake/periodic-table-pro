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
import { useRecoilState } from 'recoil'
import {
  periodicTableZoom,
  themeModeState,
} from '@periodic-table-pro/components/recoil/atom'
import './index.scss'

export default function Index() {
  const [theme] = useRecoilState(themeModeState)
  const [zoom] = useRecoilState(periodicTableZoom)

  usePageMeta()
  useShareMessage()

  return (
    <View className={classNames('index page', theme)}>
      <MenuHomeLayout themeClass={theme}>
        <AddGuide themeClass={theme} />
        {/* <ZoomablePT /> */}
        <PanPinch value={zoom} min={0.5} max={6} themeClass={theme}>
          <CustomWrapper>
            <PeriodicTable />
          </CustomWrapper>
        </PanPinch>

        <BottomNavigation themeClass={theme} />

        <AutoDisplayPropertiesModal />
        <AutoZoomModal />
      </MenuHomeLayout>
    </View>
  )
}
