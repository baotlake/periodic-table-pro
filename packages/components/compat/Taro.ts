const PLATFORM = process.env.PLATFORM

export const isTaro =
  PLATFORM == 'weapp' ||
  PLATFORM == 'qq' ||
  PLATFORM == 'alipay' ||
  PLATFORM == 'h5'

let Taro: typeof import('@tarojs/taro') = null!
let components: typeof import('@tarojs/components') = null!

if (process.env.PLATFORM != 'next') {
  Taro = require('@tarojs/taro')
  components = require('@tarojs/components')
}

export { Taro, components }
export default Taro
