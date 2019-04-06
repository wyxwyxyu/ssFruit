var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSpec: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      orderNo:option.orderNo
    })
    var that = this
    var pid = option.pid
    util.request(api.GetProductDetail + '?productId=' + pid).then(function (res) {
      console.log(res.data.data)
      wx.hideLoading()
      if (res.data.status == 0) {
        that.setData({
          item: res.data.data,
          productDetailId: res.data.data.productDetailList[0].productDetailId
        });
      }
    });
  },
  selectspec: function (e) {
    var index = e.currentTarget.dataset.index
    this.data.productDetailId = this.data.item.productDetailList[index].productDetailId
    this.setData({
      currentSpec: index
    })
  },
  getWeight:function(){
    var that=this;
    that.setData({
          weight: 2
        });
    // util.request(api.GetWeight).then(function (res) {
    //   console.log(res.data.data)
    //   wx.hideLoading()
    //   if (res.data.status == 0) {
    //     that.setData({
    //       weight: res.data.data
    //     });
    //   }
    // });
  },
  submit:function(){
   console.log(this.data)
   var that=this;
    util.request(api.CreateStandardMaterial + '?productDetailId=' + that.data.productDetailId +'&purchaseOrderNo='+that.data.orderNo+'&weight='+that.data.weight).then(function (res) {
      console.log(res.data.data)
      wx.hideLoading()
      if (res.data.status == 0) {
        util.showSuccess();
        setTimeout(function () {
          wx.reLaunch({
            url: '../../index/index',
          })
        }, 1500)
      }
    });
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