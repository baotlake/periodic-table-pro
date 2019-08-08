//index.js
//获取应用实例
var getdata = require('../../data/data.js')
const app = getApp()
const db = wx.cloud.database()      // 获取数据库引用
var that
//var Parser = require('../../utils/xmlParse-lib/dom-parser.js')




var menubar = false
var tapelem = "35";
//记录滑块上次事件移动原因
var lastMB_source = ''
//记录滑动提示框上次位置
var QM_tip_y = 0
var SUMx = 0
var lastX =null



Page({
  data: {
    systemInfo:null,
    //userInfo: {},
    //hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //t
    
    tbScale:1,

    periodName: ["I A", "II A", "III B", "IV B", "V B", "VI B", "VII B", "VIII", "VIII", "VIII", "I B", "II B", "III A", "IV A", "V A", "VI A", "VII A", "0"],
    periodId: ['ia', 'iia', 'iiib', 'ivb', 'vb', 'vib', 'viib', 'viiia', 'viiib', 'viiic', 'ib', 'iib', 'iiia', 'iva', 'va', 'via', 'viia','o'],
    periodNumber: [1,2,3,4,5,6,7,8],
    tabledata :[],
    signColor: {},

    menulist:[
      { 'id':'tool','title': '工具栏', 'url': '../../toolpages/tool/tool','bd':'#cec6c0'},
      { 'id': '', 'title': '保护生态环境', 'url': '../../menupages/propose/propose', 'bd': '#49b3fd'},
      { 'id': '', 'title': '意见反馈', 'url': '../../menupages/custom/custom', 'bd': '#6646f1'},
      { 'id': '', 'title': '关于', 'url': '../../menupages/about/about', 'bd': '#dfb741'},
      { 'id': '', 'title': '使用说明', 'url': '../../menupages/instruction/instruction', 'bd': '#c8adc4'},
      { 'id':'button', 'title':'分享', 'type':'share', 'bd':'#f00'},
      {'':'','title':'设置','url':'../../pages/settings/settings','bd':'#d3d3d3'}
      ],

    subPage:"none",
    leftPageX:0,
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
      {'id':'','name':'价电子构型'}
      
      ],
    longpressElem:[],
    moveBox_y:500,
      guide:false,
    guideUrl:[
      '../../data/image/guide/page1.png',
      '../../data/image/guide/page2.png',
      //'../../data/image/guide/page3.png'
    ],
    currentSwiper:0,
    guideTip:'下一步',
    tbMoveareaStyle: '',
    tbMoveViewStyle:'',
    QM_mainViewShow:false,
    tb_x:0,
    tb_y:0,
    navigationBarData:{
      "full": false,  //wdith满宽，及box-shadow阴影
      "info": [   //控制按钮列表，比如 返回、主页
        {
          "tem": "navigationCustom",
          "data":{
            "icon_w":"../../data/image/icon/menu_w.png",
            "icon_b":"../../data/image/icon/menu_b.png",
            "bindtap":"openleftpage",
            "key":"", //如空，则按照navigationBarData['color']
            "dot":false
          }
        }, {
          //"tem": "navigationTitle",
          "data":{
            "title":"元素周期表Pro"
          }
        },{
          "tem":"navigationCustom",
          "data":{
            "icon_w":"../../data/image/icon/search_d5.png",
            "icon_b":"../../data/image/icon/search_d5_b.png",
            "bindtap":"search",
            "style":"position:absolute;left:calc(100vw - 90pt - 46px);",
            "key":""
          }
        }
      ],
      //"bd": "background-color:#fff;",    //navigationBar的样式
      "commonIcon": "icon_w",    //white black,图标及字体的颜色
      "maskStyle": "",
    },
    QM_tool_list: [
      {
        "icon": "../../data/image/svg/solubility.svg",
        "text": "溶解性表",
        "bindtap": "MyNavigateTo",
        "url":"../../toolpages/solubility/solubility",
        "data": {
          "": ""
        }
      }, {
        "icon": "../../data/image/svg/pH.svg",
        "text": "pH指示剂",
        "bindtap": "MyNavigateTo",
        "url": "../../toolpages/indicator/indicator",
        "data": {
          "": ""
        }
      }, {
        "icon": "../../data/image/svg/Alphabet.svg",
        "text": "希腊字母",
        "bindtap": "MyNavigateTo",
        "url": "../../toolpages/GreekAlphabet/GreekAlphabet",
        "data": {
          "": ""
        }
      }, {
        "icon": "../../data/image/svg/ruler.svg",
        "text": "单位转换",
        "bindtap": "MyNavigateTo",
        "url": "../../toolpages/UnitConversion/UnitConversion",
        "data": {
          "": ""
        }
      }, {
        "icon": "../../data/image/svg/toolsbar.svg",
        "text": "工具栏",
        "bindtap": "MyNavigateTo",
        "url": "../../toolpages/tool/tool",
        "data": {
          "": ""
        }
      },
    ]
  
  },
  

  //事件处理函数
  onLoad: function () {
    that = this
    this.setData({
      systemInfo: app.globalData.systemInfo,
      UIstyle:app.globalData.appUI['white']['index']
    })
    console.log('Index onLoad')
    console.log(app.globalData.systemInfo)

    //判断是否初次打开，并读取使用信息
    try {
      var useLog = wx.getStorageSync('useLog')
      if (useLog) {
        // Do something with return value
        console.log('useLog:'.concat(useLog))
      } else {
        this.setData({
          guide: true,
        })
        useLog = 0
      }
    } catch (e) {
      // Do something when catch error
      //console.log('')
    }

    // wx.getSystemInfo({
    //   success:function(res) {
    //     console.log('getSystemInfo success')
    //     console.log(res)
    //   },
    //   fail:function(){
    //     console.log('获取系统信息错误')
    //   }
    // })

    //加载元素信息
    this.setData({
      //tabledata: table_data
      tabledata: getdata.getTableData(),
      signColor: getdata.getSignColor()
    })

    this.refreshPage()

    // var xmlParser = new Parser.DOMParser();
    // var doc = xmlParser.parseFromString('<to>dfsfdfsd</to>')
    // console.log(doc)

    // console.log('============数据库测试==============')
    // const _ = db.command
    // db.collection('wikipedia_data_json').where({
    //   ordinal:_.eq(9)
    // }).get({
    //   success(res){
    //     console.log('===========where=========')
    //     console.log(res.data)
    //   },
    //   fail(res){
    //     console.log('=======where fail=======')
    //     console.log(res)
    //   }
    // })

    // db.collection('wikipedia_data_json').where({
    //   ordinal: _.eq(9)
    // }).field({
    //   entry_info:true
    // }).get({
    //   success(res){
    //     console.log('======where + field =====')
    //     console.log(res)
    //   }
    // })

    // db.collection('wikipedia_data_json').field({
    //   ordinal:9,
    //   entry_info:true
    // }).get({
    //   success(res){
    //     console.log('=============field===========')
    //     console.log(res.data)
    //   },
    //   fail(res){
    //     console.log('========field fail==========')
    //     console.log(res)
    //   }
    // })

    // db.collection('wikipedia_data_json').doc('5c79e46466d3d872be6bc5a4').get({
    //   success(res){
    //     console.log('====doc====')
    //     console.log(res.data)
    //   },
    //   fail(res){
    //     console.log('====doc fail=====')
    //     console.log(res)
    //   }
    // })

    // wx.navigateTo({
    //   url:'../../pages/explain/explain'
    // })

    
  },

  onShow:function(){
    this.refreshPage()
  },


  //用户点击右上角分享
  
  onShareAppMessage: function (options) {
    var shareObj={
      title:'发现我的闪光点，发现你的"镁"！',
      desc: '发现我的闪光点，发现你的"镁"！',
      path:'/pages/index/index',
      imageUrl:'../../data/image/share.jpg',
      success:function(res){

      },
      fail:function(res){

      },
      complete:function(res){

      }
    }
    return shareObj
  },

  //主表格缩放适配
  tbZoom:function(Scale){
    this.setData({
      tbScale:Scale.toFixed(1)
    })
    // console.log(e)
    // console.log('NodesRef.fields TEST')
    // wx.createSelectorQuery().select('#tbmovearea').fields({
    //   dataset: true,
    //   size: true,
    //   scrollOffset: true,
    //   properties: ['scrollX', 'scrollY'],
    //   computedStyle: ['margin', 'backgroundColor']
    // }, function (res) {
    //   res.dataset // 节点的dataset
    //   res.width // 节点的宽度
    //   res.height // 节点的高度
    //   res.scrollLeft // 节点的水平滚动位置
    //   res.scrollTop // 节点的竖直滚动位置
    //   res.scrollX // 节点 scroll-x 属性的当前值
    //   res.scrollY // 节点 scroll-y 属性的当前值
    //   // 此处返回指定要返回的样式名
    //   res.margin
    //   res.backgroundColor
    //   console.log(res)
    //   tbMoveAreaQuery = res
    // }).exec()
    // wx.createSelectorQuery().select('#tbmoveview').fields({
    //   dataset: true,
    //   size: true,
    //   scrollOffset: true,
    //   properties: ['scrollX', 'scrollY'],
    //   computedStyle: ['margin', 'backgroundColor']
    // }, function (res) {
    //   res.dataset // 节点的dataset
    //   res.width // 节点的宽度
    //   res.height // 节点的高度
    //   res.scrollLeft // 节点的水平滚动位置
    //   res.scrollTop // 节点的竖直滚动位置
    //   res.scrollX // 节点 scroll-x 属性的当前值
    //   res.scrollY // 节点 scroll-y 属性的当前值
    //   // 此处返回指定要返回的样式名
    //   res.margin
    //   res.backgroundColor
    //   //console.log(res)
    // }).exec()
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
      if (tapelem.length <=3){
        wx.navigateTo({
          url: '../detail/detail' + '?id=' + tapelem
        })
      }
    }
  },

  bindlongpress:function(e){
    tapelem = e.currentTarget.dataset.tapordinal
    this.setData({
      longpressElem:getdata.getElemBoxData(tapelem),
      selectbottomdata:true,
    })

  },

  closeSubPage:function(){
    console.log('closeSubPage:function()')
    this.setData({
      selectbottomdata: false,
      //guide:false,//点击穿透，弃用
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
  closeDetailPage: function(){
    this.setData({
      detail: 'none',
    })
  },
  gettapelem:function(){
    return tapelem
  },

  lpXbindChange:function(e){
    // 滑动左边菜单页面触发
    // console.log(e.detail)    
    //console.log(SUMx)
    if (lastX != null && e.detail.source == 'touch') {
      SUMx += e.detail.x - lastX
    }

    if (e.detail.source == 'touch') {
      lastX = e.detail.x
      lpTimer = setTimeout(this.touchlp, 690)
    } else if (SUMx >= 10 && e.detail.source != 'touch') {
      //console.log('page向右') 打开菜单
      SUMx = 0
      this.setData({
        leftPageX: 300
      })
    } else if (SUMx <10 && e.detail.source != 'touch' && SUMx != 0) {
      //console.log('向左') 关闭菜单
      SUMx = 0
      this.setData({
        leftPageX: 0
      })
    }

  },
  touchlp:function(){
    console.log('------touch lp ---------------')
    if (SUMx >=6){
      this.openleftpage
    }else{
      this.closeleftpage
    }
  },
  openleftpage: function () {
    // console.log('----------open left page---------')
    this.setData({
      leftPageX: 300
    })
  },
  closeleftpage:function(){
    // console.log('----------close left page---------')
    this.setData({
      leftPageX:0,
    })
  },
  
  opentoolpage:function(){
    wx.navigateTo({
      url:'../tool/tool'
    })
  },

  tapMoveBox:function(){
    if (this.data.QM_mainViewShow){
      this.setData({
        QM_mainViewShow:false
      })
    }else{
      this.setData({
        QM_mainViewShow: true
      })
    }

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
    //console.log(e.detail)
  },
  QM_change:function(e){
    //console.log(e.detail)
    var index = this.data.QMList.length, max = 238
    var boxY = e.detail.y + 22
    if(e.detail.source!=''){
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
    }else if(e.detail.source==''){
      if(lastMB_source!=''){
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


  MyNavigateTo:function(p){
    //参数p可能为字符串或事件,事件传参在data-path中
    if (typeof(p) == 'string'){
      wx.navigateTo({
        url: path
      })
    }else if(typeof(p) == 'object'){
      wx.navigateTo({
        url:p.currentTarget.dataset.path
      })
    }

  },
  search:function(){
    wx.navigateTo({
      url:'../search/search'
    })
  },


  swiperChange:function(){
    this.swiperNextPage()
  },

  swiperNextPage:function(){
    this.data.currentSwiper
    if (this.data.currentSwiper < this.data.guideUrl.length-1){
      this.setData({
        currentSwiper: this.data.currentSwiper + 1
      })
    } else if (this.data.currentSwiper == this.data.guideUrl.length - 1 && this.data.guideTip != '开始使用'){
      this.setData({
        //currentSwiper: this.data.currentSwiper,
        guideTip: '开始使用',
      })
    } else if (this.data.guideTip == '开始使用'){
      this.setData({
        guide:false,
      })
    }

    // switch(this.data.currentSwiper){
    //   case 0:
    //     console.log('case 0')
    //     this.setData({
    //       currentSwiper: this.data.currentSwiper + 1
    //     })
    //     break
    //   case 1:
    //     console.log('case 1')
    //     this.setData({
    //       currentSwiper: this.data.currentSwiper + 1,
    //       guideTip:'开始使用',
    //     })
    //     break
    //   case 2:
    //     console.log('case 2')
    //     this.setData({
    //       guide:false,
    //     })
    //     break
    // }
    console.log(this.data.guide)

  },
  tbScaleSliderChange:function(e){
    that.tbZoom(e.detail.value)
    console.log(e.detail.value)
  },

  // 打开英语划词阅读程序
  GoCheckWord:function(e){
    wx.navigateToMiniProgram({
      appId:'wx16b955041265aaf5',
      path:'pages/bookshelf/bookshelf',
    })
  },

  refreshPage:function(){
    // 刷新页面，判断是否需要setData

    // UIstyle & app.globalData.appSet['theme']

    var theme = app.globalData.appSet['theme']
    if (this.data.UIstyle != app.globalData.appUI[theme]['index']){
      this.setData({
        UIstyle: app.globalData.appUI[theme]['index']
      })
    }
    
    //UIstyle 与 navigationBar 主题颜色同步 !先刷新页面主题，再同步主题

    if (this.data.navigationBarData['commonIcon'] == 'icon_b' & this.data.UIstyle['icon'] =='white'){
      // 主题白，将navigationBar图标主题改为白色
      console.log('=>统一为白色主题，深色图标')
      var commonIcon = 'navigationBarData.commonIcon'
      this.setData({
        [commonIcon]:'icon_w'
      })
    } else if (this.data.navigationBarData['commonIcon'] == 'icon_w' & this.data.UIstyle['icon'] =='black'){
      // 主题黑，将navigationBar图标主题改为黑
      console.log('=>统一为黑色主题,白色图标')
      console.log(this.data.UIstyle.icon)
      var commonIcon = 'navigationBarData.commonIcon'
      this.setData({
        [commonIcon]: 'icon_b'
      })
    }

    // SystemInfo & app.globalData.systemInfo
    if (this.data.systemInfo != app.globalData.systemInfo){
      this.setData({
        systemInfo: app.globalData.systemInfo
      })
    }

  }

//page
})

function gettapelem() {
  return tapelem
}
module.exports={
  gettapelem: gettapelem
}