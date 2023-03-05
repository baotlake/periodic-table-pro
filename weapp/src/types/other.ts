import type Taro from '@tarojs/taro'

export type MenuButtonClientRect = ReturnType<typeof Taro.getMenuButtonBoundingClientRect> & {
    windowWidth: number
    windowHeight: number
}

