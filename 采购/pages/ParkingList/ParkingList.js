// pages/ParkingList/ParkingList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    housingEstateId:'',
    parkList: [],
    pay:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      housingEstateId:options.id
    })
    that.loadpark()
  },
  loadpark: function() {
    var that = this;
    var pmk = wx.getStorageSync('pmks');
    app.$api.parkingPlaceResult({
      housingEstateId: that.data.housingEstateId,
      date: pmk.date,//需要日期格式到秒
      timeFrame: pmk.timeFrame,
      price: pmk.price
    }).then((data) => {  
      if (data.data.code == 0) {
        var dataList = data.data.data;
        that.setData({
          parkList: dataList,
        })
      }
    })  
  },
  // 跳转车位详情
  judgeParkDetaile: function (e) {
    wx.redirectTo({
      url: '../driver/driver?parkingId=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.$api.getDoodsInfor().then((data) => {  //判断是否登录
      if (data.data.code != 0) {
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000       
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' ';
  var h = date.getHours() < 10 ? ('0' + (date.getHours() + ':')) : (date.getHours() + ':');
  var m = date.getMinutes() < 10 ? ('0' + (date.getMinutes())) : (date.getMinutes());
  return Y + M + D + h + m;
} 