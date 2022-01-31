import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import classNames from 'classnames'
import useThemeMode from '../../hooks/useThemeMode'
import { MenuPageLayout } from '../../components/Layout'

import './index.scss'


export default function ToolsPage() {

  const [theme] = useThemeMode()

  return (
    <View className={classNames('tools-page', theme)}>
      <MenuPageLayout
        themeClass={theme}
        title='工具栏'
      >
        <View className='content'>
          <Button
            onClick={() => Taro.navigateTo({ url: '/pages/solubility-table/index' })}
          >溶解性表</Button>
          <View className='section'>
            更多新版「元素周期表PRO」工具栏正在设计开发中...
          </View>
          <View className='section'>
            想要什么工具，或者有任何建议，欢迎您随时告诉我们。
          </View>
          <View className='section'>
            建议或反馈请点击下方任一按钮
          </View>
          <View className='section' style={{ textAlign: 'center' }}>
            <Button style={{ margin: 'auto 10px' }} size='mini' openType='feedback'>反馈</Button>
            <Button style={{ margin: 'auto 10px' }} size='mini' openType='contact'>客服</Button>
          </View>
        </View>
      </MenuPageLayout>
    </View>
  )
}
