var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    note:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    this.setData({
      id:id
    })
  },
  noteHandle:function(e){
    var note=e.detail.value
    this.setData({
      note:note
    })
  },
   submit:function(){
     var id=this.data.id;
     var note=this.data.note;
     if (note != '' && note != undefined) {
       util.request(api.OrderChecked + '?orderNo=' + id + '&checkStatus=' + 2 + '&note=' + note).then(function (res) {
         wx.showToast({
           title: '提交成功',
         })
         setTimeout(function () {
           wx.navigateBack({
             delta: 1
           })
         }, 1500)
       })
       }else{
         wx.showToast({
           title: '请补全信息',
           icon:'none'
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