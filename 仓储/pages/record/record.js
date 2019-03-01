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
    pageNumber: 1,  //当前页数
    pageSize: 4,  //每页显示几条数据
    item:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId=getApp().globalData.orderId;
    var yname=getApp().globalData.yname;
    var yweight=getApp().globalData.yweight;
    var storageId=getApp().globalData.storageId;
    var storageRow=getApp().globalData.storageRow;
    var storageCol=getApp().globalData.storageCol;
    var that = this;
    this.setData({
      oid: orderId,
      name:yname,
      weight:yweight,
      sid:storageId,
      srow:storageRow,
      scol:storageCol
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