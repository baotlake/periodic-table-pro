// pages/detail/explain/explain.js
const app = getApp()
const db = wx.cloud.database()      // 获取数据库引用
const _ = db.command
var that

var SUMx=0;
var lastX = null;

var rightMenuInfo = {
  "indexX":0,
  "list":[{
    "title":"标题一",
    "style":"",
    }, {
    "title": "标题二",
      "style": "",
    }, {
      "title": "标题三",
      "style": "",
    }, {
      "title": "标题四",
      "style": "",
    }, {
      "title": "标题五",
      "style": "",
    }],
  "":""
}
var pageDataList = []

function dbGet(ordinal) {
  // 获取数据库中的数据，此处获取元素维基百科的数据 即'wikipedia_data_json'集合中的记录，
  console.log('==dbGet==')
  db.collection('wikipedia_data_json').where({
    ordinal: _.eq(ordinal)
  }).field({
    entry_info: true
  }).get({
    success(res) {
      console.log('======where + field =====')
      //console.log(res)
      // 赋值
      pageDataList = res['data'][0]['entry_info']
      console.log(pageDataList)

      // 刷新页面
      Page.refreshPage()
    }
  })
}


Page({


  /**
   * 页面的初始数据
   */
  data: {
    systemInfo:null,
    pageInfo: [],
    indexList:[
      {title:"标题一"},
      { title: "标题二"}
    ],
    rootPath:'../../',
    sectionControl:[],
    showExplainIndex:0,
    indexX:175,
    navigationBarData:{
      "full":true,  //wdith满宽，及box-shadow阴影
      "info":[   //控制按钮列表，比如 返回、主页
        {
          "tem":"navigationHome"
        },{
          "tem":"navigationBack",
          "data":{
            "color":"black"
          }
        },
      ],
      "title":"大标题",     //标题
      "bd":"background-color:#fff;",    //navigationBar的样式
      "color":"black",    //white black,图标及字体的颜色
      "maskStyle":""
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opions) {
    // console.log('============onLoad opions========')
    // console.log(opions)
    that = this
    this.dbGet(opions['ordinal'])
    // this.refreshPage()        // 刷新页面，setData({})赋值
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

  callbacktest:function(){
    console.log('+++++call back test success ++++++')
  },

  // 刷新页面
  refreshPage:function(e){
    console.log('=====explain refresh Page======')
    //右侧菜单
    //var pageInfo_0 = 'pageInfo[0]'
    this.setData({
      systemInfo: app.globalData.systemInfo,
      pageInfo: pageDataList
    })
    // console.log('====refreshPage - pageInfo===')
    // console.log(this.data.pageInfo)
  },

/**拖动Index */
  indexBindChange:function(e){
    console.log(e.detail)
    if(lastX!=null && e.detail.source=='touch'){
      SUMx += e.detail.x-lastX
    }
    if(e.detail.source=='touch'){
      lastX = e.detail.x
    }
    if (SUMx >= 5 && e.detail.source != 'touch') {
      //console.log('page向右')
      SUMx = 0
      this.setData({
        indexX:175
      })
    } else if (SUMx < 5 && e.detail.source != 'touch' && SUMx != 0) {
      //console.log('page向左')
      SUMx = 0
      this.setData({
        indexX: 0
      })
    }
  },

/**show /off Index */
  showIndex:function(){
    if(this.data.indexX<=10){
      this.setData({
        indexX: 175
      })
    }else if(this.data.indexX>=120){
      this.setData({
        indexX: 0
      })
    }
  },

/**tap index */
  tapIndex:function(e){
    var explainIndex = e.currentTarget.dataset.index
    console.log(explainIndex)
    this.setData({
      indexX: 175,
      showExplainIndex:explainIndex,
    })

  },

  navigateToBack: function () {
    wx.navigateBack()
  },

  // 展开收缩控制
  doSectionControl:function(e){
    var index = e.currentTarget.dataset.index
    var setSectionControl = 'sectionControl[' + index + ']'
    if (this.data.sectionControl[index]==true){
      this.setData({
        [setSectionControl]:false
      })
    }else{
      this.setData({
        [setSectionControl]: true
      })
    }

  },

   // 获取数据库中的数据，此处获取元素维基百科的数据 即'wikipedia_data_json'集合中的记录，
  dbGet:function(ordinal) {
    console.log('==dbGet==', ordinal)
    db.collection('wikipedia_data_json').where({
      ordinal: _.eq(parseInt(ordinal))
    }).field({
      entry_info: true
    }).get({
      success(res) {
        console.log('======where + field sucess in eplain Page =====')
        console.log(res)

        // 赋值
        pageDataList = res['data'][0]['entry_info']
        // console.log(pageDataList)

        // 刷新页面
        that.refreshPage()
      }
    })
    // console.log('=====function dbGet end======')
  }

})
// Page end

