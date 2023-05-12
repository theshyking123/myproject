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
    let user = wx.getStorageSync('user')
    db.collection('listreload').where({
      _openid: user._openid
    }).get().then(res => {
      this.setData({
        datalist: res.data,
        num: res.data.length
      })
    })

  },
  query() {
    let user = wx.getStorageSync('user')
    let tel = user.tel
    db.collection('user').where({
      tel: tel
    }).get().then(res=>{
      if (res.data[0].huiyuan == 2) {
        wx.navigateTo({
          url: '/pages/qdreloadquery/qdreloadquery',
        })
      }else{
        wx.showToast({
          title: '请先成为会员',
        })
      }
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
    let user =  wx.getStorageSync('user')
    wx.cloud.database().collection('listreload').where({
      _openid:user._openid
    }).remove()
this.setData({
  datalist:[]
})
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