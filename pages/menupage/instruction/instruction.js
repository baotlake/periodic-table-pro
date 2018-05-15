// pages/menupage/instruction/instruction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootPath: '../../',
    tipList:[
      'Tips1:主界面可点击和长按元素!',
      'Tips2:酸碱指示剂界面PH刻度尺可以拖动!',
      'Tips3:希腊字母怎么输？工具栏-希腊字母表，点击对应字母即可复制到剪切板!',
      'Tips4:更快打开工具栏？上下滑动主屏幕右下角的图标即可！',
      'Tips5:搜索、相对分子质量计算器功能上线，不用记相对分子质量喽！',
      '如有发现错误请联系客服,感谢您的支持！',
      '',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  navigationBarBack: function () {
    wx.navigateBack()
  }
})