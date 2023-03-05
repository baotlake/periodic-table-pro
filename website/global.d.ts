//// <reference path="../node_modules/@tarojs/plugin-platform-weapp/types/shims-weapp.d.ts" />

declare module '*.png';
declare module '*.gif';
declare module '*.mp4';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
    PLATFORM: ProcessEnv['TARO_ENV'] | 'next'

    ENV_ID: string
    BUCKET_HOST: string

    SEARCH_REWARDED_AD: string
    DETAIL_CUSTOM_AD: string
    WIKI_INTERSTITIAL_AD: string
  }
}

// declare const PLATFORM: typeof process.env.TARO_ENV
// declare const PLATFORM: NodeJS.ProcessEnv['TARO_ENV']

// declare const ENV_ID: string
// declare const BUCKET_HOST: string

// declare const SEARCH_REWARDED_AD: string
// declare const DETAIL_CUSTOM_AD: string
// declare const WIKI_INTERSTITIAL_AD: string
