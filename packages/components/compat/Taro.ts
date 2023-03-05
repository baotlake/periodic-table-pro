import type * as TaroNS from '@tarojs/taro'

const PLATFORM = process.env.PLATFORM

export const isTaro = PLATFORM == 'weapp'
    || PLATFORM == 'qq'
    || PLATFORM == 'alipay'
    || PLATFORM == 'h5'

let Taro: typeof TaroNS = null as any

if (isTaro) {
    Taro = require('@tarojs/taro')
}

export {
    Taro,
}

export default Taro