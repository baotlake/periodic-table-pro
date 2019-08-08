const app = getApp()

Page({
  data:{
    rootPath: '../../',
    customExplain:"无论是您在这个小程序里发现了错误，还是您对这个小程序的某些方面不满意，您都可以通过客服反馈给开发者。如果您觉得这个小程序很好，你可以考虑赞赏开发者。希望元素周期表Pro能给您带来更优质的使用体验。",
    systemInfo:null,
    navigationBarData: {
      "full": false,  //wdith满宽，及box-shadow阴影
      "info": [   //控制按钮列表，比如 返回、主页
        {
          "tem": "navigationBack",
        }, {
          "tem": "navigationTitle",
          "data": {
            "title": "客服反馈"
          }
        }
      ],
      //"bd": "background-color:#fff;",    //navigationBar的样式
      "color": "white",    //white black,图标及字体的颜色
      "maskStyle": ""
    },
  },
  onLoad:function(){
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
  },
  navigateToBack: function () {
    wx.navigateBack()
  }
})