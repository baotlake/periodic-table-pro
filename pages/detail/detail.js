var data = require('../../data/data.js')
var getordail = require('../index/index.js')
var that
const app = getApp()
const db = wx.cloud.database({
  env: 'test-c59f6a'
})   //获取数据库引用
const _ = db.command

var tapelem = "35"
var t = 0
//
var eps = ''
//

function dbGet(){
  // 获取数据库信息
  console.log('=======dbget=====')
  db.collection("elements_detail").where({
    ordinal:String(1)   // 字符串类型
  }).get({
    success(res){
      console.log('success')
      console.log(res.data)
    }
  })  
}

Page({
  data: {
    detail_data:[],
    signColor:{
      'h': '#e9db39',
      'he': '#4e1892',
      'li': '#dc143c',
      'be': '#2578b5',
      'b': '#cc3536',
      'al': '#0041a5',
      'f': '#005b5a',
      //'sc': '#ce9335',
      'sc': '#ff9c00',
      'la': '#a03e28',
      'ac': '#6a6834',
      'ubu': '#fff',
    },
    rootPath: '../../',
    eleShellControl:{
      'height':'160px',//
      'translateY':80,//130
    },
    cloud_image:'',
    systemInfo:null,
    navigationBarData:{
      "full": false,  //wdith满宽，及box-shadow阴影
      "info": [   //控制按钮列表，比如 返回、主页
        {
          "tem": "navigationBack",
          "data": {
            'icon_w':'../../data/image/icon/back_w.png',
            'style':'background-color:rgba(1,1,1,0.2);box-shadow: inset 0 0 1px #fff;',
            'key':'icon_w'
          }
        }
      ],
      //"bd": "background-color:#fff;",    //navigationBar的样式
      "color": "black",    //white black,图标及字体的颜色
      "maskStyle": ""
    },
    UIstyle:{
      'page':'background-color:#efefef;','item':'background-color:#fff;color:#555;','iconstyle':'black'
    }

  },
  onLoad: function (options) {
    that = this
    console.log(options)
    tapelem = getordail.gettapelem()
    eps = data.geteleShellData(tapelem)
    var theme = app.globalData.appSet['theme']
    this.setData({
      detail_data: data.detaildata(),
      systemInfo: app.globalData.systemInfo,
      UIstyle:app.globalData.appUI[theme]['detail']
    })

    // 获取数据库信息
    dbGet()

    // 监听窗口尺寸变化事件 not function Error
    // wx.onWindowResize(function (res) {
    //   console.log('======Window Resize callback======')
    //   console.log(e)
    // })
    // this.windowOrientation

    //加载云图片
    // var cloudUrl = 'cloud://test-c59f6a.7465-test-c59f6a/elemens_image/' + this.data.detail_data[0]['data'][0] + '.jpg'
    // wx.cloud.getTempFileURL({
    //   //cloud://test-c59f6a.7465-test-c59f6a/elemens_image/Ac.jpg
    //   fileList: [cloudUrl],
    //   success: res => {
    //     // get temp file URL

    //     that.setData({
    //       cloud_image: res.fileList[0]['tempFileURL']
    //     })
    //   },
    //   fail: err => {
    //     // handle error
    //     console.log(err)
    //   }
    // })

    //测试数据库
      //构造查询语句
    //   console.log('数据库测试')
    // db.collection('elements_detail').doc('5c67b43166d3d872be609cdb').get({
    //     success(res){
    //       console.log(res)
    //     },
    //     fail(res){
    //       console.log(res)
    //     }
    //   })
  },
  onHide(){
    clearInterval(this.interval)
  },
  onShow(){
    this.interval = setInterval(this.drawAtom, 30)
  },
  onResize(res){
    console.log('======onResize======')
    console.log()
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var shareObj = {
      title: '发现我的闪光点，发现你的"镁"！',
      desc: '发现我的闪光点，发现你的"镁"！',
      path: '/pages/index/index',
      imageUrl: '../../data/image/share.jpg',
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    }
    return shareObj
  },
  
  navigateToBack: function(){
    wx.navigateBack()
  },

  //test
  enterExplain:function(){
    wx.navigateTo({
      url:'../../pages/explain/explain?ordinal=' + tapelem
    })
  },


  tapEleShell:function(){
    if(this.data.eleShellControl['translateY']==80){
      this.setData({
        eleShellControl: {
          'height': '260px',//160
          'translateY': 130,//130
        }
      })
    }else{
      this.setData({
        eleShellControl: {
          'height': '160px',//260
          'translateY': 80,//130
        }
      })
    }
  },

  
  onReady:function(){
    this.t = 0
    this.drawAtom()
    this.interval = setInterval(this.drawAtom, 25)  
  },


  drawAtom: function(){ 
    //eps: electrons per shell 每层电子数 ‘,’隔开 全局变量

    t += 1
    //eps ='2,8,18,32,18,8'
    var context = wx.createContext()
    context.translate(130, this.data.eleShellControl['translateY'])

    //画电子，画实心圆
    function electronic(x,y,r,v){
      context.beginPath(0)
      context.arc(x,y,r,0,Math.PI*2)
      
      if(that.data.UIstyle['iconstyle']=='black'){
        context.setStrokeStyle('#363636')
        context.setFillStyle('#363636')
      }else{
        context.setStrokeStyle('#fff')
        context.setFillStyle('#fff')
      }
      context.rotate(v*t*0.3*Math.PI/180)
      context.fill()
      context.stroke()
      context.closePath()
    }

    //画电子轨道，空心圆, 'r'是真正的半半径
    function pathway(r){
      //r = Math.sqrt(r*r*2)
      context.setLineWidth(1)
      context.beginPath(0)  
      context.arc(0, 0, r, 0, Math.PI*2,true)
      //context.setStrokeStyle('rgba(1,1,1,1)')
      //context.setFillStyle("#fff") 
      if (that.data.UIstyle['iconstyle'] == 'black') {
        context.setStrokeStyle('#888') 
      } else {
        context.setStrokeStyle('#999') 
      } 
      
      //context.fill()
      context.closePath()
      context.stroke()
    }

    //对eps(每层电子数)进行解析，画
    function parseEps(eps){
      var epList = eps.split(',')
      var er =0 //半径
      //console.log(epList)
      for(var p in epList){
        er = p*15+24
        for(var i=0;i<epList[p];i++){
          //console.log(i)
          if(i == 0){
            pathway(er)
            electronic(er,0,3,2/(p+1))
          }else{
            electronic(er * Math.cos(Math.PI * 2 * i / epList[p]), er * Math.sin(Math.PI * 2 * i / epList[p]),3,0)
          }

        }
      }
    }

    
    parseEps(eps)
    //pathway(Math.sqrt(30*30*2))
    //electronic(70, 70, 1)
    if(eps!=''){
      electronic(0, 0, 9, 0)
    }
    
    

    wx.drawCanvas({
      canvasId:'atomStructure',
      actions:context.getActions()
    })

  },


  onUnload:function(){
    clearInterval(this.interval)
  },

  previewImage:function(e){
    /**预览图片 */
    list = e.currentTarget.dataset.url
    current = e.currentTarget.dataset.current
    if(typeof(list) == 'string') list = [list];
    if(!current) current = 0;
    wx.previewImage({
      urls:list,
      current:list[current],
    })
  }

})
