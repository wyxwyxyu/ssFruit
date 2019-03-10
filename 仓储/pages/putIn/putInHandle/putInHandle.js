var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSpec:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
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
  formSubmit: function (e) {  //提交仓储位置表单
    console.log(this.data);
    let name=this.data.item.name;
    var currentSpec = this.data.currentSpec;
    let spe = this.data.item.productDetailList[currentSpec].sepification+'kg';
    let { count, storageId, storageRow, storageCol } = e.detail.value;
    if (storageId == 0 || storageRow == 0 || storageCol == 0) {
      wx.showToast({
        title: '未填完！',
        image: '/images/warn.png',
        duration: 1500,

      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else {
      util.request(api.PutIn + '?productName=' + name + '&shelfNo=' + storageId + '&row=' + storageRow + '&column=' + storageCol + '&specifications=' + spe + '&quantity=' + count).then(function (res) {
        wx.hideLoading();
        if(res.data.status==0){
          console.log(res)
          util.showSuccess();
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
        
        
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