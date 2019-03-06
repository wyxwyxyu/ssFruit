var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const date = new Date();
const years = [];
const months = [];
const days = [];
for (let i = 2000; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {

  months.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list2: [{ unique: 'unique0' }],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: '',
    days: [],
    day: '',
    dateStatus: false,
    isDateChoice: true,
    currentSelected: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var year = date.getFullYear()
    var month = date.getMonth()
    this.dayjudge(month + 1, year)
    var day = date.getDate()
    this.setData({
      month: month + 1,
      day: day,
      value: [9999, month, day - 1]
    })
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
    that.setData({
      dateStatus: true,
      isDateChoice: false,
      currentSelected: id
    })

  },
  bindChange: function (e) {
    const val = e.detail.value
    var year = this.data.years[val[0]]
    var month = this.data.months[val[1]]
    this.dayjudge(month, year)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  //日期取消
  list: function (e) {
    var that = this;
    that.setData({
      dateStatus: false,
      isDateChoice: true
    })
    console.log(that.data.list2)
  },
  //日期确定
  listConfirm: function (e) {
    var that = this;
    var currentSelected = that.data.currentSelected;
    console.log(currentSelected)
    that.setData({
      dateStatus: false,
      isDateChoice: true
    })
    this.data.list2[currentSelected].showTime = this.data.year + '年' + this.data.month + '月' + this.data.day + '日'
    var list2 = that.data.list2
    that.setData({
      list2: list2
    })
    that.data.list2[currentSelected].supplyTime = that.data.year + '-' + that.data.month + '-' + this.data.day + ' 12:00'
    console.log(that.data.list2)
  },
  //发布需求
  submit: function () {
    var that = this;
    var list2 = that.data.list2;
    for (var i = 0; i < list2.length; i++) {
      var flag = 0;
      if (list2[i].name != '' && list2[i].weight != '' && list2[i].price != '' && list2[i].supplyTime != '' && list2[i].name != undefined && list2[i].weight != undefined && list2[i].price != undefined && list2[i].supplyTime != undefined) {
        util.request(api.Demand + '? materialName =' + list2[i].name + "&weight=" + list2[i].weight + "&expectPrice=" + list2[i].price + "&time=" + list2[i].supplyTime).then(function (res) {
          if (res.data.status == 0) {
            flag++;
            if (flag == list2.length) {
              wx.showToast({
                title: '提交成功',
                success: function () {
                  wx.redirectTo({
                    url: '../home/home',
                  })
                }
              })

            }
          }

        })


      } else {
        wx.showToast({
          title: '请补全信息',
          icon: 'none',
          duration: 3000
        })
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
  dayjudge: function (month, year) {
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      this.setData({
        days: days
      })
    } else {
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        this.setData({
          days: days
        })
      } else {
        if (flag == false) {
          var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
          this.setData({
            days: days
          })
        } else {
          var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
          this.setData({
            days: days
          })
        }

      }

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