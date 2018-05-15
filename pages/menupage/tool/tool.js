//var getdata = request('../pages/data/tooldata.js')
Page({
  data: {
    rootPath: '../../',
    testlist:[
      {
        'name':'溶解性表',
        'url': '../tool/pages/solubility/solubility',
        '': '',
      },{
        'name':'酸碱指示剂',
        'url':'../tool/pages/indicator/indicator'
      }, {
        'name': '希腊字母表',
        'url': '../tool/pages/GreekAlphabet/GreekAlphabet'
      },/*{
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
        'name': '常用单位换算（空）',
        'url': ''
      }, {
        'name': '（空）',
        'url': ''
      },*/
      ]
  },
  onLoad: function () {

  },
  navigationBarBack: function () {
    wx.navigateBack()
  }

})
