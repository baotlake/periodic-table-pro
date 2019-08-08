// pages/search/search.js
var getdata = require('../../data/data.js')
const app = getApp()

var CFElemList = []
var setCFElemList=false

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootPath: '../../',
    signColor: {},
    inputValue:'',
    matchElem: [['1', 'H', '氢', '1.00794', 'h'], ['35', 'Br', '溴', '79.904', 'f'],],
    //Chemical Formula
    CF:[['HBr','80.9119'],],
    loadingShow:true,
    inputOpacity:1,
    systemInfo:null,
    hiddenClearIcon:true,
    navigationBarData: {
      "full": false,  //wdith满宽，及box-shadow阴影
      "info": [   //控制按钮列表，比如 返回、主页
        {
          "tem": "navigationBack",
        }, {
          "tem": "searchBoxContent",
          "data": {
            //"title": "搜索",
          }
        },
      ],
      "bd": "",    //navigationBar的样式
      "color": "black",    //white black,图标及字体的颜色
      "maskStyle": "",
      "style":""
    },


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      signColor: getdata.getSignColor(),
      systemInfo: app.globalData.systemInfo,
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
  navigateToBack: function () {
    wx.navigateBack()
  },
  
  input:function(e){
    console.log(e.detail)
    if(e.detail.value){
      this.setData({
        inputOpacity: 1
      })
    }
    if (e.detail.value && this.data.hiddenClearIcon){
      this.setData({
        hiddenClearIcon : false
      })
    } else if (!e.detail.value && !this.data.hiddenClearIcon){
      this.setData({
        hiddenClearIcon : true
      })
    }
  },
  inputFocus:function(){

  },
  clearInput:function(){
    this.setData({
      inputValue:''
    })
  },
  searchGo:function(e){
    console.log(e.detail)
    var word=e.detail.value
    CFElemList=[]
    this.setData({
      loadingShow:false
    })
    var valueList = judgeType(word)
    try{
      this.setPageData(valueList[0], valueList[1])
      console.log(valueList[1])
    }catch(e){
      console.log(e)
    }
    this.setData({
      loadingShow: true
    })
  },

  setPageData:function(who,value){
    if(who=='elem'){
      this.setData({
        matchElem:value
      })
    }else if(who=='cf'){
      this.setData({
        CF:value
      })
    }
    if(setCFElemList){
      console.log('matchelem赋值')
      console.log(CFElemList)
      this.setData({
        matchElem: CFElemList
      })
    }
    this.setData({
      loadingShow: true
    })
  },

  openDetailPage: function (e) {
      console.log('点击元素')
      //console.log(e.currentTarget.dataset.tapordinal)
      getdata.setTapElem(e.currentTarget.dataset.tapordinal)
      wx.navigateTo({
        url: '../detail/detail',
      })
  },


})

function judgeType(word){
  var reNumber = /^[\d|\.]+$/
  var reLetter = /^[A-z]+$/
  //var reChinese = /^[\\u4e00-\\u9fa5]+&/
  var reChinese = /^[^x00-xff]+$/
  var reWord = /^[A-Za-z0-9|\(|\)]+$/
  if (reNumber.test(word)) {
    console.log('数字')
    setCFElemList=true
    if (word.indexOf('.') > 0) {
      console.log('有小数点')
    } else {
      console.log('无小数点')
      return ['elem',[getElem(word,'int')]]
    }
  } else if (reLetter.test(word)) {
    console.log('字母')
    if(word.length>=2){
      setCFElemList=true
      //调用CFCalculate
      return ['cf', CFCalculate(word)]
    }else{
      setCFElemList = false
      return ['elem', [getElem(word, 'letter')]]
    }

  } else if (reChinese.test(word)) {
    console.log('中文')
    setCFElemList = false
    return ['elem',[getElem(word,'chinese')]]
  }else if(reWord.test(word)){
    console.log('单词(字母数字括号)')
    setCFElemList = true
    //调用CFCalculate
    return ['cf', CFCalculate(word)]
  }
}

function matchNumber(word){

}

