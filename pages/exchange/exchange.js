// pages/exchange/exchange.js
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
  exchange() {
    let user = wx.getStorageSync('user')
    let dbuser = wx.cloud.database().collection('user')
    wx.showModal({
      title: '提示',
      content: '是否兑换',
      success(res) {
        if (res.confirm) {
          dbuser.where({
            tel:user.tel
          }).get().then(res=>
            {
              if (res.data[0].jifeng >= 10) {
                dbuser.where({
                  tel:user.tel
                }).update({
                  data: {
                    jifeng: res.data[0].jifeng - 10,
                    flow:  res.data[0].flow + 1
                  }
                })
                wx.showToast({
                  title: '兑换成功',
                })
                let mouth = new Date().getMonth()+1
                let year = new Date().getFullYear()
                let date = new Date().getDate()
                
                wx.cloud.database().collection('jifeng').add({
                  data:{
                    tel:user.tel,
                    username:res.data[0].username,
                    jifeng:res.data[0].jifeng - 10,
                    flow:res.data[0].flow + 1,
                    year:year,
                    date:date,
                    mouth:mouth
                  }
                })
      
              } else {
                wx.showToast({
                  title: '积分不足',
                })
              }
            })
      
        }
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