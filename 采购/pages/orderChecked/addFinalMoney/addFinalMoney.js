var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['支付宝', '微信','现金'],
     id:'',
     money:'',
     way:'',
     index:''
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
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  money:function(e){
    var money = e.detail.value;
    this.setData({
      money: money
    })
  },
  confirm: function () {
    var id=this.data.id;
    var money=this.data.money;
    var way =parseInt(this.data.index)+1;
    if (id != '' && money != '' && way != '' && id != undefined && money != undefined && way != undefined){
      util.request(api.AddFinalMoneypost + '?ordNo=' + id + '&finalMoney=' + money + '&finalMoneyType=' + way).then(function (res) {
        if(res.data.status==0){
          wx.showToast({
            title: '提交成功'
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }
        
        
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