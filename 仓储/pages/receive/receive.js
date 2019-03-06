var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    yname: '',
    yweight: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    this.setData({
      orderId : options.orderId,
      yname : options.yname,
      yweight : options.yweight,

    })
    
    
  },
  
  
  formSubmit:function(e){  //提交仓储位置表单
    console.log(e.detail.value);

    let { storageId, storageRow, storageCol} = e.detail.value;
    if (storageId == 0 || storageRow == 0 || storageCol==0){
      wx.showToast({
        title:'未填完！',
        image:'/images/warn.png',
        duration:1500,

      })
      setTimeout(function(){
        wx.hideToast()
      },2000)

    }else{
      util.request(api.Storage + '?purchaseOrderNo=' + this.data.orderId + '&shelfNo=' + storageId + '&row=' + storageRow + '&column=' + storageCol).then(function (res) {
        wx.hideLoading();
        util.showSuccess();
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      })
     
    }
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