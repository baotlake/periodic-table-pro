const PLATFORM = process.env.PLATFORM

export default {
  pages: [
    "pages/index/index",
    "pages/detail/index",
    "pages/wiki/index",
    "pages/feedback/index",
    "pages/guide/index",
    "pages/like/index",
    "pages/about/index",
    "pages/tools/index",
    "pages/elements-cyclopedia/index",
    "pages/solubility-table/index",
    "pages/setting/index",
    "pages/search/index",
    "pages/pH-indicator/index",
    "pages/greek-alphabet/index",
    "pages/conversion-of-units/index",
  ],
  window: {
    backgroundTextStyle: "light",
    // navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: 'WeChat',
    // navigationBarTextStyle: 'black',
    navigationStyle: "custom",
    pageOrientation: "auto",
    ...(PLATFORM === 'alipay' ? {
      defaultTitle: ' ',
      transparentTitle: 'always',
      titlePenetrate: 'YES',
    } : {})
  },
  plugins: {},
  resizable: true,
  cloud: true,
  darkmode: true,
  // sitemapLocation: "sitemap.json",
  // navigateToMiniProgramAppIdList: ["wx16b955041265aaf5"]

  // h5 
  "animation": false,
};

