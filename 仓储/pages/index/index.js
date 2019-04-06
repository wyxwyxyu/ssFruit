// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submitInfo: function () {
    wx.navigateTo({
      url: '../require/require',//记录仓储位置
    })
  },
  standardMaterial: function() {
    wx.navigateTo({
      url: '../standard-material/standard-material',//分拣
    })
  },
  getStorage:function(){
    wx.navigateTo({
      url: '../storage/storage',//查看库存
    })
  },
  getInfo: function () {
    wx.navigateTo({
      url: '../require/list/list',//查看已仓储订单
    })
  },
  chooseSupply: function () {
    wx.navigateTo({
      url: '../putIn/putIn',//入库
    })
  },
  infoRecept: function () {    //出库
    wx.navigateTo({
      url: '../putOut/putOut',
    })
  },
  orderChecked: function () {
    wx.navigateTo({
      url: '../orderChecked/orderChecked',
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

  }
})