//匹配元素信息
function getElem(word,wordType){
  if(wordType=='int'){
    console.log(word)
    if (getdata.getElemBoxData(word)!=[]){
      return getdata.getElemBoxData(word)
    }
    //没找到
  }else if(wordType=='chinese'){
    var elemBoxData = getdata.getElemBoxData('all')
    for(var i=1; i<elemBoxData.length;i++){
      console.log(elemBoxData[i])
      if(elemBoxData[i][2]==word){
        return elemBoxData[i]
        break
      }
    }
    //没找到
  }else if(wordType=='letter'){
    var elemBoxData = getdata.getElemBoxData('all')
    for (var i = 1; i <elemBoxData.length; i++) {
      //console.log('调用该getElem')
      //console.log('word:'.concat(word))
      if(!word){
        return false
        break
      }else if (elemBoxData[i][1].toLowerCase() == word.toLowerCase()) {
        CFElemList.push(elemBoxData[i])
        for( var e=0; e<(CFElemList.length-1);e++){
          if(CFElemList[e][0]==elemBoxData[i][0]){
            CFElemList.pop()
          }
        }
        return elemBoxData[i]
        break
      }
    }
    //没找到
  }
  return false
}


//相对分子质量计算
function CFCalculate(word){

  var CFPart = []
  var CFList=[]
  console.log(CFPart)
  var len = word.length
  var partN = 0
  //记录多解未完成部分
  var record = []
  var paramRecord = []
  //对有括号的化学式
  //a(a(aa)3)2aa
  //第0个4表示括号数(all),第1个[]表示每过一个括号，元素总的 括号下标(外下标)的值，
  //第2个记录括号对数，第3个记录当前在那几个括号内，第4个记录 所有 在那几个括号内
  //第5个记录所有括号下标
  //[4,[1,2,6,1, 1],0,[1,2],[],[]]
  var param = [0,[1],0,[],[],[]]
  for(var p=0;p<=partN;p++){
    console.log('-----------------------------------------------进入p循环，p:'.concat(p))
    if(!partN==0){
      word = record[p-1]
      param = paramRecord[p-1]
      console.log('-----------------------处理字符word:'.concat(word))
      len = word.length
    }else{
      CFPart.push([])
    }
    for(var i=0; i<len;i++){
      console.log('--------------------------进入i循环，i:'.concat(i))
      if(/[A-z]/.test(word[i]) && /[0-9]/.test(word[i+1]) && i+1<=len){
        //console.log('a元素:'.concat(word[i]))
        var elem = getElem(word[i], 'letter')
        if (elem) {
          if (i + 2 <= len && /[0-9]/.test(word[i + 2])){
            //console.log('两位下标')
            CFPart[p].push([elem[1], elem[3], word[i + 1].concat(word[i + 2]), param[0]])
            console.log([elem[1], elem[3], word[i + 1].concat(word[i + 2]), param[0]])
            i++
            i++
          }else{
            //console.log('一位下标')
            CFPart[p].push([elem[1], elem[3], word[i + 1], param[0]])
            //console.log([elem[1], elem[3], word[i + 1], param[0]])
            i++
            //console.log('下次判断'.concat(word[i+1]))
            //console.log(CFPart)
          }
        }else{
          console.log('未找到元素')
        }
        
      } else if (/[A-z]/.test(word[i]) && (/[^a-z]/.test(word[i+1]) || i==len)){
        //console.log('b元素:'.concat(word[i]))
        console.log('A位置')
        var elem = getElem(word[i], 'letter')
        if (elem) {``
          CFPart[p].push([elem[1], elem[3], '1', param[0]])
        }else{
          console.log('检查拼写')
        }
      }else if(/[A-z]/.test(word[i]) && /[A-z]/.test(word[i+1])){
        //console.log('c元素1:'.concat(word[i]))
        //console.log('c或元素2:'.concat(word[i]).concat(',').concat(word[i]).concat(word[i+1]))
        console.log('B位置')
        var elem = getElem(word[i],'letter')
        console.log('C位置')
        var elemA = getElem(word[i].concat(word[i+1]),'letter')
        console.log('elemB-word:'.concat(word[i + 1]))
        console.log('D位置')
        var elemB = getElem(word[i+1], 'letter')
        if(i+2<=len){
          console.log('E位置')
          var elemC = getElem(word[i + 1].concat(word[i + 2]), 'letter')
        }else{
          var elemC=''
        }
        if(elem && !elemA){
          //console.log('c元素1存在，c元素2不存在')
          CFPart[p].push([elem[1], elem[3], '1', param[0]])
          //console.log([elem[1], elem[3], '1'])
        }else if((!elem && elemA) || (elemA && !elemB) ){
          //console.log('c元素1不存在，c元素2存在')
          if (i + 2 <= len && /[0-9]/.test(word[i + 2])){
            if (i + 3 <= len && /[0-9]/.test(word[i + 3])){
              //console.log('两位下标')
              CFPart[p].push([elemA[1], elemA[3], word[i + 2].concat(word[i + 3]), param[0]])
              //console.log([elemA[1], elemA[3], word[i + 2].concat(word[i + 3])])
              i++
              i++
              i++
            }else{
              //console.log('一位下标')
              CFPart[p].push([elemA[1], elemA[3], word[i + 2], param[0]])
              //console.log([elemA[1], elemA[3], word[i + 2]])
              i++
              i++
            }
          }else{
            //console.log('无下标')
            CFPart[p].push([elemA[1], elemA[3], '1', param[0]])
            //console.log([elemA[1], elemA[3], '1'])
            i++
          }

        } else if (elem && elemA && elemB){
          //console.log('c元素1存在,c元素2存在,出现多解')
          partN++
          //console.log('复制前面的数据')
          CFPart.push([])
          CFPart[partN] = CFPart[p].slice(0, CFPart[p].length)
          paramRecord.push(param.slice(0))
          //console.log(CFPart[p].slice(0, i))
          //console.log(p)
          //console.log(CFPart[1])
          CFPart[p].push([elem[1], elem[3], '1', param[0]])
          //console.log([elem[1], elem[3], '1'])
          if (i + 2 <= len && /[0-9]/.test(word[i + 2])) {
            if (i + 3 <= len && /[0-9]/.test(word[i + 3])) {
              //console.log('多解-两位下标')
              CFPart[partN].push([elemA[1], elemA[3], word[i + 2].concat(word[i + 3]), param[0]])
              //console.log([elemA[1], elemA[3], word[i + 2].concat(word[i + 3])])
              record.push(word.slice(i + 4,word.length))
              //console.log('记录多解A...'.concat(word.slice(i + 4)))
            } else {
              //console.log('多解-一位下标')
              //console.log(partN)
              CFPart[partN].push([elemA[1], elemA[3], word[i + 2], param[0]])
              //CFPart[partN][1]=[elemA[1], elemA[3], word[i + 2]]
              //console.log([elemA[1], elemA[3], word[i+2]])
              //console.log(CFPart[partN][1])
              //console.log(CFPart[partN])
              record.push(word.slice(i + 3, word.length))
              //console.log('记录多解B...'.concat(word.slice(i + 3)))
            }
          } else {
            //console.log('多解-无下标')
            CFPart[partN].push([elemA[1], elemA[3], '1', param[0]])
            //console.log([elemA[1], elemA[3], '1'])
            record.push(word.slice(i+2, word.length))
            //console.log('记录多解C...'.concat(word.slice(i+2)))
          }
  
        }else if(elem && elemC){
          console.log('c元素1存在,c元素4存在,出现多解')
          partN++
          console.log('复制前面的数据')
          CFPart.push([])
          CFPart[partN] = CFPart[p].slice(0, CFPart[p].length)
          paramRecord.push(param.slice(0))
          console.log(CFPart[p].slice(0, i))
          console.log(p)
          console.log(CFPart[1])
          CFPart[p].push([elem[1], elem[3], '1', param[0]])
          console.log([elem[1], elem[3], '1'])
          record.push(word.slice(i + 1, word.length))
        }else{
          //console.log('c元素1不存在，c元素2不存在，检查拼写')
        }

      }else if(/\(/.test(word[i])){
        //console.log('发现(括号')
        param[0]+=1
        param[2]+=1
        param[1].push(1) //占位
        param[5].push(1)
        param[3].push(param[2])
        param[4].push(param[3].slice(0))
        //console.log(param[3])
        CFPart[p].push(["(", '0', '1', param[0]])
      }else if(/\)/.test(word[i])){
        //console.log('发现)括号')
        param[0]+=1
        param[1].push(1) //占位
        if(i+1<=len && /[0-9]/.test(word[i+1]) ){
          if(i+2<=len && /[0-9]/.test(word[i+2])){
            if(i+3<=len && /[0-9]/.test(word[i+3])){
              //console.log('括号三位下标，超出可计算范围')
              //返回错误信息
            }else{
              //console.log('括号两位下标')
              //console.log(param[3])
              //console.log(param[4])
              param[5][param[3].pop()] = parseInt(word[i+1].concat(word[i+2]))
              param[4].push(param[3].slice(0))
              CFPart[p].push([")", '0', word[i + 1].concat(word[i + 2]), param[0]])
              i++
              i++
            }
          }else{
            //console.log('括号一位下标')
            //console.log(param[3])
            param[5][param[3].pop()] = parseInt(word[i+1])
            param[4].push(param[3].slice(0))
            CFPart[p].push([")", '0', word[i + 1], param[0]])
            i++
          }
        }else{
          //console.log('括号无下标')
          //console.log(param[4])
          param[5][param[3].pop()] = 1
          param[4].push(param[3].slice(0))
          CFPart[p].push([")", '0', '1',param[0]])
          //可能出错
        }
        
      }else{
        console.log('---------出错---出错---出错---出错---出错---出错--出错--出错')
      }
      console.log('拆解结果--CFPart--')
      console.log(CFPart)
      console.log('-----')
      console.log('记录结果-------------------')
      console.log(record)
      console.log('---------------------------')
      console.log('-------------i循环 结束-----------------')
      //console.log(param)
    }

    //计算外括号总下标
    for (var s = 0; s <= param[0]; s++) {
      //console.log('计算括号下总下标')
      var sum = 1
      for (var n in param[4][s]) {
        sum = sum * param[5][param[4][s][n]]
        //console.log('n:'.concat(n))
        //console.log('()x:'.concat(param[5][param[4][s][n]]))
      }
      param[1][s+1] = sum
      //console.log(sum)
    }
    var CFTemp=''
    var resultTemp=0
    for(var m=0; m<CFPart[p].length;m++){
      //console.log('--------------外-----------下------------标-------------------')
      //console.log('m'.concat(m))
      //console.log('CFPart[p][m]')
      //console.log(CFPart[p][m])
      if (CFPart[p][m][0]){
        console.log('对外下表复制循环过程')
        console.log(CFPart[p][m][0])
        //console.log(CFPart[p][m][0])
        //console.log(param[1][CFPart[p][m][3]])
        //对CFPart外括号参数进行赋值
        CFPart[p][m][3] = param[1][CFPart[p][m][3]]
        if (CFPart[p][m][0]=='\('){
          CFTemp +=CFPart[p][m][0]
        }else{
          if (CFPart[p][m][2]=='1'){
            CFTemp += CFPart[p][m][0]  
          }else{
            CFTemp += CFPart[p][m][0].concat(CFPart[p][m][2])
          }
          resultTemp += CFPart[p][m][1] * CFPart[p][m][2] * CFPart[p][m][3]
        }
      }    
    }
    CFList.push([CFTemp, resultTemp.toFixed(4)])
    console.log('CFList:')
    console.log(CFList)

    console.log('-------p循环-------p循环------p循环-----p循环-------p循环p循环------p循环-----------')
    console.log('Param:')
    console.log(param)
    //console.log(CFPart)
    //console.log(paramRecord)
  }
  return CFList
}