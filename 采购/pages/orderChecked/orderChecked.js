var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceValue: '',
    hiddenmodalput: true,
    modalid: '',
    listheight: '',//用于设置页面高度
    item: [],
    show1:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用加载数据的方法
    wx.getSystemInfo({ //获取设备宽度
      success: function (res) {
        console.log(res.windowHeight)
        var height = res.windowHeight
        that.setData({
          height: height,
          listheight: height * 0.9,
          buttonheight: height * 0.08
        })
      },
    })
    this.loadData();
  },
  loadData: function () {
    var that = this;
    util.request(api.SelectOrderByStatus + '?checkStatus=' + 0).then(function (res) {
      
      var array = res.data.data
      that.setData({
        item: array
      })
    })
  },
  loadData2:function(){
    var that = this;
    util.request(api.SelectOrderByPay + '?finalMoneyType=' + 0).then(function (res) {
     
      var array = res.data.data
      that.setData({
        item: array
      })
    })
  },
  loadData3: function () {
    var that = this;
    util.request(api.SelectOrderByStatus + '?checkStatus=' + 2).then(function (res) {
      console.log(res)
      var array = res.data.data
      that.setData({
        item: array
      })
    })
  },
  showOrderCheck: function () {
    this.setData({
      show1:1
    })
    this.loadData()
  },
  showOrderFinalPay: function () {
    this.setData({
      show1: 2
    })
    this.loadData2()
  },
  refuseOrder: function () {
    this.setData({
      show1: 3
    })
    this.loadData3()
  },
  passHnadle: function (e) {
    var that=this;
    var id = e.currentTarget.dataset.id
    util.request(api.OrderChecked + '?orderNo=' + id +'&checkStatus='+ 1 +'&note='+'').then(function (res) {
      wx.showToast({
        title: '提交成功',
      })
      that.loadData();
    })
  },
  refuseHnadle: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './refuse/refuse?id='+id,
    })
    
  },
  payHandle: function (e){
    var that = this;
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './addFinalMoney/addFinalMoney?id='+id,
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
    this.loadData();
    this.loadData2();
    this.loadData3();
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