// pages/menupage/reward/reward.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootPath: '../../',
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
  navigationBarBack: function () {
    wx.navigateBack()
  },
  reward: function () {
    wx.showActionSheet({
      itemList: ['保存到相册','手动截屏', '暂不赏赞'],
      success: function (res) {
        console.log(res.tapIndex)
        console.log(res.tempFilePath)
        if (res.tapIndex == 0) {
          /**
          wx.downloadFile({
            url:'../../data/image/WXreward.jpg',
            success:function(res){
              console.log('下载文件成功');
              console.log(res)
            },
            fail(){
              console.log('下载文件失败')
              console.log(res)
            }
          })
           */
          wx.saveImageToPhotosAlbum({
            filePath: 'pages/data/image/WXreward.jpg',
            success: function (res) {
              console.log('保存图片成功')
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1000,
              })
            },
            fail: function (res) {
              console.log('保存图片失败')
              console.log(res)
              wx.getSetting({
                success(res) {
                  if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                      scope: 'scope.writePhotosAlbum',
                      success() {
                        //已授权
                      },
                      fail() {
                        //未授权
                        wx.openSetting({})
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '保存失败,请截屏赞赏',
                      icon: 'none',
                      duration: 2000,
                    })
                  }
                }
              })

            },
          })
        } else if (res.tapIndex == 1) {
          wx.onUserCaptureScreen(function (res) {
            console.log('用户截屏了')
            wx.showToast({
              title: '感谢您的支持！',
              icon: 'none',
              durtion: 2000
            })
            wx.reportAnalytics('reward_capture_screen', {
            });
          })
        }
      },
      fail: function (res) {
        console.log(res.tapIndex)
      }
    })
  }


})