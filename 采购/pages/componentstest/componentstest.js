// pages/componentstest/componentstest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [{ name: '白菜', weight: '5kg', price: '2', date: '2019-01-01', id: '0' }, { name: '白菜', weight: '5kg', price: '2', date: '2019-01-01', id: '1' }],
    num: 1,
    apiInfo:'stringtest'
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var array=this.data.item[0];
     for(var x in array){
       console.log(x)
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