import dotenv from 'dotenv'
import type { UserConfigExport } from '@tarojs/cli'

const ENV_SUFFIX = process.env.ENV_SUFFIX || ''

console.log('ENV_SUFFIX: ', ENV_SUFFIX + '')

dotenv.config({
  path: '.env' + ENV_SUFFIX,
})

const PLATFORM =
  process.env.TARO_ENV === 'miniprogram' ? 'weapp' : process.env.TARO_ENV

const STATIC_BASE = process.env.STATIC_BASE || ''

export default {
  env: {
    node_env: '"development"',

    PLATFORM: JSON.stringify(PLATFORM),

    ENV_ID: JSON.stringify(process.env.ENV_ID),
    STATIC_BASE: JSON.stringify(STATIC_BASE),
    BUCKET_HOST: JSON.stringify(process.env.BUCKET_HOST),
    APP_ORIGIN: JSON.stringify(process.env.APP_ORIGIN),
    DEEP_READING_ORIGIN: JSON.stringify(process.env.DEEP_READING_ORIGIN),

    SEARCH_REWARDED_AD: JSON.stringify(process.env.SEARCH_REWARDED_AD),
    DETAIL_CUSTOM_AD: JSON.stringify(process.env.DETAIL_CUSTOM_AD),
    WIKI_INTERSTITIAL_AD: JSON.stringify(process.env.WIKI_INTERSTITIAL_AD),

    AD_DETAIL_LIGHT_ID: JSON.stringify(process.env.AD_DETAIL_LIGHT_ID),
    AD_DETAIL_DARK_ID: JSON.stringify(process.env.AD_DETAIL_DARK_ID),
    AD_WIKI_VIDEO_ID: JSON.stringify(process.env.AD_WIKI_VIDEO_ID),
  },
  defineConstants: {},
  plugins: [
    // '@tarojs/plugin-react-devtools'
  ],
  mini: {},
  h5: {},
} satisfies UserConfigExport
