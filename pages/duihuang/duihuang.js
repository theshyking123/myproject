// pages/duihuang/duihuang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
user:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   let user =  wx.getStorageSync('user')
wx.cloud.database().collection('jifeng').where({
  tel:user.tel
}).get().then(res=>{
  console.log(res.data)
  this.setData({
    user:res.data
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
    wx.cloud.database().collection('jifeng').where({
      tel:user.tel
    }).remove()
this.setData({
  user:[]
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