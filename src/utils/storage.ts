import Taro from '@tarojs/taro'
import { StorageKey, StorageValue } from '../types/storage'

export function initStorage() {
    const version = Taro.getStorageSync<StorageValue['version']>(StorageKey.version)
    if (!version) {
        Taro.setStorageSync(StorageKey.version, 1)
    }
    if (Taro.getStorageSync(StorageKey.followSystemTheme) === '') {
        Taro.setStorageSync(StorageKey.followSystemTheme, true)
    }
    if (Taro.getStorageSync(StorageKey.displayProperty) === '') {
        Taro.setStorageSync(StorageKey.displayProperty, 'atomicWeight')
    }
}
