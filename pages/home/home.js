// pages/home/home.js
var db = wx.cloud.database().collection('user')
var dbessay = wx.cloud.database().collection('essay')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    looplist: ['../../img/冬天.png', '../../img/夏天.png', '../../img/秋天.png']
  },
  bindDateChange(res) {
    console.log(res)


  },
  bindTimeChange(res) {
    console.log(res)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.getlist();
  },
  getlist() {
    dbessay.orderBy("hot",'desc').limit(6).get().then(res => {
      this.setData({
        datalist: res.data
      })
    })
  },
  handleTap(e) {
    let id1 = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/learnDetail/learnDetail?id1=${id1}`,
    })
  },
  handleInput(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  
  xuetang() {
    wx.switchTab({
      url: '/pages/learn/learn',
    })

  },
  muban() {
    let user = wx.getStorageSync('user')
    db.where({
      tel:user.tel
    }).get().then(res=>{
      let huiyuan = res.data[0].huiyuan
      if(huiyuan==2)
    {
      wx.navigateTo({
        url: '/pages/qddetail/qddetail',
      })
    }else{
      wx.showToast({
        title: '请升级成会员',
      })
    }
    })
    
  },
  share() {
    wx.navigateTo({
      url: '/pages/exchange/exchange',
    })
  },
  qingdang() {
     let user = wx.getStorageSync('user')
    let userid = user._openid
    wx.navigateTo({
      url: '/pages/qd/qd?userid='+userid,
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
    this.getlist();
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