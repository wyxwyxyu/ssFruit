var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
scanContent:[],
count:0,
currentSelect:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderNo = options.orderNo;
    this.data.orderNo=orderNo;
    this.loadData(orderNo);
  },
  loadData: function (orderNo) {
    var that = this;
    util.request(api.SelectByOrdNo + '?orderNo=' + orderNo).then(function (res) {
      wx.hideLoading();
      if (res.data.status == 0) {
        var array = res.data.data.orderItemVoList
        for(let i=0;i<array.length;i++){
          array[i].count=0;
        }
        console.log(array)
        that.setData({
          list: array
        })
      }
    })

  },
  putout:function(e){
    var that=this;
    let itemIndex = e.currentTarget.dataset.index
    let orderItemId = e.currentTarget.dataset.id
    let scanContent = this.data.scanContent
    let scanid = '';
    if (that.data.currentSelect != itemIndex) {
      wx.showToast({
        title: '请完成上一件商品拣货',
        icon: 'none'
      })
      return;
    }
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success(res) {
        console.log(res)
        scanid = res.result     //二维码解析值
        scanContent.push(scanid)
        that.data.list[itemIndex].count = scanContent.length;
        var list = that.data.list;
        that.setData({
          list: list,
          currentSelect: itemIndex
        })
      }
    })
    
    
  },
  putoutFinish:function(e){
    var that=this;
    let itemIndex = e.currentTarget.dataset.index
    let orderItemId = e.currentTarget.dataset.id
    let idList = this.data.scanContent
    
    if(idList.length==0){
      wx.showToast({
        title: '请继续拣货',
        icon:'none'
      })
      return;
    }
    
    //idList=JSON.stringify(idList)
    console.log(idList)
    wx.request({
      url: 'http://192.168.1.103:8080/standard/storingStandardMaterialByOrder.do' + '?orderItemId=' + orderItemId + "&idList=" + idList,
      data:{},
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res)
        if(res.data.status==0){
          wx.showToast({
            title: '提交成功',
          })
          that.setData({
            scanContent: []
          })
        }else if(res.data.status==1){
          var msg = res.data.msg
          wx.showToast({
            title: msg,
            icon: 'none'
          })
          that.setData({
            scanContent: []
          })
        }
    
        
      }
    })
    // util.request(api.PutOutAfterScan + '?orderItemId=' + orderItemId+"&idList="+idList).then(function (res) {
    //   console.log(res)
    //   wx.hideLoading();
    //   if (res.data.status == 0) {
    //     //var array = res.data.data.orderItemVoList
    //     console.log(res)
    //     that.setData({
    //       scanContent:[]
    //     })
    //   }
    // })
  },
  finishpicking:function(){
    var orderNo = this.data.orderNo
    console.log(orderNo)
    util.request(api.FinishPicking + '?orderNo=' + orderNo).then(function (res) {
      wx.hideLoading();
      console.log(res)
      if (res.data.status == 0) {        
        util.showSuccess()
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
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