var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    flag: false,
    orderNo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderNo:options.orderNo
    })
    if (this.data.orderNo == undefined || this.data.orderNo == '' || this.data.orderNo==null){
      wx.showToast({
        title: '网络错误',
        icon:'none'
      })
      setTimeout(function () {
        wx.reLaunch({
          url: '../index/index',
        })
      }, 1500)
     
    }
  },
  searchHandle: function (e) {
    var searchContent = e.detail.value
    var that = this;
    util.request(api.SearchProduct + '?productName=' + searchContent).then(function (res) {
      wx.hideLoading();
      if (res.data.status == 0) {
        var array = res.data.data.list
        console.log(res)
        that.setData({
          item: array,
          flag: true
        })
      }
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