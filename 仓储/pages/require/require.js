var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [],  //要显示的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用加载数据的方法
    that.loadData()
       
     
  },
  loadData: function () {
    var that = this;
    util.request(api.SelectOrderByStatus + '?checkStatus=' + 1).then(function (res) {
      wx.hideLoading();
      var array = res.data.data
      that.setData({
        item: array
      })
    })
  },
  click: function (res) {
    var orderId = res.currentTarget.dataset.id;
    var yname = res.currentTarget.dataset.name;
    var yweight = res.currentTarget.dataset.weight;
    var supplyTime = res.currentTarget.dataset.time;
    wx.navigateTo({
      url: '../receive/receive?orderId=' + orderId + '&yname=' + yname + '&yweight=' + yweight
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
  

})