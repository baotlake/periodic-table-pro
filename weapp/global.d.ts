//// <reference path="../node_modules/@tarojs/plugin-platform-weapp/types/shims-weapp.d.ts" />

declare module '*.png'
declare module '*.gif'
declare module '*.mp4'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq'
      | 'jd'
      | 'miniprogram'
    readonly NODE_ENV: 'development' | 'production'
    PLATFORM: ProcessEnv['TARO_ENV'] | 'next'

    ENV_ID: string
    STATIC_BASE: string

    SEARCH_REWARDED_AD: string
    DETAIL_CUSTOM_AD: string
    WIKI_INTERSTITIAL_AD: string

    AD_DETAIL_LIGHT_ID: string
    AD_DETAIL_DARK_ID: string
    AD_WIKI_VIDEO_ID: string
  }
}
