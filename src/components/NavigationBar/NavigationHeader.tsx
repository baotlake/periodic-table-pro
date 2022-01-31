import { CSSProperties, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from "@tarojs/components";
import classNames from "classnames";
import NavigationBar from "./NavigationBar";

import './navigationHeader.scss'


type Props = PropsWithChildren<{
  themeClass?: string
  title?: string
  className?: string
  color?: string
}>

export default function NavigationHeader({ themeClass, title, children, className, color }: Props) {

  const handleBack = () => {
    Taro.navigateBack().catch(() => {
      Taro.navigateTo({
        url: '/pages/index/index',
      })
    })
  }

  const backHome = () => {
    // console.log('back home')
    Taro.navigateTo({
      url: '/pages/index/index',
    })
  }

  return (
    <NavigationBar
      className={classNames("nav-header", themeClass, className)}
    >
      <View
        className='header-wrapper'
        style={{
          ...(color ? { "--color": color } : {})
        } as CSSProperties}
      >
        <Button
          className='nav-back-btn'
          onClick={handleBack}
          onLongPress={backHome}
          onLongClick={backHome}
        />
        <Text>{title}</Text>
        {children}
      </View>
    </NavigationBar>
  )
}
