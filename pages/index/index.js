// pages/search/search.js
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
  submit(e) {
    
    let username = e.detail.value.username
    let tel = e.detail.value.tel
    let pwd = e.detail.value.pwd
    if(!(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(Number(tel)))){
      wx.showToast({
        title: '手机号错误',
      })
      return;
    }
    
    
    
    db.collection('user').where({
      tel: tel
    }).get().then(res => {
      if (res.data.length === 0) {
        if (username && tel && pwd) {

          db.collection('user').add({
            data: {
              username: username,
              tel: tel,
              pwd: pwd,
              jifeng:0,
              huiyuan:1,
              flow:50
            }
          }).then(res => {
            wx.showToast({
              icon: 'success',
              title: '注册成功'
            })
          })
        } else {
          wx.showToast({
            icon: 'error',
            title: '不能为空'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: '手机号已被注册'
        })
      }
    })
  },
  loop(){
    wx.switchTab({
      url: '/pages/center/center',
    })
    // db.collection(user).where({tel:tel}).get().then(res=>{
    //   console.log(res)
    // })
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

  },
  
    



  
})