
import { CSSProperties, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import NavigationHeader from "../NavigationBar/NavigationHeader"
import useMenuButtonClientRect from "../../hooks/useMenuButtonClientRect"
import { PermanentDrawer } from '../MenuDrawer'

import './menuPageLayout.scss'


type Props = PropsWithChildren<{
  themeClass?: string
  title?: string
}>

export default function MenuPageLayout({ themeClass, children, title }: Props) {

  const menuRect = useMenuButtonClientRect();

  return (
    <View>
      <NavigationHeader
        themeClass={themeClass}
        title={title}
      />
      <View
        className={classNames('layout', themeClass)}
        style={{
          '--margin-left': menuRect.windowWidth - menuRect.right + 'px',
          '--margin-top': menuRect.bottom + 8 + 'px'
        } as CSSProperties}
      >
        <PermanentDrawer className='layout-drawer' themeClass={themeClass} />
        <View className='layout-main'>
          <View className={classNames('layout-content', themeClass)}>
            {children}
          </View>
        </View>
      </View>
    </View>
  )
}
