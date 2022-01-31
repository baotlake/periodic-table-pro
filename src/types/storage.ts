import { DisplayProperty } from "./periodicTable";

export enum StorageKey {
    version = 'version',
    themeMode = 'theme',
    followSystemTheme = 'followSystemTheme',
    displayProperty = 'displayProperty',
    closeAddGuideAt = 'closeAddGuideAt',
}

export interface StorageValue {
    version: number,
    themeMode: 'light' | 'dark'
    followSystemTheme: boolean
    displayProperty: DisplayProperty
    closeAddGuideAt: number
}