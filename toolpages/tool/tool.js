//var getdata = request('../pages/data/tooldata.js')
const app = getApp()

Page({
  data: {
    rootPath: '../../',
    systemInfo:null,
    testlist:[
      {
        'name':'溶解性表',
        'url': '../solubility/solubility',
        '': '',
      },{
        'name':'酸碱指示剂',
        'url':'../indicator/indicator'
      },{
        'name': '希腊字母表',
        'url': '../GreekAlphabet/GreekAlphabet'
      },{
        'name': '单位换算（测试）',
        'url': '../UnitConversion/UnitConversion'
      },/*{
        'name': '数据统计',
        'url': '../statistics/statistics'
      },{
        'name': '正在开发功能（空）',
        'url': '../../pages/explain/explain'
      },{
        'name':'更多功能在来的路上，赞赏加速',
        'url':'../reward/reward'
      },{
        'name': '国际单位制',
        'url': '../tool/pages/si/si'
      }, {
        'name': '常见混合物（空）',
        'url': ''
      }, {
        'name': '一般伤害处理（空）',
        'url': ''
      }, {
        'name': '基本常数（空）',
        'url': ''
      }, {
        'name': '（空）',
        'url': ''
      },*/
      ],
    theme:'ui',

  },
  onLoad: function () {
    let appTheme = app.globalData.theme;
    let theme = '';
    switch (appTheme){
      case "default-light":
        theme = 'ui-w';
        break;
      case "default-dark":
      default:
        theme = 'ui';
        break;
    }
    this.setData({
      systemInfo: app.globalData.systemInfo,
      theme:theme
    })

    // 插屏广告
    // 在页面中定义插屏广告
    let interstitialAd = null
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-b307ea08b3ed39ce'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },
  navigateToBack: function () {
    wx.navigateBack()
  }

})
