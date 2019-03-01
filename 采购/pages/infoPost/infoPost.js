var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list2: [{ unique: 'unique0' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nameHandle: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    that.data.list2[id].name = e.detail.value
  },
  weightHandle: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    that.data.list2[id].weight = e.detail.value
  },
  priceHandle: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    that.data.list2[id].price = e.detail.value
  },
  timeHandle: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    that.data.list2[id].supplyTime = e.detail.value
  },
  //发布需求
  submit: function () {
    var that = this;
    var list2 = that.data.list2;
    for (var i = 0; i < list2.length; i++) {
      if (list2[i].name != '' && list2[i].weight != '' && list2[i].price != '' && list2[i].supplyTime != '' && list2[i].name != undefined && list2[i].weight != undefined && list2[i].price != undefined && list2[i].supplyTime != undefined) {
        util.request(api.Demand + '? materialName =' + list2[i].name + "&weight=" + list2[i].weight + "&expectPrice=" + list2[i].price + "&time=" + list2[i].supplyTime).then(function (res) {
          if(res.data.status==0){
            wx.showToast({
              title: '提交成功',
              duration:3000,
              success:function(){
                wx.redirectTo({
                  url: '../home/home',
                })
              }
            })
            
          }
         
        })


      } else {
        common.modalBox()
      }
    }
  },
  //添加需求
  add: function () {
    var that = this;
    var n = that.data.list2.length;
    that.data.list2.push({ unique: 'unique' + n });
    that.setData({
      list2: that.data.list2
    })
  },
  //删除需求
  cancle: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    if (that.data.list2.length == 1) {
      return;
    }
    that.data.list2.splice(id, 1);
    that.setData({
      list2: that.data.list2
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