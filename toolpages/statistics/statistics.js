const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootPath: '../../../../',
    system:null,
    subNavSelected:'1',
    contrastInput:'',
    statisticsInput:'',
    statisticalData:[],
    contrastingData:[],
    checkData:[],
    detailData:[['01','吕布'],['02','关羽'],['03','赵云']],
    theme:'ui-w'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let contrastInput = wx.getStorageSync('contrastInput');
    this.setData({
      systemInfo:app.globalData.systemInfo,
      contrastInput:contrastInput
    })
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

  navigateToBack: function () {
    wx.navigateBack()
  },

  // 将表格数组补平
  tableDataPatch:function(data){
    let dataLengthList = data.map((value)=>{return value.length});
    dataLengthList.sort();
    let columnNum = dataLengthList[dataLengthList.length - 1];
    if(dataLengthList[0] == columnNum){
      return data;
    }else{
      // 补平空缺
      dataLengthList.map((v,i)=>{
        if(data[i].length < columnNum){
          let length = data[i].length;
          data[i][columnNum-1] = '';
          data[i].fill('', length, columnNum-1)
        }
      });
      return data;
    }
  },

  // 检测设置表头
  setTableHead:function(data){

  },

  // 差异检测
  differenceDetect:function(contrastData, data, contrastPrimaryKey=0,primaryKey=0){
    let c_pList = contrastData[contrastPrimaryKey];
    let pList = data[primaryKey];

    // 获取存在(索引)和增加(i)的项
    let dif = pList.map((v)=>{
      let i =  c_pList.findIndex(v);
      if(i == -1){
        i = 'i'
      }
      return i;
    });
    // 获取缺少(d)的项
    let def_decrease =[]
    c_pList.map((v,index)=>{
      let i = pList.findIndex(v);
      if(i == -1){
        def_decrease.push(index);
      }
    });

    var difDetailData = [];
    var difMarkData = [];

    if(data.length == contrastData.length){
      // 列数相同 对比详细数据
      dif.map((v,i)=>{
        if(v != 'i'){
          for(let i=0; i < data.length; i++){
            if(i = primaryKey){
              // 主键列 不用对比

              continue;
            }
            // 检测该列数据类型

            // 遍历列
            if(data[i][0] ==contrastData[i][0]){
              // 表头值相同
              
            }else{
              //表头字段不相同

            }
          }
        }
      });
    }else{
      // 列数不同

    }

    


  },

  // 检测列数据类型
  dataTypeDetect:function(columnData){
    // 数字 百分比 科学计数 金额 日期 时间（12：00） 地点（省份） 泛布尔（同意，不同意， 有，无，）   
    const pattern = [[/^\d*\.*\d*$/,'number'],[/^\d*\.*\d*%$/,'percentage'],[/^\d*\.*\d*[Ee]\d+$/,''],[/ /,'ScientificCounting'],[/^[\$￥]\d*\.*\d*$/,'money'],[/(^1(?=[12])\d|^[1-9]|^0[1-9])[\/\\ ](?:[12](?=\d)\d$|[1-9]$|0[1-9]$|3(?=[01])\d$)/,'date'],[/(^[01](?=\d)\d|^[1-9]|^2(?=[0-3])\d)[:：](?:[0-5](?=\d)\d$|[1-9]$)/,'time'],[/ /,'']];

    if(/\d/.test()){
      //含有数字

    }else{
      
    }
  }, 

  handleContrastInputConfirm:function(e){
      let inputValue = e.detail.value;
      inputValue = inputValue.trim();
      let contrastList = inputValue.split(/[\n]/);

      // let detailData = this.data.detailData;
      let contrastingData = contrastList.map((value)=>{return value.split(/ +/)});
      contrastingData = this.tableDataPatch(contrastingData);
      this.setData({
        contrastingData:contrastingData,
        contrastInput:inputValue
      })
      wx.setStorageSync('contrastInput',inputValue);
  },

  handleStatisticsInputConfirm:function(e){
    let inputValue = e.detail.value;
    inputValue = inputValue.trim();
    let statisticsList = inputValue.split(/[\n]/);

    // let detailData = this.data.detailData;
    let statisticalData = statisticsList.map((value)=>{return value.split(/ +/)});
    statisticalData = this.tableDataPatch(statisticalData);
    this.setData({
      statisticalData:statisticalData,
      statisticsInput:inputValue
    })
  },

  handleTapSubNav:function(e){
    let index = e.currentTarget.dataset.index;
    if(!index) return;
    this.setData({
      subNavSelected:index
    })
  }
  
})