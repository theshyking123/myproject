// pages/learnDetail/learnDetail.js
var db = wx.cloud.database().collection('essay')
var tapzan = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: '../../img/点赞 (1).png',
    id2: ''
  },
  jifeng() {
    let user = wx.getStorageSync('user')
    let tel = user.tel
    wx.cloud.database().collection('user').where({
      tel: tel
    }).get().then(
      res => {
        let jifeng = res.data[0].jifeng
        wx.cloud.database().collection('user').where({
          tel: tel
        }).update({
          data: {
            jifeng: jifeng + 10
          }
        })
        wx.showToast({
          title: '积分加10'
        })
      }

    )




  },
  handleError() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    db.doc(e.id1).get().then(res => {
      this.setData({
        datalist: res.data
      })
    })
  },
  handlezan() {
    if (tapzan) {
      this.setData({
        imgurl: '../../img/点赞.png'
      })
    } else {
      this.setData({
        imgurl: '../../img/点赞 (1).png'
      })
    }
    tapzan = !tapzan

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