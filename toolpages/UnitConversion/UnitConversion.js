// pages/menupage/tool/pages/UnitConversion/UnitConversion.js
const app = getApp()

//记录上次pickerValue值
var lastValue = null
//记录当前操作的转换框ID
var currentConversionBoxID = null
//记录当前Input框ID
var currentInputBoxID = 0
//记录当前的 转换单位 的一般值,例如，输入1m, 即为1, 输入1dm,即为0.1
var currentMeasure = null

//记每种单位所显示的单位的单位索引， 当前值储存在 this.data.showValue[1] 中
var unitShowValueList = [
  [[0, 0], [1, 0], [1, 1], [1, 2], [2, 3]],  //1 长度   应在 showValue[1] 中
  [[0, 0], [0, 3], [0, 5], [1, 0], [2, 1]],  //2 质量
  [[0, 0], [0, 2], [0, 3], [2, 0], [2, 1]],  //3 面积
  [[0, 0], [0, 4], [0, 6], [1, 5], [1, 6]],  //4 体积
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],  //5 温度
  [[0, 0], [0, 4], [0, 5], [0, 11], [0, 9]],  //6 压力
  [[0, 0], [0, 1], [0, 2], [0, 5], [0, 3]],  //7 速度
  [[0, 0], [0, 2], [0, 7], [0, 8], [0, 4]],  //8 功能热
  [[0, 0], [0, 8], [0, 5], [0, 9], [0, 2]],  //9 功率
  [[0, 3], [0, 4], [0, 5], [0, 6], [0, 2]],  //10 时间
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],  //11 密度
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],  //12 力
  [[0, 3], [1, 0], [0, 4], [0, 5], [0, 0]],  //13 角度
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],  //14 --
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],  //15 --
]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //记录当前的单位类型
    currentUnitID:0,
    //废弃 记录当前单位类型下的单位，二维数组
    currentUnitList:[],
    //记录input输入的值
    //inputValue:1,
    fixedBoxID: 0, //记录当前Input框ID var currentInputBoxID = 0


    //myMultiPicker
    range: [],
    rankTip:['公制', '英制', '市制'],
    isShow:false,
    pickerBoxClass:'width:100%;height:100%;position:relative;z-index:inherit;',
    nowSlideRanK: null,
    
    //0号元素为页面显示单位数值大小，1号元素记录页面各个框所选单位索引，
    showValue: [[1, 0, 0, 0, 0], [[0, 0], [1, 0], [1, 1], [1, 2], [2, 3]]],
    systemInfo:null,

    //单位列表，元素为单位对象
    UnitList:[
      {
        'UnitKindName':'长度',
        //以米为参照转换
        'Unit': [
          [
            //公制
            {
              'zhName':'米',
              'sign':'m',
              'rate': 1,
              '': '',
            },
            {
              'zhName': '千米',
              'sign': 'km',
              'rate': 1000,
              '': '',
            },
            {
              'zhName': '分米',
              'sign': 'dm',
              'rate': 0.1,
            },
            {
              'zhName': '厘米',
              'sign': 'cm',
              'rate': 0.01,
            },
            {
              'zhName': '毫米',
              'sign': 'mm',
              'rate': 0.001,
            },
            {
              'zhName': '微米',
              'sign': 'um',
              'rate': 0.0000001,
            },
            {
              'zhName': '光年',
              'sign': 'ly',
              'rate': 9460528177426821, //来源维基百科【9,460,528,177,426,821】
            },
            {
              'zhName': '天文单位',
              'sign': 'AU',
              'rate': 149597870700, //来源维基百科【149,597,870,700】
            }
          ],[
            //英制
            {
              'zhName': '英寸',
              'sign': 'in',
              'rate': 0.0254, //来源百度+维基百科【0.0254】
            },
            {
              'zhName': '英尺',
              'sign': 'ft',
              'rate': 0.3048, //来源百度【0.3048】
            },
            {
              'zhName': '码',
              'sign': 'yd',
              'rate': 0.9144, //来源百度+维基百科【0.9144】
            },
            {
              'zhName': '英里',
              'sign': 'mi',
              'rate': 1609.344, //来源百度【1609.344】
            },
            {
              'zhName': '海里',
              'sign': 'nmi',
              'rate': 1852, //来源百度 【1852】
            },
            {
              'zhName':'英寻',
              'sign': 'fm',
              'rate': 1.8288, //来源百度 【1.8288】
            },
            {
              'zhName': '弗隆',
              'sign': 'fur',
              'rate': 201.168, //来源百度 【201.168】
            },
          ],[
            //市制
            {
              'zhName': '里',
              'sign': '',
              'rate': 500, //来源百度 【500】
            },
            {
              'zhName': '丈',
              'sign': '',
              'rate': 3.3333333, //来源百度 【3.3333333】
            },
            {
              'zhName': '尺',
              'sign': '',
              'rate': 0.3333333, //来源百度 【0.3333333】
            },
            {
              'zhName': '寸',
              'sign': '',
              'rate': 0.0333333, //来源百度 【0.0333333】
            },
            {
              'zhName': '分',
              'sign': '',
              'rate': 0.0033333, //来源百度 【0.0033333】
            },
            {
              'zhName': '厘',
              'sign': '',
              'rate': 0.0003333, //来源百度 【0.0003333】
            },
            {
              'zhName': '毫',
              'sign': '',
              'rate': 0.0000333, //来源百度 【0.0000333】
            }
          ],],
      },
      {
        'UnitKindName':'质量',
        //以千克kg为参照转换
        'Unit':[
          [
            //公制
            {
              'zhName':'千克',
              'sign': 'kg',
              'rate': 1,
            },
            {
              'zhName': '克',
              'sign': 'g',
              'rate': 0.001,
            },
            {
              'zhName': '毫克',
              'sign': 'mg',
              'rate': 0.000001, //【0.000001】
            },
            {
              'zhName': '吨',
              'sign': 't',
              'rate': 1000,
            },
            {
              'zhName': '公担',
              'sign': 'q',
              'rate': 100,
            },
            {
              'zhName': '克拉',
              'sign': 'ct',
              'rate': 0.0002, //来源百度 【0.0002】
            },
            /*
            {
              'zhName': '原子质量单位',
              'sign': 'u',
              'rate':0, //来源维基百科 【1.66×10^−27】
            },
            */
          ],
          [
            //英制
            {
              'zhName': '磅',
              'sign': 'lb',
              'rate': 0.4535924, //来源百度 【0.4535924】
            },
            {
              'zhName': '盎司',
              'sign': 'oz',
              'rate': 0.0283495, //来源百度 【0.0283495】
            },
            {
              'zhName': '克拉',
              'sign': 'ct',
              'rate': 0.0002, //来源百度 【0.0002】
            },
            {
              'zhName': '格令',
              'sign': 'gr',
              'rate': 0.0000648, //来源百度 【0.0000648】
            },
            {
              'zhName': '长吨',
              'sign': 'lt',
              'rate': 1016.0469088, //来源百度 【1016.0469088】
            },
            {
              'zhName': '短吨',
              'sign': 'st',
              'rate': 907.18474, //来源百度 【907.18474】
            },
            {
              'zhName': '英担',
              'sign': '',
              'rate': 50.8023454, //来源百度 【50.8023454】
            },
            {
              'zhName': '美担',
              'sign': '',
              'rate': 45.359237, //来源百度 【45.359237】
            },

            {
              'zhName': '英石',
              'sign': 'st',
              'rate': 6.3502932, //来源百度 【6.3502932】
            },
            {
              'zhName': '打兰',
              'sign': 'dr',
              'rate': 0.0017718, //来源百度 【0.0017718】
            },
          ],
          [
            //市制
            {
              'zhName': '担',
              'sign': '',
              'rate': 50, //来源百度 【50】
            },
            {
              'zhName': '斤',
              'sign': '',
              'rate': 0.5, //【0.5】
            },
            {
              'zhName': '两',
              'sign': '',
              'rate': 0.05, //【0.05】
            },
            {
              'zhName': '钱',
              'sign': '',
              'rate': 0.005, //【0.005】
            },
          ]
        ]
      },
      {
        'UnitKindName':'面积',
        //以平方米为参照转换
        'Unit':[
          [
            {
              'zhName': '平方米',
              'sign': 'm^2',
              'rate': 1, //【】
            },
            {
              'zhName': '平方千米',
              'sign': 'km^2',
              'rate': 1000000, //【1000000】
            },
            {
              'zhName': '公顷',
              'sign': 'ha',
              'rate': 10000, //来源百度【10000】
            },
            {
              'zhName': '公亩',
              'sign': 'are',
              'rate': 100, //来源百度【100】
            },
            {
              'zhName': '平方分米',
              'sign': 'dm^2',
              'rate': 0.01, //【0.01】
            },
            {
              'zhName': '平方厘米',
              'sign': 'cm^2',
              'rate': 0.0001, //【0.0001】
            },
            {
              'zhName': '平方毫米',
              'sign': 'mm^2',
              'rate': 0.000001, //【0.000001】
            },
          ],
          [
            {
              'zhName': '英亩',
              'sign': 'acre',
              'rate': 4046.8564224, //参考来源 百度【4046.8564224】
            },
            {
              'zhName': '平方英里',
              'sign': 'sq.mi',
              'rate': 2589988.110336, //参考来源 百度【2589988.110336】
            },
            {
              'zhName': '平方码',
              'sign': 'sq.yd',
              'rate': 0.8361274, //参考来源 百度【0.8361274】
            },
            {
              'zhName': '平方英尺',
              'sign': 'sq.ft',
              'rate': 0.092903, //百度【0.092903】
            },
            {
              'zhName': '平方英寸',
              'sign': 'sq.in',
              'rate': 0.0006452, //baidu【0.0006452】
            },
            {
              'zhName': '平方竿',
              'sign': 'sq.rd',
              'rate': 25.2928526, //baidu【25.2928526】
            },
          ],
          [
            {
              'zhName': '顷',
              'sign': '',
              'rate': 66666.6666667, //baidu【66666.6666667】
            },
            {
              'zhName': '亩',
              'sign': '',
              'rate': 666.6666667, //baidu【666.6666667】
            },
            {
              'zhName': '分',
              'sign': '',
              'rate': 66.6666667, //baidu【66.6666667】
            },
            {
              'zhName': '平方尺',
              'sign': '',
              'rate': 0.1111111, //baidu【0.1111111】
            },
            {
              'zhName': '平方寸',
              'sign': '',
              'rate': 0.0011111, //【0.0011111】
            },
          ]]
      },
      {
        'UnitKindName':'体积',
        //以立方米为参照转换
        'Unit':[
          [
            {
              'zhName': '立方米',
              'sign': 'm^3',
              'rate': 1, //【1】
            },
            {
              'zhName': '立方分米',
              'sign': 'dm^3',
              'rate': 0.001, //【0.001】
            },
            {
              'zhName': '立方厘米',
              'sign': 'cm^3',
              'rate': 0.000001, //【0.000001】
            },
            {
              'zhName': '立方毫米',
              'sign': 'mm^3',
              'rate': 1e-9, //【1e-9】
            },
            {
              'zhName': '升',
              'sign': 'L',
              'rate': 0.001, //【0.001】
            },
            {
              'zhName': '分升',
              'sign': 'dL',
              'rate': 0.0001, //【0.0001】
            },
            {
              'zhName': '毫升',
              'sign': 'cL',
              'rate': 1e-6, //【1e-6】
            },
            {
              'zhName': '公石',
              'sign': 'hL',
              'rate': 0.1, //baidu【0.1】
            },
          ],
          [
            //英制液量和干量
            {
              'zhName': '立方英尺',
              'sign': 'cu ft',
              'rate': 0.0283168, //ip138【0.0283168】
            },
            {
              'zhName': '立方英寸',
              'sign': 'cu in',
              'rate': 0.0000164, //ip138【0.0000164】
            },
            {
              'zhName': '立方码',
              'sign': 'cu yd',
              'rate': 0.7645549, //ip138【0.7645549】
            },
            {
              'zhName': '英制加仑',
              'sign': 'uk gal',
              'rate': 0.0045461, //ip138【0.0045461】
            },
            {
              'zhName': '英制液体盎司',
              'sign': 'oz',
              'rate': 0.0000284, //ip138【0.0000284】
            },
            {
              'zhName': '英制桶',
              'sign': '',
              'rate': 0.1156271, //ip138【0.1156271】
            },
            {
              'zhName': '英制品脱',
              'sign': 'pt',
              'rate': 0.0005683, //【0.0005683】
            },
          ],
          [
            //美制液量和干量
            {
            'zhName': '美制液量桶',
            'sign': '',
              'rate': 0.1589873, //ip138【0.1589873】
            },
            {
              'zhName': '美制液量加仑',
              'sign': 'gal',
              'rate': 0.0037854, //【0.0037854】
            },
            {
              'zhName': '美制液量夸脱',
              'sign': 'qt',
              'rate': 0.0009464, //【0.0009464】
            },
            {
              'zhName': '美制液量品脱',
              'sign': 'pt',
              'rate': 0.004732, //【0.004732】
            },
            {
              'zhName': '美制液量及耳',
              'sign': 'gi',
              'rate': 0.0001183, //【0.0001183】
            },
            {
              'zhName': '美制液量盎司',
              'sign': 'oz',
              'rate': 0.0000296, //【0.0000296】
            },
            {
              'zhName': '美制液量打兰',
              'sign': 'dr',
              'rate': 0.0000037, //【0.0000037】
            },
            {
              'zhName': '美制液量量滴',
              'sign': 'min',
              'rate': 4.8134e-10, //【4.8134e-10】
            },
            {
              'zhName': '美制干量桶',
              'sign': '',
              'rate': 0.1156271, //【0.1156271】
            },
            {
              'zhName': '美制干量蒲式耳',
              'sign': 'bu',
              'rate': 0.0352391, //【0.0352391】
            },
            {
              'zhName': '美制干量配克',
              'sign': 'pk',
              'rate': 0.0088098, //【0.0088098】
            },
            {
              'zhName': '美制干量夸脱',
              'sign': 'qt',
              'rate': 0.0011012, //【0.0011012】
            },
            {
              'zhName': '美制干量品脱',
              'sign': 'pt',
              'rate': 0.0005506, //【0.0005506】
            },
            {
              'zhName': '美制烹调汤勺',
              'sign': '',
              'rate': 0.0000148, //【0.0000148】
            },
            {
              'zhName': '美制烹调调羹',
              'sign': '',
              'rate': 0.0000049, //【0.0000049】
            },
            {
              'zhName': '美制烹调杯',
              'sign': '',
              'rate': 0.0002366, //【0.0002366】
            },
          ],
          [
            //其他
            {
              'zhName': '公制烹调汤勺',
              'sign': '',
              'rate': 0.000015, //【0.000015】
            },
            {
              'zhName': '公制烹调调羹',
              'sign': '',
              'rate': 0.000005, //【0.000005】
            },
          ]
        ]
      },
      {
        'UnitKindName': '温度',
        //以摄氏度为参照转换
        'Unit': [
          [
            {
              'zhName': '摄氏度',
              'sign': '℃',
              'rate': 1, //【1】
            },
            {
              'zhName': '开氏度',
              'sign': 'K',
              'rate': 1, //【1】
              'addConst':273.15, //转换函数中添加判断解析
            },
            {
              'zhName': '华氏度',
              'sign': '℉',
              'rate': 0.5555555555555, //【0】
              'addConst':32
            },
            {
              'zhName': '兰氏度', //Tr = (Tc + 273.15)*1.8
              'sign': '°R',
              'rate': 1.8, //参考来源 维基百科【1.8】
              'addConst':491.67
            },
            {
              'zhName': '列氏度',
              'sign': '°Ré',
              'rate': 1.25, //【1.25】
            },
          ],
        ]
      },
      {
        'UnitKindName':'压力',
        //以帕斯卡为参照转换
        'Unit':[
          [
            {
              'zhName': '帕斯卡',
              'sign': 'Pa',
              'rate': 1, //【0】
            },
            {
              'zhName': '兆帕',
              'sign': 'MPa',
              'rate': 1000000, //【0】
            },
            {
              'zhName': '千帕',
              'sign': 'kPa',
              'rate': 1000, //【0】
            },
            {
              'zhName': '百帕',
              'sign': 'hPa',
              'rate': 100, //【0】
            },
            {
              'zhName': '标准大气压',
              'sign': 'atm',
              'rate': 101325, //【0】
            },
            {
              'zhName': '毫米汞柱',
              'sign': 'mmHg',
              'rate': 133.3223684, //【0】
            },
            {
              'zhName': '英寸汞柱',
              'sign': 'in Hg',
              'rate': 3386.3881579, //【0】
            },
            {
              'zhName': '巴',
              'sign': 'bar',
              'rate': 100000, //【0】
            },
            {
              'zhName': '毫巴',
              'sign': 'mba',
              'rate': 100, //【0】
            },
            {
              'zhName': '磅力/平方英尺',
              'sign': 'psf',
              'rate': 47.8802569, //【0】
            },
            {
              'zhName': '磅力/平方英寸',
              'sign': 'psi',
              'rate': 6894.757, //【0】
            },
            {
              'zhName': '毫米水柱',
              'sign': '',
              'rate': 9.8066136, //【0】
            },
            {
              'zhName': '公斤力/平方厘米',
              'sign': 'kgf/cm^2',
              'rate': 98066.5, //【0】
            },
            {
              'zhName': '公斤力/平方米',
              'sign': 'kgf/m^2',
              'rate': 9.80665, //【0】
            },
          ],
        ]
      },
      {
        'UnitKindName': '速度',
        //以米/秒为参照转换
        'Unit': [
          [
            {
              'zhName': '米/秒',
              'sign': 'm/s',
              'rate': 1, //【0】
            },
            {
              'zhName': '千米/秒',
              'sign': 'km/s',
              'rate': 1000, //【0】
            },
            {
              'zhName': '千米/时',
              'sign': 'km/h',
              'rate': 0.27777777777777, //【0】
            },
            {
              'zhName': '光速',
              'sign': 'c',
              'rate': 299792458, //【0】
            },
            {
              'zhName': '马赫',
              'sign': 'mach',
              'rate': 340.3, //【0】
            },
            {
              'zhName': '英里/时',
              'sign': 'mile/h',
              'rate': 0.44704, //【0】
            },
            {
              'zhName': '英寸/秒',
              'sign': 'in/s',
              'rate': 0.0254, //【0】
            },
          ],
        ]
      },
      {
        'UnitKindName': '功 能 热',
        //以焦耳为参照转换
        'Unit': [
          [
            {
              'zhName': '焦耳',
              'sign': 'J',
              'rate': 1, //【0】
            },
            {
              'zhName': '千焦',
              'sign': 'kJ',
              'rate': 1000, //【0】
            },
            {
              'zhName': '卡',
              'sign': 'cal',
              'rate': 4.1858518, //【0】
            },
            {
              'zhName': '千卡',
              'sign': 'kcal',
              'rate': 4185.8518208, //【0】
            },
            {
              'zhName': '公斤·米',
              'sign': 'kg·m',
              'rate': 9.8039216, //【0】
            },
            {
              'zhName': '米制马力·时',
              'sign': 'ps·h',
              'rate': 2647795.5, //【0】
            },
            {
              'zhName': '英制马力·时',
              'sign': 'hp·h',
              'rate': 2684519.5392, //【0】
            },
            {
              'zhName': '千瓦·时',
              'sign': 'kW·h',
              'rate': 3600000, //【0】
            },
            {
              'zhName': '度',
              'sign': 'kW·h',
              'rate': 3600000, //【0】
            },
            {
              'zhName': '英热单位',
              'sign': 'btu',
              'rate': 1055.0558526, //【0】
            },
            {
              'zhName': '英尺·磅',
              'sign': 'ft·lb',
              'rate': 1.3557484, //【0】
            },
          ],
        ]
      },
      {
        'UnitKindName': '功率',
        //以瓦为参照转换
        'Unit': [
          [
            {
              'zhName': '瓦',
              'sign': 'W',
              'rate': 1, //【0】
            },
            {
              'zhName': '千瓦',
              'sign': 'kW',
              'rate': 1000, //【0】
            },
            {
              'zhName': '英制马力',
              'sign': 'hp',
              'rate': 745.699872, //【0】
            },
            {
              'zhName': '米制马力',
              'sign': 'ps',
              'rate': 735.49875, //【0】
            },
            {
              'zhName': '公斤·米/秒',
              'sign': 'kg·m/s',
              'rate': 9.80665, //【0】
            },
            {
              'zhName': '千卡/秒',
              'sign': 'kcal/s',
              'rate': 4184.1004, //【0】
            },
            {
              'zhName': '英热单位',
              'sign': 'Btu/s',
              'rate': 1055.05585, //【0】
            },
            {
              'zhName': '英尺·磅/秒',
              'sign': 'ft·lb/s',
              'rate': 1.3558179, //【0】
            },
            {
              'zhName': '焦耳/秒',
              'sign': 'J/s',
              'rate': 1, //【0】
            },
            {
              'zhName': '牛顿·米/秒',
              'sign': 'N·m/s',
              'rate': 1, //【0】
            },
          ],
        ]
      },
      {
        'UnitKindName': '时间',
        //以秒为参照转换
        'Unit': [
          [
            {
              'zhName': '年',
              'sign': 'y',
              'rate': 31536000, //【0】
            },
            {
              'zhName': '周',
              'sign': 'week',
              'rate': 604800, //【0】
            },
            {
              'zhName': '天',
              'sign': 'd',
              'rate': 86400, //【0】
            },
            {
              'zhName': '时',
              'sign': 'h',
              'rate': 3600, //【0】
            },
            {
              'zhName': '分',
              'sign': 'min',
              'rate': 60, //【0】
            },
            {
              'zhName': '秒',
              'sign': 's',
              'rate': 1, //【0】
            },
            {
              'zhName': '毫秒',
              'sign': 'ms',
              'rate': 0.001, //【0】
            },
            {
              'zhName': '微秒',
              'sign': 'μs',
              'rate': 1e-6, //【0】
            },
            {
              'zhName': '纳秒',
              'sign': 'ns',
              'rate': 1e-9, //【0】
            },
          ],
        ]
      },
      {
        'UnitKindName': '密度',
        //以千克/立方米为参照转换
        'Unit': [
          [
            {
              'zhName': '千克/立方米',
              'sign': 'kg/m³',
              'rate': 1, //【0】
            },
            {
              'zhName': '千克/立方分米',
              'sign': 'kg/dm³',
              'rate': 1000, //【0】
            },
            {
              'zhName': '千克/立方厘米',
              'sign': 'kg/cm³',
              'rate': 1000000, //【0】
            },
            {
              'zhName': '克/立方厘米',
              'sign': 'g/cm³',
              'rate': 1000, //【0】
            },
            {
              'zhName': '克/立方分米',
              'sign': 'g/dm³',
              'rate': 1, //【0】
            },
            {
              'zhName': '克/立方米',
              'sign': 'g/m³',
              'rate': 0.001, //【0】
            },
          ],
        ]
      },
      {
        'UnitKindName': '力',
        //以牛为参照转换
        'Unit': [
          [
            {
              'zhName': '牛',
              'sign': 'N',
              'rate': 1, //【0】
            },
            {
              'zhName': '千牛',
              'sign': 'kN',
              'rate': 1000, //【0】
            },
            {
              'zhName': '千克力',
              'sign': 'kgf',
              'rate': 9.80665, //【0】
            },
            {
              'zhName': '克力',
              'sign': 'gf',
              'rate': 0.0098067, //【0】
            },
            {
              'zhName': '公吨力',
              'sign': 'tf',
              'rate': 9806.65, //【0】
            },
            {
              'zhName': '磅力',
              'sign': 'lbf',
              'rate': 4.448222, //【0】
            },
            {
              'zhName': '千磅力',
              'sign': 'kip',
              'rate': 4448.221615, //【0】
            },
            {
              'zhName': '达因',
              'sign': 'dyn',
              'rate': 0.00001, //【0】
            },
          ],
          [
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
          ],
        ]
      },
      {
        'UnitKindName': '角度',
        //以角度为参照转换
        'Unit': [
          [
            {
              'zhName': '圆周',
              'sign': '',
              'rate': 360, //【0】
            },
            {
              'zhName': '直角',
              'sign': '',
              'rate': 90, //【0】
            },
            {
              'zhName': '百分度',
              'sign': 'gon',
              'rate': 0.9, //【0】
            },
            {
              'zhName': '度',
              'sign': '°',
              'rate': 1, //【0】
            },
            {
              'zhName': '分',
              'sign': '′',
              'rate': 0.016666666666666666, //【0】
            },
            {
              'zhName': '秒',
              'sign': '″',
              'rate': 0.000277777777777, //【0】
            },
          ],
          [
            {
              'zhName': '弧度',
              'sign': 'rad',
              'rate': 57.29578, //【0】
            },
            {
              'zhName': '毫弧度',
              'sign': 'mrad',
              'rate': 0.0572958, //【0】
            },
          ],
        ]
      },
      /*
      {
        'UnitKindName': '',
        'showValueIndex':[[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
        //以为参照转换
        'Unit': [
          [
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
          ],
          [
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
            {
              'zhName': '',
              'sign': '',
              'rate': 0, //【0】
            },
          ],
        ]
      },
      */
    ],

    theme:'ui',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('单位转换页面加载中，调用switchUnitKind()函数，此函数中调用doConversion()转换函数')
    //this.doPickerArray()
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
      systemInfo: app.globalData.systemInfo,
      theme:theme
    })

    this.switchUnitKind()
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

  navigateToBack:function(){
    wx.navigateBack({})
  },

  //切换单位类型 进入页面调用一次
  switchUnitKind:function(e){
    try{
      var unitID = e.currentTarget.dataset.id
    }catch(e){
      var unitID = 0
      //console.log('=======================================')
    }
    console.log(unitID)
    //记录上个单位类型显示单位数据
    unitShowValueList[this.data.currentUnitID] = this.data.showValue[1]

    //刷新当前单位类型
    this.setData({
      currentUnitID:unitID,
      range: this.data.UnitList[unitID]['Unit'],
    })
    //调用转换函数 --  bug：直接调用会出错，每个单位的数据结构不大相同，当前所选单位在另一个单位下可能不存在
                      //解决方法，切换单位种类时，不直接用之前的选择，单独保存，单独赋值，

    var unitShowValueIndex = 'showValue[1]'
    this.setData({
      [unitShowValueIndex]: unitShowValueList[this.data.currentUnitID]
    })

    this.doConversion()
  },


  fixedInputBoxId:function(e){
    var index = e.currentTarget.dataset.index
    currentInputBoxID = index
    this.setData({
      fixedBoxID:index
    })
  },

  //input函数
  inputChange:function(e){
    //当前操作的inpupt框ID
    currentInputBoxID = e.currentTarget.dataset.index
    console.log('输入值'.concat(e.detail.value))
    var currentInputValue = 'showValue[0][' + currentInputBoxID + ']'
    this.setData({
      [currentInputValue]: e.detail.value,
      fixedBoxID: currentInputBoxID
    })
    //调用转换函数
    this.doConversion()
  },


  //转换函数
  doConversion:function(){
    /*-------注意input框的值应在转换中作为不变的值，而非当前操作的转换框中的值，所以增加currentInputBoxID变量记录上一次input框ID-------*/
    //当前的单位一般值
    //单位转换 常数计算 addContst
    if (this.data.UnitList[this.data.currentUnitID]['Unit'][this.data.showValue[1][currentInputBoxID][0]][this.data.showValue[1][currentInputBoxID][1]]['addConst']){
      var addConst = this.data.UnitList[this.data.currentUnitID]['Unit'][this.data.showValue[1][currentInputBoxID][0]][this.data.showValue[1][currentInputBoxID][1]]['addConst']
    }else{
      var addConst = 0
    }

    currentMeasure = (this.data.showValue[0][currentInputBoxID] - addConst) * this.data.UnitList[this.data.currentUnitID]['Unit'][this.data.showValue[1][currentInputBoxID][0]][this.data.showValue[1][currentInputBoxID][1]]['rate']

    console.log(this.data.showValue[1][currentInputBoxID][0])
    console.log(currentInputBoxID)
    for(var i in this.data.showValue[0]){
      //换算
      console.log(i)
      console.log(i)
      var addConst = 0
      /*try{
        var addConst = this.data.UnitList[this.data.currentUnitID]['Unit'][this.data.showValue[1][i][0]][this.data.showValue[1][i][1]]['addConst']
      }catch(e){
        var addConst = 0
      }*/
      if (this.data.UnitList[this.data.currentUnitID]['Unit'][this.data.showValue[1][i][0]][this.data.showValue[1][i][1]]['addConst']){
        var addConst = this.data.UnitList[this.data.currentUnitID]['Unit'][this.data.showValue[1][i][0]][this.data.showValue[1][i][1]]['addConst']
      }

      var eachValue = 'showValue[0][' + i +']'
      try{
        var conversion_rusult = currentMeasure / this.data.UnitList[this.data.currentUnitID]['Unit'][this.data.showValue[1][i][0]][this.data.showValue[1][i][1]]['rate'] + addConst
        conversion_rusult = conversion_rusult//.toFixed(4)//.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        
        //显示格式
        if (conversion_rusult < 1){
          //小于1
          conversion_rusult = conversion_rusult.toPrecision(6)
        } else if (conversion_rusult < 1000000000){
          conversion_rusult = conversion_rusult.toFixed(6)
        } else if (conversion_rusult > 1000000000){
          conversion_rusult = conversion_rusult.toPrecision(6)
        }

        this.setData({
          [eachValue]: conversion_rusult
        })
      }catch(e){
        this.setData({
          [eachValue]:'--'
        })
      }

    }

  },

