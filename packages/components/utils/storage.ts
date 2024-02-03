import { getStorage as get, setStorage as set } from '../compat'
import { DisplayProperty } from '@periodic-table-pro/data'

export const defaultValue = {
    version: 1,
    themeMode: 'dark',
    followSystemTheme: false,
    displayProperty: 'atomicWeight' as DisplayProperty,
    periodicTableZoom: 1,

    // --------------------
    closeAddGuideAt: 0,
    showAddGuideAt: 0,
    searchFeature: false,
} as const

export type StorageValue = typeof defaultValue
export type StorageKey = keyof typeof defaultValue

export async function setStorage(data: Partial<StorageValue>) {
    set(data)
}

export async function getStorage(key: StorageKey): Promise<StorageValue> {
    return get({ [key]: defaultValue[key] }) as Promise<StorageValue>
}
