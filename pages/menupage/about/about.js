// pages/menupage/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootPath:'../../',
    aboutData:[
    ],
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
    var shareObj = {
      title: '元素周期表Pro',
      desc: '最好用的化学元素周期表，让你感到相见恨晚！',
      path: '/pages/index/index',
      imageUrl: '/pages/data/image/elemimage/Br.jpg',
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    }
    return shareObj
  },
  /**返回 */
  navigationBarBack: function () {
    wx.navigateBack()
  },

})