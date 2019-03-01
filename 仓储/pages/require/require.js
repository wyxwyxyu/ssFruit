var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    listheight: '',
    buttonheight: '',
    startX: 0,
    startY: 0,
    isTouchMove: false,
    payflag: true,
    pageNumber: 1,  //当前页数
    pageSize: 4,  //每页显示几条数据
    item: [

    ],  //要显示的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用加载数据的方法
    wx.request({
      url: 'http://192.168.1.101:8080/storage/' + 'selectAllOrderByStatus.do?checkStatus=' + 1,
      method: "POST",
      data: {
      },
      header: {
        "content-type": "application/json",
      },
      success: function (res) {
        console.log(res)
        that.setData({
          item:res.data.data
        })
      }
    })
  },
  click: function (res) {
    var orderId = res.currentTarget.dataset.id;
    var yname = res.currentTarget.dataset.name;
    var yweight = res.currentTarget.dataset.weight;
    var supplyTime = res.currentTarget.dataset.time;
    wx.navigateTo({
      url: '../receive/receive?orderId=' + orderId + '&yname=' + yname + '&yweight=' + yweight
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
  

})