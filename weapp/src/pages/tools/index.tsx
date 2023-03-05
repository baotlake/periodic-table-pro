import Taro from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import classNames from 'classnames'
import {
  Context,
  MenuPageLayout,
} from '@periodic-table-pro/components'
import { useContext } from 'react'

import solubilitySvg from '../../assets/illus/solubility.svg'
import wikiSvg from '../../assets/illus/wiki.svg'

import './index.scss'


export default function ToolsPage() {

  const { state: { theme: { mode: theme } } } = useContext(Context)

  return (
    <View className={classNames('tools-page', theme)}>
      <MenuPageLayout
        themeClass={theme}
        title='工具栏'
      >
        <View className='content'>
          <View
            className='item-box'
            onClick={() => Taro.navigateTo({ url: '/pages/solubility-table/index' })}
          >
            <Image className='illus' mode="aspectFit" src={solubilitySvg}></Image>
            <View className='title'>溶解性表</View>
          </View>

          <View
            className='item-box'
            onClick={() => Taro.navigateTo({ url: '/pages/elements-cyclopedia/index' })}
          >
            <Image className='illus' mode="aspectFit" src={wikiSvg}></Image>
            <View className='title'>元素百科</View>
          </View>

          {/* <View className='section'>
            <Button style={{ marginRight: '10px' }} size='mini' openType='feedback'>反馈</Button>
            <Button style={{ marginRight: '10px' }} size='mini' openType='contact'>客服</Button>
            <Button style={{ marginRight: '10px' }} size='mini' openType='share'>分享</Button>
          </View> */}
        </View>
      </MenuPageLayout>
    </View>
  )
}
