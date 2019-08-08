//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
    var useLog = wx.getStorageSync('useLog')
    var readAppSet = wx.getStorageSync('appSet')

    if(useLog){
      if(readAppSet){
        // console.log('readAppSet=>'.concat(readAppSet))
        // console.log(readAppSet)
        this.globalData.appSet = readAppSet
      }else{
        // 旧版兼容，老用户未主动设置白色主题，保持旧有的深色主题
        this.globalData.appSet.theme = 'dark'
        wx.setStorage({
          'key':'appSet',
          'data': this.globalData.appSet
        })
      }
    }else{
      // uselog为空,未打开过
      useLog = 0
    }

    //写入 使用记录
    wx.setStorage({
      key: "useLog",
      data: useLog + 1
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log('=======app.js - wx.login ======')
        //console.log(res.code)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('=====app.js====')
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          // 未授权，调用wx.authorize() 发起授权请求
          // 接口改版，不会弹起授权窗口
          // wx.authorize({
          //   scope:'scope.userInfo',
          //   success() {
          //     // 成功获取到用户授权
          //     console.los('====wx.authorize 成功获取到用户授权=======')
          //   }
          // })
        }
      }
    })
    //获取系统信息，并保存到全局变量systemInfo中。 
    this.globalData.systemInfo = wx.getSystemInfoSync()
    
    //给全局添加菜单按钮界限对象
    if(wx.getMenuButtonBoundingClientRect){
      this.globalData.systemInfo['MenuButtonBounding'] = wx.getMenuButtonBoundingClientRect()
      // console.log('MenuButtonBounding=>')
      // console.log(this.globalData.systemInfo['MenuButtonBounding'])
      this.globalData.systemInfo['haveMenuButtonBounding'] = false  //误差太大，弃用
    }else{
      this.globalData.systemInfo['haveMenuButtonBounding'] = false
    }
    
    console.log(this.globalData.systemInfo)

    //初始化云服务
    wx.cloud.init({
      env:{
        "storage": "test-c59f6a",
        "database":"test-c59f6a",
        "functions":"test-c59f6a"
      },
      traceUser:true,
    })
    // console.log('----appSet----')
    // console.log(this.globalData.appSet)
  },
  globalData: {
    userInfo: null,
    systemInfo:null,
    appSet:{
      'theme':'white',
    },
      appUI:{
      'dark':{
        'index':{
          'name': '深色主题',
          'tb': { 'iconstyle': 'black', 'leftbrim': 'background-color:#202020;color:#fff;', 'topbrim': 'background-color:#202020;color:#fff;', 'elembox': 'background-color:#232328;color:#fff;', 'pagebg': 'background-color:#222;color:#fff;', },
          'lp': { 'bg': 'background-color:#334;color:#fff;', '': '' },
          'icon': 'white'
        },
        'detail':{

        }
      },
      'white':{
        'index':{
          'name':'白色主题',
          'tb': { 'iconstyle': 'white', 'leftbrim': 'background-color:#fff;color:#555;', 'periodNameBox': 'box-shadow:0 0 1px #f3f3f3;', 'topbrim': 'background-color:#fff;color:#555;', 'familyNameBox': 'box-shadow:0 0 1px #f3f3f3;',  'elembox': 'background-color:#fff;box-shadow:0 0 1px #f3f3f3;color:#444;', 'pagebg': 'background-color:#fff;color:#555;', },
          'lp': { 'bg': 'background-color:#f8f8f8;color:#555;', 'itemstyle': 'background-color:#fff;margin:1px 0 0 0;' },
          'icon': 'black'
        },
        'detail': {
          'page': 'background-color:#efefef;', 'item': 'background-color:#fff;color:#555;', 'iconstyle': 'black'
        }
      }
    },
  }
})