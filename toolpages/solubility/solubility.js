//var getdata = require('../data/tooldata.js')
const app = getApp()
Page({
  data: {
    rootPath: '../../../../',
    systemInfo:null,
    solubilitydata_th: [
      /*阴离子*/[{'symbol':'F-','name':'Fluoride'}, {'symbol':'Cl-','name':'Chloride'}, {'symbol':'Br-','name':'Bromide'}, {'symbol':'I-','name':'Iodide'}, {'symbol':'CO32-','name':'Carbonate'}, {'symbol':'ClO3-','name':'Chlorate'}, {'symbol':'OH-','name':'Hydroxide'}, {'symbol':'CN-','name':'Cyanide'}, {'symbol':'OCN-','name':'Cynate'}, {'symbol':'SCN-','name':'Thiocyanate'}, {'symbol':'NO3-','name':'Nitrate'}, {'symbol':'O^2-','name':'Oxide'}, {'symbol':'PO43-','name':'Phosphate'}, {'symbol':'SO42-','name':'Sulfate'}, {'symbol':'Cr2O72-','name':'Dichromate'}],
  /*阳离子*/[{ 'symbol': 'Zn^2+', 'name': 'Zinc' }, { 'symbol': 'Sr^2+', 'name': 'Strontium' }, { 'symbol': 'Na+', 'name': 'Sodium' }, { 'symbol': 'Ag+', 'name': 'Silver' }, { 'symbol': 'K+', 'name': 'Potassium' }, { 'symbol': 'Mg^2+', 'name': 'Magnesium' }, { 'symbol': 'Li+', 'name': 'Lithium' }, { 'symbol': 'Pb^2+', 'name': 'Lead' }, { 'symbol': 'Fe^3+', 'name': 'Iron' }, { 'symbol': 'Fe^2+', 'name': 'Iron' }, { 'symbol': 'Cu^2+', 'name': 'Copper' }, { 'symbol': 'Ca^2+', 'name': 'Calcium' }, { 'symbol': 'Be^2+', 'name': 'Beryllium' }, { 'symbol': 'Ba^2+', 'name': 'Barium' }, { 'symbol': 'NH4^+', 'name': 'Ammonium' }, { 'symbol': 'Al^3+','name':'Aluminium'}],
    ],
    solubilitydata_bd: [
  //      | F-  |  Cl-  |  Br-  |   I- | CO32- |ClO3-| OH- |  CN- | OCN- | NO3-|  O2- | PO42-  | Cr2O72-|
  /*Zn+*/ ['ss', 's', 's', 's', 'i', 's', 'i', 'i', 'w', 'w', 's', 'i', 'i', 's', 'i'],
  /*Sr2+*/['ss', 's', 's', 's', 'i', 's', 's', 'w', 'w', 'w', 's', 'r', 'w','i','w' ],
  /*Na+*/['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 'r', 's', 's', 's', ],
  /*Ag+*/['s', 'i', 'i', 'i', 'i', 's', 'ss', 'i', 'i', 'ss', 's', 'ss', 'i', 'ss', 'i',],
  /*K+*/['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 'r', 's', 's', 's',],
  /*Mg2+*/['ss', 's', 's', 's', 'i', 's', 'i', 'w', 'w', 'w', 's', 'i', 'i', 's', 'i',],
  /*Li+*/['ss', 's', 's', 's', 'ss', 's', 's', 's', 'w', 'w', 's', 'r', 'w', 's', 's',],
  /*Pb2+*/['ss', 'ss', 'ss', 'i', 'i', 's', 'i', 'w', 'w', 'ss', 's', 'i', 'i', 'i', 'w',],
  /*Fe3+*/['x', 's', 's', 'w', 'x', 's', 'i', 'w', 'w', 'w', 's', 'i', 'i', 's', 'i',],
  /*Fe2+*/['s', 's', 's', 's', 'i', 's', 'i', 'w', 'w', 'w', 's', 'i', 'i', 's', 'i',],
  /*Cu2+*/['ss', 's', 's', 'w', 'i', 's', 'i', 'w', 'w', 'w', 's', 'i', 'i', 's', 'i',],
  /*Ca2+*/['i', 's', 's', 's', 'i', 's', 'ss', 's', 'w', 'w', 's', 'r', 'i', 'ss', 'i',],
  /*Be+*/['s', 's', 's', 'r', 'w', 'w', 'w', 'w', 'w', 'w', 's', 'r', 'w', 's', 'w',],
  /*Ba2+*/['ss', 's', 's', 's', 'i', 's', 's', 's', 'w', 'w', 's', 'r', 'i', 'i', 'w',],
  /*NH4+*/['s', 's', 's', 's', 's', 's', 's', 's', 'w', 's', 's', 'w', 's', 's', 's',],
  /*Al3+*/['s', 's', 's', 'x', 'w', 's', 'i', 'w', 'w', 'w', 's', 'r', 'i', 's', 'i',],
    ],
    solubilityexplain: {
      's': ['溶','S','#99ccff', '可溶于水',],
      'i': ['不','I','#ccccff', '不溶于水',],
      'ss': ['微','sS','#ffcccc', '微溶于水',],
      'w': ['-','?','#f8f9fa', '不可用',],
      'r':['反应','R','#cccccc','和水发生反应'],
      'x': ['X','X', '#cccccc','其他',],
    },
    navigationBarData: {
      "full": true,  //wdith满宽，及box-shadow阴影
      "info": [   //控制按钮列表，比如 返回、主页
        {
          "tem": "navigationBack",
        }, {
          "tem": "navigationTitle",
          "data": {
            "title": "溶解性表",
          }
        },
      ],
      "bd": "",    //navigationBar的样式
      "color": "white",    //white black,图标及字体的颜色
      "maskStyle": "background-color:#333;opacity:0.614;"
    },
    theme:'ui',
  },
  onLoad: function () {
    
    let appTheme = app.globalData.theme;
    let theme = '';
    switch (appTheme){
      case "default-light":
        theme = 'ui-w';
        break;
      case "default-dark":
      default:
        theme = 'ui';
        break;
    }

    this.setData({
      systemInfo:app.globalData.systemInfo,
      theme:theme
    })
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
