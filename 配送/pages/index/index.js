var api = require('../../config/api.js');
var util = require('../../utils/util.js');

Page({
  data: {
    distribution: [],
  },
  //事件处理函数

  onLoad: function() {
    var that = this;
    that.loadDistributeId('0538c351cbeb48d485164569f7ccb6ab', 0);
  },

  loadDistributeId: function (driverId, status) {
    var that = this;
    util.request(api.DriverSelectDistributeByStatus + '?driverId=' + driverId + '&status=' + status).then(function (res) {
      if (res.data.status == 0) {
        wx.hideLoading();
        that.setData({
          distribution: res.data.data
        })
      };
      // console.log(that.data.distribution);
    })
  },
  click:function(res){
    var distributionid = res.currentTarget.dataset.distributionid;
    // console.log(distributionid);
    wx.navigateTo({
      url: '../distributionDetail/distributionDetail?distributionid=' + distributionid,
    })
  }

  
})