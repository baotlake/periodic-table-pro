const dotenv = require("dotenv");

const ENV_SUFFIX = process.env.ENV_SUFFIX || "";

dotenv.config({
  path: ".env" + ENV_SUFFIX,
});

const PLATFORM =
  process.env.TARO_ENV === "miniprogram" ? "weapp" : process.env.TARO_ENV;

const BUCKET_HOST = process.env.BUCKET_HOST || ""

if(!BUCKET_HOST || /^["']/.test(BUCKET_HOST)) {
  throw Error("process.env.BUCKET_HOST is NOT a valid url: `" + BUCKET_HOST + '`')
}


module.exports = {
  env: {
    node_env: '"production"',
    
    PLATFORM: JSON.stringify(PLATFORM),

    ENV_ID: JSON.stringify(process.env.ENV_ID),
    BUCKET_HOST: JSON.stringify(BUCKET_HOST),

    SEARCH_REWARDED_AD: JSON.stringify(process.env.SEARCH_REWARDED_AD),
    DETAIL_CUSTOM_AD: JSON.stringify(process.env.DETAIL_CUSTOM_AD),
    WIKI_INTERSTITIAL_AD: JSON.stringify(process.env.WIKI_INTERSTITIAL_AD),
  },
  defineConstants: {
    
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
