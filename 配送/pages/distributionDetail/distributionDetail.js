
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one: [],
    distributionid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that  = this;
    that.setData({
      distributionid: options.distributionid,
    })
    that.loadDistributeDoc(that.data.distributionid);
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
  
  loadDistributeDoc: function (record) {
    var that = this;
    util.request(api.GenerateDistributeDoc + '?distributionId=' + record).then(
      function (res) {
        if (res.data.status == 0) {
          wx.hideLoading();
          that.setData({
            one: res.data.data
          }),
            console.log(that.data.one)
        }
      })
  },

  click: function (res) {
    var that = this;
    var orderno = res.currentTarget.dataset.orderno;
    var iteminfoid = res.currentTarget.dataset.iteminfoid;
    console.log(orderno);
    console.log(iteminfoid);
    util.request(api.ConfirmReceipt + '?orderNo=' + orderno + '&itemInfoId=' + iteminfoid).then(
      function (res) {
        if (res.data.status == 0) {
          wx.hideLoading();
          util.showSuccess();
          setTimeout(function () {
            that.loadDistributeDoc(that.data.distributionid);//待优化
          }, 1000)
        }
      })
  },
})