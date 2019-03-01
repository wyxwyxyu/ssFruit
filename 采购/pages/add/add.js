var app = getApp();
var wid, data, tdata, cfc, parkLotId, czhi, value, fcid,wmm, ement;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index2: 0,
    index3: 0,
    focus: false,
    flag: true,
    show: false,
    flags: true,
    pageNumber: 1, //当前页数
    pageSize: 100, //每页显示几条数据
    parkList: [], //要显示的数据
    xiaoqum: ["请选择小区"],
    parkLotName: "",
    inputAddress: '',
    Parkinglot: '',
    Overtime: '',
    disabled: false,
    msarray: ["模式一", "模式二", "模式三"],
    msz: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用加载数据的方法
    that.loadCarPark('');
  },
  msChange: function (e) { //选择模式
    this.data.msz = e.detail.value;
    console.log(this.data.msz)
    this.setData({
      msz: this.data.msz
    })
  },
  wuye: function () {
    this.setData({
      flag: false,
      show: true
    })
  },
  Parkinglot: function () {
    this.setData({
      show: true,
      flags: false
    })
  },
  /**
   * 删除输入内容
   */
  deleteInput: function () {
    var that = this;
    that.setData({
      inputAddress: '',
    })
  },
  /**
   * 绑定输入框
   */
  bindAddressInput: function (e) {
    var that = this;
    that.setData({
      inputAddress: e.detail.value,
    })
    if (e.detail.value) {
      that.loadCarPark(e.detail.value);
    } else {
      that.loadCarPark(that.data.street);
    }
  },

  /**
   * 热词检索
   */

  list: function (res) { //选择小区
    var that = this;
    wid = res.currentTarget.dataset.id; //拿到的小区id
    var housingEstateName = res.currentTarget.dataset.housingestatename; //小区名称 
    that.setData({
      flag: true,
      show: false,
      housingEstateName: housingEstateName,
    })
    that.parklot(wid)
  },
  parklot: function (qid) {
    var that = this;
    app.$api.getParkingLotListPage({  //根据小区id获取停车场
      housingEstateId: wid
    }).then((data) => {   
      if (data.data.code == 0) {
        tdata = data.data.data.list;
        if (tdata.length == 1) {
          parkLotId = tdata[0].parkinglotid;
          that.setData({
            parkLotName: tdata[0].parkinglotname,
            Parkinglot: tdata
          })
        } else {
          that.setData({
            Parkinglot: tdata,
            parkLotName: ''
          })
        }
      }
    })  
  },
  bindparkLot: function (e) {  //选择停车场
    var that = this;
    parkLotId = e.currentTarget.dataset.id;
    that.setData({
      show: false,
      flags: true,
      parkLotName: e.currentTarget.dataset.parklotname
    })
  },
  bindOvertime: function (e) {
    this.setData({
      Overtime: parseFloat(e.detail.value).toFixed(2)
    })
  },
  element: function (e) {   //住宅单元
    ement = e.detail.value;
  },
  bindSubmit: function (e) { //车位编号
    value = e.detail.value; //拿到的车位编号
  },
  bindSubmitResult: function (e) {            //确定
    var that = this;
    that.setData({
     disabled: true
    })
    var Overtime = this.data.Overtime;
    if (wid != "" && parkLotId != "" && czhi != "" && value != "" && ement != ''){
      var pageNumber = that.data.pageNumber;
      var pageSize = that.data.pageSize;
      app.$api.getParkingPlaceByOrdUserIdList(pageNumber, pageSize,{  //查询车位是否重复
        parkinglotid: parkLotId,
        parkingplaceno: value,
      }).then((data) => {    
        if (data.data.data.list == "") {   
          app.$api.ParkingPlace({   //增加车位
            orduserid: '45ae799b-7648-48c4-91f1-0481b85a1652',
            parkinglotid: parkLotId,
            parkingplaceno: value,
            punishment: Overtime,
            housingUnit: ement,
            parkingPlacePicture: ''
          }).then((data) => {  
            console.log(data.data)
            if (data.data.code == 0) {
              wx.redirectTo({
                url: '../list/list',
              })
            }
          })  
        } else {
          wx.showModal({
            title: '提示',
            content: "该停车场已存在" + value + "的车位编号",
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  disabled: false
                })
              }
            }
          })
        }
      })  
    } else {
      wx.showToast({
        title: '请补全信息再进行发布！',
        success: function (res) {
          if (res.confirm) {
            that.setData({
              disabled: false
            })
          }
        }
      })
    }
  },
  loadCarPark: function (housingEstateName) { //小区
    var that = this;
    //发送请求
    app.$api.listHousingEstateByCondition({
      housingEstateNickName: housingEstateName
    }).then((data) => {  
      if (data.data.code == 0) {
        var dataList = data.data.data;
        if (dataList.length == 1) {
          wid = dataList[0].housingEstateId;
          that.setData({
            parkList: dataList,
            housingEstateName: dataList[0].housingEstateName
          })
          that.parklot(wid)
        } else {
          that.setData({
            parkList: dataList,
          })
        }
      } else {
        wx.showToast({
          title: '加载数据失败',
          icon: 'loading',
          duration: 1000
        })

      }
    })  
  },
  //搜索取消
  modalCancel: function (e) {
    this.setData({
      show: false,
      flag: true,
      flags: true
    })
  },
  //跳转添加车位
  goAddParkLot: function () {
    wx.navigateTo({
      url: '../parkcar/parkcar',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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
  onReachBottom: function () { },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})