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
    pageSize:8,  //每页显示几条数据
    items: [],  //要显示的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用加载数据的方法
    wx.getSystemInfo({ //获取设备宽度
      success: function (res) {
        console.log(res.windowHeight)
        var height = res.windowHeight
        that.setData({
          height: height,
          listheight: height * 0.9,
          buttonheight: height * 0.08
        })
      },
    })
    that.loadData();  
  },
  list:function(res){
    var id=res.currentTarget.dataset.id; //车位id
    wx.navigateTo({
      url: '../calendar/index?id='+id,
    })
  },
  add:function(){  //添加车位
    wx.redirectTo({
      url: '../add/add',
    })
  },
  amend:function(e){   //修改车位信息
    var approvalState = e.currentTarget.dataset.approvalstate;
    if (approvalState == 0 || approvalState==2){
      wx.navigateTo({
        url: '../amendparking/amendparking?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  refuseReason:function(e){   //查看审核详情
    var parkingplaceid=e.currentTarget.dataset.id;
    var that=this;
    var pageNumber = that.data.pageNumber;
    var pageSize = that.data.pageSize;
    app.$api.getParkingPlaceByOrdUserIdList(pageNumber, pageSize,{
      parkingplaceid: parkingplaceid
    }).then((data) => {   
      that.setData({
        payflag: !that.data.payflag,
        xiang: data.data.data.list
      })
    })
  },
  cancel: function () {
    var that = this;
    that.setData({
      payflag: true,
    })
  },
  confirm: function () {
    var that = this;
    that.setData({
      payflag: true,
    })
  },
  upper: function (e) {
    var that = this;
    //下拉刷新，将pageNumber和pageSize分别设置成1和5，并初始化数据，让数据重新通过loadData()获取
    that.setData({
      pageNumber: 1,
      pageSize: 8,
      items: []
    })
    that.loadData();
  },
  lower: function (e) {
    var that = this;
    var pageNumber = that.data.pageNumber;
    that.setData({
      pageNumber: ++pageNumber
    });
    that.loadData();
  },
  loadData: function (res) {
    var that = this;
    //分页信息
    var pageNumber = that.data.pageNumber;
    var pageSize = that.data.pageSize;
    //发送请求
    app.$api.getParkingPlaceByOrdUserIdList(pageNumber, pageSize,{
      parkingPlace: {
        orduserid: '45ae799b-7648-48c4-91f1-0481b85a1652'  //用户id
      }
    }).then((data) => {
      console.log(data.data)
      if (data.data.code == 0) {
        var items = that.data.items
        var dataitems = data.data.data.list;
        //若返回数据为空，则提示
        if (dataitems.length == 0) {
          // wx.showToast({
          //   title: '没有更多数据了'
          // })
          //分页失败，分页数据减1
          if (pageNumber > 1) {
            that.setData({
              pageNumber: --pageNumber
            });
          }
          return;
        }
        //如果分页数据不为空，则将新的分页数据追加到原数据智商
        that.setData({
          items: items.concat(dataitems)
        });

      } else {
        wx.showToast({
          title: '加载数据失败',
          icon: 'loading',
          duration: 1000
        })
        //分页失败，分页数据回退
        if (pageNumber > 1) {
          that.setData({
            pageNumber: --pageNumber
          });
        }
      }
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /* 
   * 计算滑动角度 
   * @param {Object} start 起点坐标 
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    var that = this;
    var Id = e.currentTarget.dataset.parkingplaceid;
    wx.showModal({
      title: '提示',
      content: '确认删除该车位吗？',
      success: function (res) {
        if (res.confirm) {
          app.$api.rmvParkingPlace(Id).then((data) => {  //删除车位
            if (data.data.code == 0) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            } else if (data.data.code == -3) {
              var msg = data.data.msg
              wx.showToast({
                title: msg,
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 2000
              })
            }
            var pageSize = that.data.pageSize;
            var pageNumber = 1;
            app.$api.getParkingPlaceByOrdUserIdList(pageNumber, pageSize,{
              parkingPlace: {
                orduserid: '45ae799b-7648-48c4-91f1-0481b85a1652'  //用户id
              }
            }).then((data) => {
              var dataitems = data.data.data.list;
              that.setData({
                items: dataitems
              })
            })
          })  
        }
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