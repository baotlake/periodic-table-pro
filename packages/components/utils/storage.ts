import { Taro, isTaro } from "../compat"
import { DisplayProperty } from "@periodic-table-pro/data"


export const defaultValue = {
    version: 1,
    themeMode: 'dark',
    followSystemTheme: false,
    displayProperty: 'atomicWeight' as DisplayProperty,

    // --------------------
    closeAddGuideAt: 0,
    showAddGuideAt: 0,
    searchFeature: false,
}

export type StorageValue = typeof defaultValue
export type StorageKey = keyof typeof defaultValue


export async function setStorage(data: Partial<StorageValue>) {
    for (let [key, value] of Object.entries(data)) {
        if (isTaro) {
            Taro.setStorage({
                key: key,
                data: value,
            })
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }
}

export async function getStorage(key: StorageKey): Promise<StorageValue> {
    if (isTaro) {
        const data = Taro.getStorageSync(key)
        console.log('getStorage >> ', key, data, typeof data)
        const value = data || defaultValue[key]
        return { [key]: value } as StorageValue
    } else {
        try {
            const txt = localStorage.getItem(key)
            const value = JSON.parse(txt || 'null') ?? defaultValue[key]
            return { [key]: value } as StorageValue
        } catch (error) {
            console.error(error)
            return { [key]: defaultValue[key] } as StorageValue
        }
    }
}
