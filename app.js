//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
    var useLog = wx.getStorageSync('useLog');
    useLog  = parseInt(useLog) + 1;
    if(isNaN(useLog)) useLog = 1;
    wx.setStorageSync('useLog', useLog);

    

    var theme = wx.getStorageSync('theme');

    if(theme.length > 0){
      // 有 theme 存档
    }else{
      theme = "defaul-dark";
      wx.setStorageSync('theme',theme);
    }

    this.globalData.theme = theme;
    this.globalData.useLog = useLog;

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
    
    // console.log(this.globalData.systemInfo)

    //初始化云服务
    wx.cloud.init({
      env:{
        "storage": "云环境id",
        "database":"云环境id",
        "functions":"云环境id"
      },
      traceUser:true,
    })
    // console.log('----appSet----')
    // console.log(this.globalData.appSet)

  },
  refresh:function(){
    if(wx.getMenuButtonBoundingClientRect){
      this.globalData.systemInfo['MenuButtonBounding'] = wx.getMenuButtonBoundingClientRect();
    }
  },
  globalData: {
    userInfo: null,
    systemInfo:null,
    theme:'default-dark',
    useLog:1,
  }
})
