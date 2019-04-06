var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    this.loadOtherData();
  },
  loadData: function () {
    var that = this;
    util.request(api.DemandRecept + '?status=' + 1).then(function (res) {
      console.log(res)
      var array = res.data.data
      that.setData({
        item: array
      })
    })
  },
  loadOtherData:function(){
    var that = this;
    util.request(api.DemandRecept + '?status=' + 0).then(function (res) {
      var array = res.data.data
      that.setData({
        item2: array
      })
    })
  },
  searchSupply:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../chooseSupply/chooseSupply?id='+id,
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