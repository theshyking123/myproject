// pages/learn/learn.js
var db = wx.cloud.database().collection('studyreload')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    id1: '',
    id2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let user = wx.getStorageSync('user')
    this.setData({
      openid:user._openid
    })
    this.getlist()
    
  },
  getlist() {
    db.where({
      _openid:this.data.openid
    }).get().then(res => {
      this.setData({
        datalist: res.data,
        num:res.data.length
      })
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
    console.log(user._openid)
    wx.cloud.database().collection('studyreload').where({
      _openid:user._openid
    }).remove().then(res=>{
    })
this.setData({
  datalist:[]
})
  },
  handleTap(e) {
    console.log(e)
    let id1 = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/learnDetail/learnDetail?id1=${id1}`,
    })
  },
  loop() {
    wx.navigateTo({
      url: '/pages/search/search'
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