/*
  //废弃 微信MultiPicker调用 其中 showValue[1]含义已变更
  pickerValueChange:function(event){
    //console.log(this.data.showValue[1])
    console.log(event.detail)
    console.log(event.currentTarget.dataset.index)
    if (event.detail.column==0){
      //var showValueB = showValue[1][event.currentTarget.dataset.index]
      this.setData({
        'showValue[1][0]':'[event.detail.value,0,0]'
      })
    }else if(event.detail.column==1){
      this.setData({
        'showValue[1][0]': '[0,event.detail.value, 0]'
      })
    } else if (event.detail.column == 2){
      this.setData({
        'showValue[1][0]': '[0,0,event.detail.value]'
      })
    }
  },
*/

  //myMultiPicker滑动选择器事件
  myMultiPickerBindChange: function (event) {
    console.log(event.detail)
    var nowValue = event.detail.value  //value值为数组

    //非首次滑动选择 （滑动选择器）
    if (lastValue != null) {
      // 循环 判断滑动列，并赋值给nowSlideRank
      for (var i in lastValue) {
        console.log('for i in lastValue')
        if (lastValue[i] != nowValue[i]) {
          if (this.data.nowSlideRank != i) {
            this.setData({
              nowSlideRank: i,
            })
            break
          }
        }
      }

      var showValueCurrent = 'showValue[1][' + currentConversionBoxID + ']'
      this.setData({
        [showValueCurrent]: [this.data.nowSlideRank,nowValue[this.data.nowSlideRank]],
      })
      /*'showValue[2][currentConversionBoxID]': this.data.UnitList[this.showValue[1][currentConversionBoxID][0]][this.showValue[1][currentConversionBoxID][1]][this.showValue[1][currentConversionBoxID][2]],*/

      lastValue = event.detail.value


    } else {
      //首次滑动选择
      //循环判断当前滑动选择器滑动 列/项 ，并赋值
      for (var i in nowValue) {
        if (nowValue[i] != 0) {
          if (this.data.nowSlideRank != i) {
            this.setData({
              nowSlideRank: i,
            })
            break
          }
        }
      } 

      var showValueCurrent = 'showValue[1]['+currentConversionBoxID+']'
      this.setData({
        [showValueCurrent]: [this.data.nowSlideRank, nowValue[this.data.nowSlideRank]],
      })

    }

    lastValue = event.detail.value
    // //console.log(this.data.nowSlideRank)
    // var myEventDetail = { 'value': [parseInt(this.data.nowSlideRank), nowValue[this.data.nowSlideRank]] }
    // var myEventOption = {}
    // //this.triggerEvent('change', myEventDetail, myEventOption)

    //调用转换函数
    this.doConversion()
  },


  showMyMultiPicker: function (e) {
    currentConversionBoxID = e.currentTarget.dataset.index
    console.log(currentConversionBoxID)
    this.setData({
      isShow: true,
    })
  },


  hideMyMultiPicker:function () {
    console.log('hideMultiPicker')
    this.setData({
      isShow: false,
    })
  },
