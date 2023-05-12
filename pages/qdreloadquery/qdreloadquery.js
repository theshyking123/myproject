var db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {


  },
  getList() {
    const _ = db.command
    let user = wx.getStorageSync('user')
    let date1 = new Date(this.data.date1 + ' ' + '00:00:00').getTime()
    let date2 = new Date(this.data.date2 + ' ' + '00:00:00').getTime()
    db.collection('qingdang').where(_.and([{
      cuo: _.gte(date1)
    }, {
      cuo: _.lte(date2)
    }])).get().then(res => {
if(res.data.length>0){
  this.setData({
    datalist: res.data,
    num: res.data.length
  })
}else{
  wx.showToast({
    title: '无符合条件',
    icon:'none'
  })
}
    }).catch(err=>{
      console.log("查询失败")
    })
  },
  query() {
    this.getList();
  },
  handlestart(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  handleend(e) {
    this.setData({
      date2: e.detail.value
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})