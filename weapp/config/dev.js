const dotenv = require("dotenv");

const ENV_SUFFIX = process.env.ENV_SUFFIX || "";

console.log("ENV_SUFFIX: ", ENV_SUFFIX + "");

dotenv.config({
  path: ".env" + ENV_SUFFIX,
});

const PLATFORM =
  process.env.TARO_ENV === "miniprogram" ? "weapp" : process.env.TARO_ENV;

module.exports = {
  env: {
    node_env: '"development"',
    
    PLATFORM: JSON.stringify(PLATFORM),

    ENV_ID: JSON.stringify(process.env.ENV_ID),
    BUCKET_HOST: JSON.stringify(process.env.BUCKET_HOST),

    SEARCH_REWARDED_AD: JSON.stringify(process.env.SEARCH_REWARDED_AD),
    DETAIL_CUSTOM_AD: JSON.stringify(process.env.DETAIL_CUSTOM_AD),
    WIKI_INTERSTITIAL_AD: JSON.stringify(process.env.WIKI_INTERSTITIAL_AD),
  },
  defineConstants: {

  },
  plugins: [
    // '@tarojs/plugin-react-devtools'
  ],
  mini: {},
  h5: {},
};
