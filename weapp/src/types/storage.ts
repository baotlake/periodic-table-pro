import { DisplayProperty } from "./element";

export enum StorageKey {
    version = 'version',
    themeMode = 'theme',
    followSystemTheme = 'followSystemTheme',
    displayProperty = 'displayProperty',
    closeAddGuideAt = 'closeAddGuideAt',
    showAddGuideAt = 'showAddGuideAt',
    searchFeature = 'searchFeature',
}

export interface StorageValue {
    version?: number,
    themeMode?: 'light' | 'dark'
    followSystemTheme?: boolean
    displayProperty?: DisplayProperty
    closeAddGuideAt?: number
    showAddGuideAt?: number
    searchFeature?: boolean
}
