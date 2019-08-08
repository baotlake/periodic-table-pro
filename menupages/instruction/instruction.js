// pages/menupage/instruction/instruction.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootPath: '../../',
    tipList:[
      '1:主界面可点击和长按元素!长按元素后可切换元素框底部数据',
      '2:酸碱指示剂界面PH刻度尺可以拖动!',
      '3:希腊字母怎么输？工具栏-希腊字母表，点击对应字母即可复制到剪切板!',
      //'4:更快打开工具栏？上下滑动主屏幕右下角的图标即可！',
      '4:搜索、相对分子质量计算器功能上线，不用记相对分子质量喽！',
      '如有发现错误请联系客服,感谢您的支持！',
      '',
    ],
    systemInfo:null,
    navigationBarData: {
      "full": false,  //wdith满宽，及box-shadow阴影
      "info": [   //控制按钮列表，比如 返回、主页
        {
          "tem": "navigationBack",
        }, {
          "tem": "navigationTitle",
          "data": {
            "title": "使用说明"
          }
        }
      ],
      //"bd": "background-color:#fff;",    //navigationBar的样式
      "color": "white",    //white black,图标及字体的颜色
      "maskStyle": ""
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
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
  navigateToBack: function () {
    wx.navigateBack()
  }
})