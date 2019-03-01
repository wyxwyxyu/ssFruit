
Component({
  // lifetimes: {
  //   attached() {
      
     
  //     // 在组件实例进入页面节点树时执行
  //   }
  //   },
  /**
   * 组件的属性列表
   */
  properties: {
      apiInfo:{
      type: String,
      value: '',
    },
    item:{
      type: Array,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageNumber: 1,  //当前页数
    pageSize: 8,  //每页显示几条数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    clickHandle(e){
      var id = e.currentTarget.dataset.id
      console.log(id)
    },
    upper() {
      var that = this;
      //下拉刷新，将pageNumber和pageSize分别设置成1和5，并初始化数据，让数据重新通过loadData()获取
      that.setData({
        pageNumber: 1,
        pageSize: 8,
        items: []
      })
      that.loadData();
    },
    lower() {
      var that = this;
      var pageNumber = that.data.pageNumber;
      that.setData({
        pageNumber: ++pageNumber
      });
      that.loadData();
    },
    loadData(){console.log('loading...'+this.apiInfo)}
  }
})
