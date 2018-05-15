//index.js
//获取应用实例
var getdata = require('../data/data.js')
const app = getApp()


var menubar = false
var tapelem = "35";
//记录滑块上次事件移动原因
var lastMB_source = ''
//记录滑动提示框上次位置
var QM_tip_y = 0


Page({
  data: {
    rootPath: '../',
    //userInfo: {},
    //hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),

  periodName: ["I A", "II A", "III B", "IV B", "V B", "VI B", "VII B", "VIII", "VIII", "VIII", "I B", "II B", "III A", "IV A", "V A", "VI A", "VII A", "0"],
  periodId: ['ia', 'iia', 'iiib', 'ivb', 'vb', 'vib', 'viib', 'viiia', 'viiib', 'viiic', 'ib', 'iib', 'iiia', 'iva', 'va', 'via', 'viia','o'],
  periodNumber: [1,2,3,4,5,6,7,8," "," "," "],
  tabledata :[],
  signColor: {},

  uicolor: [
    /*Brim*/ { "leftbrim": "#202020", "topbrim": "#202020", "": "", "": "", "": "",},
    /*Border*/{ "borderbox": "#3f3f3c", "borderleft": "#303030", "bordertop": "#303030", "": "", "": "",    },
    /*Text*/{ "": "", "": "", "": "", "": "", "": "", "": "", "": "", "": "", "": "",},
    ],
    

    menulist:[
      { 'id':'tool','title': '工具栏', 'url': '../menupage/tool/tool','bd':'#cec6c0'},
      { 'id': '', 'title': '关注生态环境', 'url': '../menupage/propose/propose', 'bd': '#49b3fd'},
      { 'id': '', 'title': '意见反馈', 'url': '../menupage/custom/custom', 'bd': '#6646f1'},
      { 'id': '', 'title': '关于', 'url': '../menupage/about/about', 'bd': '#dfb741'},
      { 'id': '', 'title': '使用说明', 'url': '../menupage/instruction/instruction', 'bd': '#c8adc4'},

      ],
  subPage:"none",
  menubar:"none",  
  leftpage:"none",
  selectbottomdata:false,
  bottomdata:'质量数',
  bottomdatalist:[],
  bottomdataitem: [
    { 'id': 'aw', 'name': '原子量' },
    { 'id': '', 'name': '电负性' },
    { 'id': '', 'name': '英文名' },
    { 'id': '', 'name': '拼 音' },
    //注意空格
    { 'id': '','name': '原子半径' }, 
    { 'id': '', 'name': '共价半径' },
    
    ],
  longpressElem:[],
  moveBox_y:500,
  QM_tip_y:170,
  QM_Show:true,
  QM_tipText:'上下滑动',
  QMList: [
      { 'name': '工', 'url': '../menupage/tool/tool','tip':'工具栏' },
      { 'name': '溶', 'url': '../menupage/tool/pages/solubility/solubility','tip':'溶解性表' },
      { 'name': 'α', 'url': '../menupage/tool/pages/GreekAlphabet/GreekAlphabet', 'tip': '希腊字母表' },
      { 'name': 'PH', 'url': '../menupage/tool/pages/indicator/indicator', 'tip': '酸碱指示剂' },
      { 'name': '关', 'url': '../menupage/about/about', 'tip': '关于'},
      //{ 'name': '测', 'url': '../detail/explain/explain', 'tip': '测试' },
    ],

  },
  

  //事件处理函数
  onLoad: function () {

    this.setData({
      //tabledata: table_data
      tabledata: getdata.getTableData(),
      signColor: getdata.getSignColor()
    })
    

    /*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      
    }
    */

  },


 ///////用户点击右上角分享
  onShareAppMessage: function (options) {
    var shareObj={
      title:'元素周期表Pro',
      desc: '最好用的化学元素周期表，让你感到相见恨晚！',
      path:'/pages/index/index',
      imageUrl:'/pages/data/image/elemimage/Br.jpg',
      success:function(res){

      },
      fail:function(res){

      },
      complete:function(res){

      }
    }
    return shareObj
  },

  bindTouchStart:function(e){
    this.startTime = e.timeStamp
  },

  bindTouchEnd:function(e){
    this.endTime = e.timeStamp
  },

  openDetailPage: function(event){
    if(this.endTime - this.startTime < 350){
      tapelem = event.currentTarget.dataset.tapordinal
      getdata.setTapElem(tapelem)
      wx.navigateTo({
        url:'../detail/detail',
      })
    }
  },

  selectBottomData:function(e){
    tapelem = e.currentTarget.dataset.tapordinal
    this.setData({
      longpressElem:getdata.getElemBoxData(tapelem),
      selectbottomdata:true,
    })

  },

  closeSubPage:function(){
    this.setData({
      selectbottomdata: false
    })
  },

  bindPickerChange:function(e){
    const val = e.detail.value
    this.setData({
      bottomdata:this.data.bottomdataitem[val[0]]['name']
    })
    if(this.data.bottomdata == "原子量"){
      this.setData({
        bottomdatalist: [],
      })
    }
    else{
      this.setData({
        bottomdatalist: getdata.getbottomdata(this.data.bottomdata)
      })
    }
    wx.reportAnalytics('elem_longpress', {
    });
  },
  openMenu: function(){
    wx.navigateTo({
      url:'../menupage/about/about'
    })
    if(menubar){
      menubar=false
      this.setData({
        //menubar:"none"
      })
    }else{
      menubar=true
      this.setData({
        //menubar:"block"
      })
    }
  },
  closeDetailPage: function(){
    this.setData({
      detail: 'none',
    })
  },
  gettapelem:function(){
    return tapelem
  },
  openleftpage:function(){
    this.setData({
      leftpage:"flex",
    })
  },
  pull_lp:function(){
    this.setData({ 
      lp_width:'750rpx',
      leftpage: "flex"
      })
  },
  closeleftpage:function(){
    this.setData({
      leftpage:"none",
      lp_width: '20rpx',
    })
  },

  /*
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  */
  
  opentoolpage:function(){
    wx.navigateTo({
      url:'../tool/tool'
    })
  },

  QM_TouchStart:function(){
    this.setData({
      QM_Show:false
    })
    
  },
  QM_TouchEnd:function(e){
    this.setData({
      moveBox_y: 500,
      QM_Show: true,
    })
    console.log(e.detail)
  },
  QM_change:function(e){
    //console.log(e.detail)
    //console.log(e.detail.source)
    var index = this.data.QMList.length, max = 213
    var boxY = e.detail.y + 20
    if(e.detail.source=='touch'){
      //console.log('拖动滑块')
      for (var i = 1; i <= index; i++) {
        var y = max / index * (i - 1)
        if (max / index * i >= boxY && max / index * (i - 1) < boxY){
          //console.log('进入'.concat(i))
          if (QM_tip_y!=y){
            QM_tip_y = y
            this.setData({
              QM_tip_y:y,
              QM_tipText:this.data.QMList[i-1]['tip']
            })
          }
          break
        }
      }
    }else{
      if(lastMB_source=='touch'){
        //console.log('拖动停止')
        for(var i=1;i<=index;i++){
          //console.log(i)
          //console.log(max / index * i)
          if (((i == 1 && boxY <= 0) || max / index * (i - 1) < boxY) && max / index * i >= boxY){
            //console.log('触发'.concat(i))
            var y = max / index * (i - 1)
            if (QM_tip_y != y) {
              QM_tip_y = y
              this.setData({
                QM_tip_y: y
              })
            }
            //拖动停止，参数 i
            //setTimeout(this.MyNavigateTo(this.data.QMList[i - 1]['url']),1)
            wx.navigateTo({
              url:this.data.QMList[i-1]['url']
            })
            
            break
          }
        }
      }
    }
    lastMB_source = e.detail.source
  },
  MyNavigateTo:function(path){
    wx.navigateTo({
      url: path
    })
  },
  search:function(){
    wx.navigateTo({
      url:'../search/search'
    })
  }
//page
})

function gettapelem() {
  return tapelem
}
module.exports={
  gettapelem: gettapelem
}