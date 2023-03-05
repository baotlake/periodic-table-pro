import Taro from '@tarojs/taro'
import { StorageKey, StorageValue } from '../types/storage'

export const defaultValue: Required<StorageValue> = {
    version: 1,
    themeMode: 'dark',
    followSystemTheme: false,
    displayProperty: 'atomicWeight',

    // --------------------
    closeAddGuideAt: 0,
    showAddGuideAt: 0,
    searchFeature: false,
}

export async function initStorage() {
    const { data: version } = await Taro.getStorage<StorageValue['version']>({
        key: StorageKey.version,
    }).catch(() => ({ data: defaultValue.version }))

    if (!version && defaultValue.version) {
        Taro.setStorage({
            key: StorageKey.version,
            data: defaultValue.version,
        })
    }

    const { data: followSystem } = await Taro.getStorage<StorageValue['followSystemTheme']>({
        key: StorageKey.followSystemTheme,
    }).catch(() => ({ data: defaultValue.followSystemTheme }))

    if (typeof followSystem !== 'boolean' && defaultValue.followSystemTheme) {
        Taro.setStorage({
            key: StorageKey.followSystemTheme,
            data: defaultValue.followSystemTheme,
        })
    }

    const { data: themeMode } = await Taro.getStorage<StorageValue['themeMode']>({
        key: StorageKey.themeMode,
    }).catch(() => ({ data: defaultValue.themeMode }))

    if (!themeMode && defaultValue.themeMode) {
        Taro.setStorage({
            key: StorageKey.themeMode,
            data: defaultValue.themeMode,
        })
    }

    const { data: displayProperty } = await Taro.getStorage<StorageValue['displayProperty']>({
        key: StorageKey.displayProperty,
    }).catch(() => ({ data: defaultValue.displayProperty }))

    if (!displayProperty && defaultValue.displayProperty) {
        Taro.setStorage({
            key: StorageKey.displayProperty,
            data: defaultValue.displayProperty,
        })
    }
}
