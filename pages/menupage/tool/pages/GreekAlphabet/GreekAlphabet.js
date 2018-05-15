// pages/menupage/tool/pages/GreekAlphabet/GreekAlphabet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootPath: '../../../../',
    greekAlphabetlist:[
      //['大写','小写','名字','音标'],
      ['Α', 'α', 'alpha, άλφα', "['ælfə]"],
      ['Β', 'β', 'beta, βήτα', "['bi:tə] / ['beɪtə]"],
      ['Γ', 'γ', 'gamma, γάμμα', "['gæmə]"],
      ['Δ', 'δ', 'delta, δέλτα', "['deltə]"],
      ['Ε', 'ε', 'epsilon, έψιλον', "['epsɪlɒn]"],
      ['Ζ', 'ζ', 'zeta, ζήτα', "['zi:tə]"],
      ['Η', 'η', 'eta, ήτα', "['i:tə]"],
      ['Θ', 'θ', 'theta, θήτα', "['θi:tə]"],
      ['Ι', 'ι', 'iota, ιώτα', "[aɪ'əʊtə]"],
      ['Κ', 'κ', 'kappa, κάππα', "['kæpə]"],
      ['Λ', 'λ', 'lambda, λάμδα', "['læmdə]"],
      ['Μ', 'μ', 'mu, μυ', "[mju:]"],
      ['Ν', 'ν', 'nu, νυ', "[nju:]"],
      ['Ξ', 'ξ', 'xi, ξι', "[ksi] / [ˈzaɪ ] / [ˈsaɪ ]"],
      ['Ο', 'ο', 'omicron, όμικρον', "[əuˈmaikrən] / [ˈɑmɪˌkrɑn ]"],
      ['Π', 'π', 'pi, πι', "[paɪ]"],
      ['Ρ', 'ρ', 'rho, ρώ', "[rəʊ]"],
      ['Σ', 'σ/ς', 'sigma, σίγμα', "['sɪɡmə]"],
      ['Τ', 'τ', 'tau, ταυ', "[tɔ:] / [taʊ]"],
      ['Υ', 'υ', 'upsilon, ύψιλον', "[ʌpˈsaɪlən] / [ˈʊpsɪlɑn]"],
      ['Φ', 'φ', 'phi, φι', "[faɪ]"],
      ['Χ', 'χ', 'chi, χι', "[kaɪ]"],
      ['Ψ', 'ψ', 'psi, ψι', "[psaɪ]"],
      ['Ω', 'ω', 'omega, ωμέγα', "[ˈəʊmɪgə] / [oʊˈmegə]"],
    ],
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
  tap:function(event){
    var taptext = event.currentTarget.dataset.text
    console.log(taptext)
    wx.setClipboardData({
      data:taptext,
      success:function(){
        wx.showToast({
          title: taptext.concat(' 已复制到剪贴板'),
          icon:'none',
          duration:1000
        })
      }
    })
  }
})