//myMultiPicker




  //废弃  根据【currentUnitID】组合二维数组【currentUnitList】，二维数组用于picker选择，顺序和原数据保持一致
  doPickerArray:function(){
    console.log('function: doPickerArray()')
    console.log(this.data.UnitList[this.data.currentUnitID]['Unit'])
    //通过判断数组的第一个元素的长度来判断数组维数
    if (this.data.UnitList[this.data.currentUnitID]['Unit'][0].length>=0){
      //二维数组+
      //console.log('二维数组+')
      for (var i = 0; i<this.data.UnitList[this.data.currentUnitID]['Unit'].length;i++){
        this.data.currentUnitList.push([])
        for (var n = 0; n < this.data.UnitList[this.data.currentUnitID]['Unit'][i].length;n++){
          this.data.currentUnitList[i].push(this.data.UnitList[this.data.currentUnitID]['Unit'][i][n]['zhName'])
          //console.log(this.data.UnitList[this.data.currentUnitID]['Unit'][i][n]['zhName'])
        }
      }
    }else{
      //一维数组
      //console.log('一维数组')
      for (var n = 0; n <this.data.UnitList[this.data.currentUnitID]['Unit'].length; n++){
        this.data.currentUnitList.push(this.data.UnitList[this.data.currentUnitID]['Unit'][n]['zhName'])
        //console.log(this.data.UnitList[this.data.currentUnitID]['Unit'][n]['zhName'])
      }
    }
    //console.log('currentUnitList')
    //console.log(this.data.currentUnitList)
  }
})