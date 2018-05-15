var detail = require('../data/data.js')
var getordail = require('../index/index.js')
var tapelem = "35"
Page({
  data: {
    rootPath: '../',
    hydrogen: '',
    elem: null,
    property:{
      'general':'概述',
      'physical': '物理性质',
      'atomic': '原子性质',
      'history': '历史',
      'miscellanea': '杂项',
    },
  },
  onLoad: function () {
    tapelem = getordail.gettapelem()
    this.setData({
      elem: detail.detaildata(),
    })
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
  
  navigationBarBack: function(){
    wx.navigateBack()
  }

})
