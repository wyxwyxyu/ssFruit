var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceValue:'',
    hiddenmodalput: true,
    modalid:'',
    listheight: '',//用于设置页面高度
    item: []
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
  loadData:function(){
    var that=this;
    util.request(api.DemandRecept + '?status=' + 0).then(function (res) {
      console.log(res)
      var array = res.data.data
      that.setData({
        item: array
      })
    })
  },
  
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      priceValue: ''
    });
  },
  //确认
  confirm: function (e) {
    var that=this;
    var price = that.data.priceValue;
    var id = e.currentTarget.dataset.id     //拿到接单对象的采购订单id
    if(price!=''){     
      util.request(api.ReleaseQuote + '?demandId=' + id + '&quotePrice=' + price + '&providerId=' +'6e75386393cd417d9474ef93fc30f4cf').then(function (res) {
        wx.showToast({
          title: '报价成功',
        })
        that.setData({
          hiddenmodalput: true,
          priceValue:''
        })
        that.loadData();
      })

      

    }else{
        common.modalBox();
    }
    
  },
  inputHandle:function(e){
    var priceValue=e.detail.value
    this.setData({
      priceValue: priceValue
    })
  },
    buttonHnadle:function(e){
    var id = e.currentTarget.dataset.id
    //var index=e.currentTarget.dataset.index
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      modalid:id
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