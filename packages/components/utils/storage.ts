import { getStorage as get, setStorage as set } from '../compat'
import { DisplayProperty } from '@packages/data'
import { ThemeMode } from '../type'

export const defaultValue = {
  version: 1,
  themeMode: 'dark' as ThemeMode,
  followSystemTheme: false,
  displayProperty: 'atomicWeight' as DisplayProperty,
  periodicTableZoom: 1,

  // --------------------
  closeAddGuideAt: 0,
  showAddGuideAt: 0,
  searchFeature: false,
}

export type StorageValue = typeof defaultValue
export type StorageKey = keyof typeof defaultValue

export async function setStorage(data: Partial<StorageValue>) {
  set(data)
}

export async function getStorage(key: StorageKey): Promise<StorageValue> {
  return get({ [key]: defaultValue[key] }) as Promise<StorageValue>
}
