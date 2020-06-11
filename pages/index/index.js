//index.js
//获取应用实例
var data = require('../../data/data.js');
const app = getApp();
const db = wx.cloud.database();      // 获取数据库引用
var that;
//var Parser = require('../../utils/xmlParse-lib/dom-parser.js');

var menubar = false;
var tapelem = "35";
//记录滑块上次事件移动原因
var lastMB_source = '';
//记录滑动提示框上次位置
var QM_tip_y = 0;
var SUMx = 0;
var lastX = null;

Page({
  data: {
    systemInfo:{},
    //userInfo: {},
    //hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    tbScale:1,

    periodName: ["I A", "II A", "III B", "IV B", "V B", "VI B", "VII B", "VIII", "VIII", "VIII", "I B", "II B", "III A", "IV A", "V A", "VI A", "VII A", "0"],
    periodId: ['ia', 'iia', 'iiib', 'ivb', 'vb', 'vib', 'viib', 'viiia', 'viiib', 'viiic', 'ib', 'iib', 'iiia', 'iva', 'va', 'via', 'viia','o'],
    periodNumber: [1,2,3,4,5,6,7,8],
    tabledata :[],
    signColor: {},

    /* // 未使用
    menulist:[
      { 'id':'tool','title': '工具栏', 'url': '../../toolpages/tool/tool','bd':'#cec6c0'},
      { 'id': '', 'title': '保护生态环境', 'url': '../../menupages/propose/propose', 'bd': '#49b3fd'},
      { 'id': '', 'title': '意见反馈', 'url': '../../menupages/custom/custom', 'bd': '#6646f1'},
      { 'id': '', 'title': '关于', 'url': '../../menupages/about/about', 'bd': '#dfb741'},
      { 'id': '', 'title': '使用说明', 'url': '../../menupages/instruction/instruction', 'bd': '#c8adc4'},
      { 'id':'button', 'title':'分享', 'type':'share', 'bd':'#f00'},
      {'':'','title':'设置','url':'../../pages/settings/settings','bd':'#d3d3d3'}
      ],
    */

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
    // guide:false,
    // guideUrl:[
    //   '../../data/image/guide/page1.png',
    //   '../../data/image/guide/page2.png',
    //   //'../../data/image/guide/page3.png'
    // ],
    // currentSwiper:0,
    // guideTip:'下一步',
    tbMoveareaStyle: '',
    tbMoveViewStyle:'',
    QM_mainViewShow:false,
    tb_x:0,
    tb_y:0,

    quickToolsBar: [
      {
        "svgName":"solution",
        "icon": "../../data/image/svg/solubility.svg",
        "text": "溶解性表",
        "bindtap": "myNavigateTo",
        "url":"../../toolpages/solubility/solubility",
        "data": {
          "": ""
        }
      }, {
        "svgName":"pH",
        "icon": "../../data/image/svg/pH.svg",
        "text": "pH指示剂",
        "bindtap": "myNavigateTo",
        "url": "../../toolpages/indicator/indicator",
        "data": {
          "": ""
        }
      }, {
        "svgName":"alphabet",
        "icon": "../../data/image/svg/Alphabet.svg",
        "text": "希腊字母",
        "bindtap": "myNavigateTo",
        "url": "../../toolpages/GreekAlphabet/GreekAlphabet",
        "data": {
          "": ""
        }
      }, {
        "svgName":"unit",
        "icon": "../../data/image/svg/ruler.svg",
        "text": "单位转换",
        "bindtap": "myNavigateTo",
        "url": "../../toolpages/UnitConversion/UnitConversion",
        "data": {
          "": ""
        }
      }, {
        "svgName":"tools",
        "icon": "../../data/image/svg/toolsbar.svg",
        "text": "工具栏",
        "bindtap": "myNavigateTo",
        "url": "../../toolpages/tool/tool",
        "data": {
          "": ""
        }
      },
    ],
    theme:'ui'
  },
  

  //事件处理函数
  onLoad: function () {
    that = this
    this.refreshPage()

    this.setData({
      tabledata: data.getTableData(),
      signColor: data.getSignColor(),
    })

    // this.myNavigateTo("../../toolpages/statistics/statistics");
    // this.myNavigateTo("../../menupages/reward/reward");


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


     //判断是否初次打开，并读取使用信息
     try {
      // var useLog = wx.getStorageSync('useLog')
      // if (useLog) {
      //   // Do something with return value
      //   console.log('useLog:'.concat(useLog))
      // } else {
      //   this.setData({
      //     guide: true,
      //   })
      //   useLog = 0
      // }
    } catch (e) {
      // Do something when catch error
      //console.log('')
    }

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
      title:'元素周期表Pro',
      desc: '化学元素周期表是学习必备的小助手！呐~ 推荐给你😁',
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
      data.setTapElem(tapelem)
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
      longpressElem:data.getElemBoxData(tapelem),
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
        bottomdatalist: data.getbottomdata(this.data.bottomdata)
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

  touchlp:function(){
    console.log('------touch lp ---------------')
    if (SUMx >=6){
      this.openleftpage
    }else{
      this.closeleftpage
    }
  },
  
  openLeftPage: function () {
    // console.log('----------open left page---------')
    this.setData({
      leftPageX: 300
    })
  },
  closeLeftPage:function(){
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
    return;
    //console.log(e.detail)
    var index = this.data.QMList.length, max = 238;
    var boxY = e.detail.y + 22;
    if(e.detail.source!=''){
      //console.log('拖动滑块')
      for (var i = 1; i <= index; i++) {
        var y = max / index * (i - 1);
        if (max / index * i >= boxY && max / index * (i - 1) < boxY){
          //console.log('进入'.concat(i));
          if (QM_tip_y!=y){
            QM_tip_y = y;
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
              QM_tip_y = y;
              this.setData({
                QM_tip_y: y
              })
            }
            //拖动停止，参数 i
            //setTimeout(this.myNavigateTo(this.data.QMList[i - 1]['url']),1)
            wx.navigateTo({
              url:this.data.QMList[i-1]['url']
            })
            
            break;
          }
        }
      }
    }
    lastMB_source = e.detail.source;
  },


  myNavigateTo:function(p){
    //参数p可能为字符串或事件,事件传参在data-path中
    if (typeof(p) == 'string'){
      wx.navigateTo({
        url: p
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

    // SystemInfo & app.globalData.systemInfo
    // if (this.data.systemInfo != app.globalData.systemInfo){
    //   this.setData({
    //     systemInfo: app.globalData.systemInfo
    //   })
    // }

    let appTheme = app.globalData.theme;
    let theme = '';
    switch (appTheme){
      case "default-light":
        theme = 'ui-w sign-color-2';
        break;
      case "default-dark":
      default:
        theme = 'ui sign-color-1';
        break;
    }

    let systemInfo = app.globalData.systemInfo;
    systemInfo['MenuButtonBounding'] = wx.getMenuButtonBoundingClientRect();
    
    this.setData({
      theme:theme,
      systemInfo:systemInfo,
    })
    
    // 刷新app中的全局systemInfo
    app.refresh();
  }

//page
})

function gettapelem() {
  return tapelem
}
module.exports={
  gettapelem: gettapelem
}