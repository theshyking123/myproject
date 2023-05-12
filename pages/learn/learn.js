// pages/learn/learn.js
var db = wx.cloud.database().collection('essay')
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
    this.getlist()
  },
  getlist() {
    db.limit(5).get().then(res => {
      this.setData({
        datalist: res.data
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
    this.getlist()
  },
  handleTap(e) {
    
    let id1 = e.currentTarget.dataset.id
    db.doc(id1).get().then(res=>
      {
        db.doc(id1).update({
          data:{
            hot:res.data.hot+1
          }
        })
      }
      )
    
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
    db.limit(5).skip(this.data.datalist.length).get().then(res => {
      this.setData({
        datalist: this.data.datalist.concat(res.data)
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})