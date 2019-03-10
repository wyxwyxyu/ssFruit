var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
scanContent:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderNo = options.orderNo;
    this.loadData(orderNo);
  },
  loadData: function (orderNo) {
    var that = this;
    util.request(api.SelectByOrdNo + '?orderNo=' + orderNo).then(function (res) {
      wx.hideLoading();
      if (res.data.status == 0) {
        var array = res.data.data.orderItemVoList
        console.log(res)
        that.setData({
          list: array
        })
      }
    })

  },
  putout:function(e){
    let orderItemId = e.currentTarget.dataset.id
    let scanContent = this.data.scanContent
    let scanid = '';
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success(res) {
        console.log(res)
        scanid = res.result     //二维码解析值
        scanContent.push(scanid)
      }
    })
  },
  putoutFinish:function(e){
    var that=this;
    let orderItemId = e.currentTarget.dataset.id
    let idList = this.data.scanContent
    idList=JSON.stringify(idList)
    console.log(idList)
    util.request(api.PutOutAfterScan + '?orderItemId=' + orderItemId+"&idList="+idList).then(function (res) {
      console.log(res)
      wx.hideLoading();
      if (res.data.status == 0) {
        //var array = res.data.data.orderItemVoList
        console.log(res)
        that.setData({
          scanContent:[]
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