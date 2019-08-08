// pages/settings/settings.js
const app = getApp()

var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo:null,
    navigationBarData: {
      "full": true,  //wdith满宽，及box-shadow阴影
      "info": [   //控制按钮列表，比如 返回、主页
        {
          "tem": "navigationBack",
          "data": {
            'icon_w': '../../data/image/icon/back_w.png',
            'icon_b':'../../data/image/icon/back.png',
            'style': '',
            'key': 'icon_b'
          }
        },{
          "tem":"navigationTitle",
          "data":{
            "title":"设置"
          }
        }
      ],
      //"bd": "background-color:#fff;",    //navigationBar的样式
      "commonIcon": "icon_b",   //white black,图标及字体的颜色
      "maskStyle": "",
    },
    pageInfo:{
      "item":[
        {
          "title":"白色主题",
          "tem":"switch",
          "function":"themeSet",
          "data":{
            "value":true,
            "theme":"black"
          }
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      systemInfo: app.globalData.systemInfo,
    })
    // console.log(app.globalData.systemInfo)

    this.refreshPage()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refreshPage()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  navigateToBack: function () {
    wx.navigateBack()
  },
  
  themeSet(e){
    // 设置app主题
    console.log(e)
    if (app.globalData.appSet['theme'] == 'white'){
      // 白色主题
      app.globalData.appSet['theme'] = 'dark'
    }else{
      // 深色主题
      app.globalData.appSet['theme'] = 'white'
      console.log(app.globalData.appSet)
    }
    wx.setStorage({
      'key':'appSet',
      'data':app.globalData.appSet
    })
  },
  refreshPage:function(){
    // 刷新页面
    var isWhiteTheme = 'pageInfo.item[0].data.value'
    this.setData({
      [isWhiteTheme]: app.globalData.appSet['theme'] == 'white'
    })
    // console.log(this.data.pageInfo.item[0].data)
    // console.log(app.globalData.appSet['theme'] == 'white')
  }
})