var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[],
    hiddenmodalput: true,
    modalid:'',
    pay:false,
    way:'',
    money:'',
    isButtonShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    this.loadData(id);
    
  },
  loadData: function (id) {
    var id=id;
    var that = this;
    util.request(api.SelectQuoteByDemand + '?demandId=' + id).then(function (res) {
      var array = res.data.data
      that.setData({
        item: array
      })
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function (e) {
    var that=this;
    var id=that.data.modalid;
    console.log(id)
    util.request(api.OrderCreate + '?quoteId=' + id).then(function (res) {
      var array = res.data.data
      console.log(res)
      that.setData({
        isButtonShow:true,
        hiddenmodalput: true
      })
      wx.showToast({
        title: '已生成采购订单',
        duration:2000
      })
    })
  },
  chooseHandle:function(e){
    var that= this;
    var id = e.currentTarget.dataset.quoteid
    that.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      modalid: id
    })
  },
  nav1:function(){
    wx.reLaunch({
      url: '../home/home',
    })
  },
  nav2: function () { 
    wx.reLaunch({
      url: '../infoList/infoList',
    })
  },
  
  // payConfirm:function(){
  //   var way=this.data.way;
  //   var money=this.data.money;
  //   if (way != undefined && money != undefined && way != ''&& money != ''){
  //     this.setData({
  //       hiddenmodalput: true,
  //     })
  //     console.log("success")
  //     wx.redirectTo({
  //       url: '../infoList/infoList',
  //     })
  //   }else(
  //     console.log("failed")
  //   )
    
  // },
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