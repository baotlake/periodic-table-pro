// pages/detail/explain/explain.js
var EGeneral= [
  [['indexI', '概述']], [
    ['indexII', '元素概述'], ['textA', '化学元素是根据原子核电荷的多少对原子进行分类的一种方法，把核电荷数相同的一类原子称为一种元素。截至到2010年，有118种已分离的元素，其中自然界中存在的有94种；其余的是人工合成元素,这些都是半衰期很短的放射性元素，很难在自然界稳定存在。'], ['indexII', '原子序数'], ['textA', '原子序数是原子核内质子的数量，原子序数相同的原子属于同一种元素。原子序数的符号是Z。一般原子序数写在原子的左下方。'], ['indexII', '质量数'], ['textA', '质量数是指中性原子的原子核内，质子数量和中子数量的和，质量数的数值都是整数。质量数一般标在元素的左上方。'],
  ]
];
var Groups=[
  [['indexII', '族']], [[
    'textA', '\"族\"指的是周期表中的一列'
  ], ['textB', '']]
];
var Periods = [[['indexII', '周期']], [['textA','\"周期\"指的是周期表中的一行。'],['textA','']]

];

//区
var Blocks=[
  [['indexII', '区']], [['textA', '区'], ['textA', '根据元素外层价电子构型的不同，周期表可以分成几个区；同一区里的元素，其填在最高能级上的电子的亚层轨道类型是相同的。分区的名称就是根据轨道的名称定的。s区元素主要包括元素周期表中IA族元素、IIA族元素以及元素氦；p区元素指的是元素具有最高能量的电子是排布在p轨道上的元素，包括元素周期表中IIIA族元素~VIIIA族元素(VIIIA族元素不包括氦)。d区元素是元素週期表中的副族元素，即第3至第12族元素。这些元素中具有最高能量的电子是填在d轨道上的。f区元素指的是元素週期表中的镧系元素和锕系元素。大多数元素具有最高能量的电子是排布在f轨道上的。ds区元素是指元素周期表中的ⅠB、ⅡB两族元素，包括铜、银、金、锌、镉、汞6种自然形成的金属元素和𬬭、鿔2种人工合成元素。ds区的名称是因为它们的电子构型都是d10s1（ⅠB）或d10s2（ⅡB）。'],['','']]
];

//电子排布
var Electron = [['indexII', '电子排布'], [['indexII', '电子排布'],['textA','电子排序，即电子组态，亦即电子构型，指电子在原子、分子或其他物理结构中的每一层电子层上的排序及排列形态。'],['','']]

];

//元素类别
var ElementCategory=[
  [['indexII','元素类别']],[['indexII','元素类别'],['textA','\"元素类别\"是元素的一种分类方法，']]
]


var PhysicalProperties=[[['indexI','物理性质']],[['indexII','物理性质'],['textA','']]]

//相、物态
var Phase =[]

//熔点
var MeltingPoint =[]

//沸点
var BoilingPoint = [];

//密度
var Density =[]

//原子性质
var AtomicProperties=[]


//氧化态
var OxidationStates=[]

//电负性
var Electronegativity=[]

//共价半径
var CovalentRadius=[]

//晶体结构
var CrystalStructure =[]


var CASNumber =[]


var Discovery = []


var NamedBy=[]




var SUMx=0;
var lastX = null;

Page({


  /**
   * 页面的初始数据
   */
  data: {
    rootPath:'../../',
    explain:[
      EGeneral,
      Groups,
      Blocks,
      
    ],
  

    showExplainIndex:0,
    indexX:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

/**拖动Index */
  indexBindChange:function(e){
    //console.log(e.detail)
    if(lastX!=null && e.detail.source=='touch'){
      SUMx += e.detail.x-lastX
      if(SUMx>=5){
        console.log('向左')
        SUMx=0
        this.setData({
          indexX:129
        })
      }else if(SUMx<=-5){
        console.log('向右')
        SUMx = 0
        this.setData({
          indexX:0
        })
      }
    }
    if(e.detail.source=='touch'){
      lastX = e.detail.x
    }
    
  },

/**show /off Index */
  showIndex:function(){
    if(this.data.indexX<=10){
      this.setData({
        indexX:129
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
      indexX: 0,
      showExplainIndex:explainIndex,
    })

  },

  navigationBarBack: function () {
    wx.navigateBack()
  }

})