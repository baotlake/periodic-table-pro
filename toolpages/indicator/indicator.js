const app = getApp()
Page({
  data:{
    rootPath: '../../../../',
    system:null,
    //name zh-name start end from#555 to#666
    para:100,
    indicators:[
      //['英文名','中文名',[1-2，2-3，(两个一组)],[对应PH变化的颜色变化，两个一组],]
      ['Cresol Red','甲酚红',[0.0,1.0],['f00','ff0'],],
      ['Methyl Violet','甲基紫',[0.0,1.6,1.0,1.5],['ff0','00f',],],
      //['Methyl Violet','甲基紫',[0.0,1.6,1.0,1.5],['ff0','00f',],],
      ['Crystal Violet', '结晶紫',[0.0,1.8],['ff0','00f'],],
      ['Ethyl Violet', '乙基紫', [0.0,2.4], ['ff0', '00f'],],
      ['Malachite Green', '孔雀石绿', [0.2,1.8], ['ff0', '0f99b9'],],
      ['Methyl Green', '甲基绿', [0.2,1.8], ['ff0', '00f'],],
      ['2-(p-Dimethylaminophenylazo)pyridine', '2-（对二甲基氨基苯偶氮）吡啶', [0.2,1.8], ['ff0', 'f00'],],
      ['Paramethy Red', 'Paramethy红色', [1.0,3.0], ['f00', 'ff0'],],
      ['Metanil Yellow', 'Metanil黄色', [1.2,2.4], ['f00', 'ff0'],],
      ['4-Phenylazodiphenylamine', '4-苯基偶氮二苯胺', [1.2,2.6], ['f00', 'ff0'],],
    /*1*/
      ['Thymol Blue', '百里酚蓝', [1.2,2.8], ['f00', 'ff0'],],
      ['Metacresol Purple', 'Metacresol紫色', [1.2,2.8], ['f00', 'ff0'],],
      ['Orange IV', '橙色四', [1.4,2.8], ['f00', 'ff0'],],
      ['4-o-Tolylazo-o-toluidine', '4-o - 邻甲苯胺', [1.4,2.8], ['ff7f00', 'ff0'],],
      ['Quinaldine Red', '喹哪啶红', [1.4,3.2], ['fff', 'f00'],],
      ['2,4-Dinitrophenol', '2,4-二硝基苯酚', [2.0,4.7], ['fff', 'ff0'],],
      ['Erythrosin,disodium salt', '赤藓红，二钠盐', [2.2,3.6], ['ff7f00', 'f00']],
      ['Benzopurpurine 4B', '苯并嘌呤4B', [2.2,4.2], ['8f00ff', 'f00']],
      ['N,N-Dimethyl-p-(m-tolylazo) aniline', 'N，N-二甲基对（间 - 甲苯偶氮）苯胺', [2.6,4.8], ['f00', 'ff0']],
      ['p-Dimethylaminoazobenzene', '对二甲氨基偶氮苯', [2.8,4.4], ['f00', 'ff0']],
    /*2*/
      ['Methyl yellow','甲基黄',[2.9,4.0],['f00','ff0']],
      ["4,4'-Bis(2-amino-1-naphthylazo)-2,2'-stilbenedisulfonic acid", "4,4'-双(2-氨基-1-萘基偶氮-2, 2'-s二磺酸", [3.0,4.0], ['ffbfca', 'f00']],
      ['Tetrabromophenolphthalein ethyl ester,potassium salt', '四溴酚酞乙酯钾盐', [3.0,4.2], ['ff0', '00f']],
      ['Bromophenol Blue', '溴酚蓝', [3.0,4.6], ['ff0', '00f']],
      ['Congo Red', '刚果红', [3.0,5.0], ['00f', 'f00']],
      ['Methyl Orange', '甲基橙', [3.2,4.4], ['f00', 'ff0']],
      ['Ethyl Orange', '乙基橙', [3.4,4.8], ['f00', 'ff0']],
      ['4-(4-Dimethylamino-1-naphylazo)-3-methoxybenzenesulfonic acid', '4-（4-二甲基氨基-1-萘基偶氮）-3-甲氧基苯磺酸', [3.5,4.8], ['9208fe', 'ff0']],
      ['Bromocresol Green', '溴甲酚绿', [3.8,5.4], ['ff0', '00f']],
      ['4-Phenylazo-1-naphthylamine', '4-苯基偶氮-1-萘胺', [4.0,5.7], ['f00', 'ff0']],
    /*3*/
      ['Ethyl Red', '乙基红', [4.0,5.8], ['fff', 'f00'],],
      ['2-(p-Dimethylaminophenylazo)pyridine', '2-（对二甲基氨基苯偶氮基）吡啶', [4.4,5.7], ['f00', 'ff0']],
      ['4-(p-Ethoxyphenylazo)-m-phenylene-diamine monohydrochloride', '4-(对乙氧基苯基偶氮)- 间苯二胺一盐酸盐', [4.4,5.8], ['ff7f00', 'ff0']],
      ['Resorcin Blue', '间苯二酚蓝', [4.4,6.2], ['f00', '00f']],
      ['Alizarin Red S', '茜素红S', [4.6,6.0], ['ff0', 'f00']],
      ['Methyl Red', '甲基红', [4.8,6.0], ['f00', 'ff0']],
      ['Propyl Red', '丙基红', [4.8,6.6], ['f00', 'ff0']],
      ['Bromocresol Purple', '溴甲酚紫', [5.2,6.8], ['ff0', 'bf01fe']],
      ['Chlorophenol Red', '氯酚红', [5.2,6.8], ['ff0', 'f00']],
      ['p-Nitrophenol', '对硝基苯酚', [5.4,6.6], ['fff', 'ff0'],],
    /*4*/
      ['Alizarin', '茜素', [5.6,7.2], ['ff0', 'f00']],
      ['2-(2,4-Dinitrophenylazo)1-naphthol-3,6-disulfonic acid,disodium salt', '2-（2,4-二硝基苯偶氮）-1-萘酚-3,6-二磺酸二钠盐', [6.0,7.0], ['ff0', '00f']],
      ['Bromothymol Blue', '溴百里酚蓝', [6.0,7.6], ['ff0', '00f']],
      ['6,8-Dinitro-2,4-(1H)quinazolinedione', '6,8-二硝基-2,5-二4-（1H）喹唑啉二酮', [6.43,7.99], ['fff', 'ff0'],],
      ['Brilliant Yellow', '亮黄', [6.6,7.8], ['ff0', 'f00']],
      ['phenol Red', '酚红', [6.6,8.0], ['ff0', 'f00']],
      ['Neutral Red', '中性红', [6.8,8.0], ['f00', 'e6ad00']],
      ['m-Nitrophenol', '间硝基苯酚', [6.8,8.6], ['fff', 'ff0'],],
      ['Cresol Red', '甲酚红', [7.0,8.8], ['ff0', 'f00']],
      ['Turmeric(Curcumin)', '姜黄(姜黄素)', [7.4,8.6], ['ff0', 'f00']],
    /*5*/
      ['Metacresol Purple', 'Metacresol紫色', [7.4,9.0], ['ff0', 'bf01fe']],
      ["4,4'-Bis(4-amino-1-naphthylazo)-2,2'-stilbenedisulfonic acid", "4,4'-双(4-氨基-1-萘基偶氮)-2, 2'-芪二磺酸", [8.0,9.0], ['00f', 'f00']],
      ['Thymol Blue', '百里酚蓝', [8.0,9.6], ['ff0', '00f']],
      ['p-Naphtholbenzein', '对萘酚苯酚', [8.2,10.0], ['ff7f00', '00f']],
      ['phenolphthalein', '酚酞', [8.2,10.0], ['fff', 'ffc0cb'],],
      ['o-Cresolphthalein', '邻甲酚酞', [8.2,9.8], ['fff', 'f00'],],
      ['Ethyl bis(2,4-dimethylphenyl)ethanoate', '双（2,4-二甲基苯基）乙酸乙酯', [8.41,9.62], ['fff', '00f'],],
      ['Thymolphthalein', '百里酚酞', [9.4,10.6], ['fff', '00f']],
      ['Alizarin Yellow R', '茜素黄R', [10.1,12.0], ['ff0', 'f00']],
      ['Alizarin', '茜素', [11.0,12.4], ['f00', 'ffbfca']],
    /*6*/
      ['p-(2,4-Dihydroxyphenylazo)benzenesulfonic acid,sodium salt', '对 - （2,4-二羟基苯偶氮）苯磺酸钠盐', [11.4,12.6], ['ff0', 'ff7f00']],
      ["5,5'-Indigodisulfonic acid,disodium salt", "5,5'-吲哚二磺酸二钠盐", [11.43,13.02], ['00f', 'ff0']],
      ['2,4,6-Trinitrotoluene', '2,4,6-三硝基甲苯', [11.5,13.0], ['fff', 'ff8000'],],
      ['1,3,5-Trinitrobenzene', '1,3,5-三硝基苯', [12.0,14.0], ['fff', 'ff8000'],],
      ['Clayton Yellow', '克莱顿黄色', [12.2,13.2], ['ff0', 'e6ae00']],
      ['', '', [], ['', '']],

      ],
      //常用指示剂，第一个元素是数组的长度
    indexlist: [65,[0, 1, 5, 10, 20, 23, 25, 26, 28, 30, 33, 35, 37, 39, 42, 44, 45, 46, 48, 52, 54, 55, 57,62,63]],
    i_listIndex:1,
    navigationBarData: {
      "full": true,  //wdith满宽，及box-shadow阴影
      "info": [   //控制按钮列表，比如 返回、主页
        {
          "tem": "navigationBack",
        }, {
          "tem": "navigationTitle",
          "data": {
            "title": "指示剂",
          }
        },
      ],
      "bd": "",    //navigationBar的样式
      "color": "black",    //white black,图标及字体的颜色
      "maskStyle": ""
    },
    theme:'ui'
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

  switchChange:function(e){
    console.log(e.detail.value)
    if (e.detail.value){
      this.setData({
        i_listIndex:1
      })
    }else{
      this.setData({
        i_listIndex:0
      })
    }
  },

  navigateToBack:function(){
    wx.navigateBack()
  }

})