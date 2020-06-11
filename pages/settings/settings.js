// pages/settings/settings.js
const app = getApp()

var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo:null,
    themeList:[
      {
        svgName:'theme-dark',
        name:'default-dark',
      },{
        svgName:'theme-light',
        name:'default-light',
      },
      // {
      //   svgName:'',
      //   name:'a',
      // },
    ],
    currentTheme:'0',
    theme:'ui-w',
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

    // 初始化currentTheme
    let appTheme = app.globalData.theme;
    let currentTheme = this.data.themeList.findIndex((i)=>i.name == appTheme);
    if(currentTheme == -1) currentTheme = 0;
    
    this.setData({
      currentTheme:currentTheme
    })
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
  
  handleTapTheme(e){
    var index = e.currentTarget.dataset.index;
    if(typeof(index) != 'number') return;
    var appTheme = this.data.themeList[index] && this.data.themeList[index].name;
    if(!appTheme) return;
    // console.log('theme, ', index,appTheme,e);
    app.globalData.theme = appTheme;
    wx.setStorageSync('theme',appTheme);
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
      currentTheme:index,
      theme:theme
    })

  },

  refreshPage:function(){
    // 刷新页面
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
      theme:theme,
    })
  },
  
})