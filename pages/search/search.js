var db = wx.cloud.database().collection('essay')
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
    this.setData({
      search: this.search.bind(this)
    })

  },
  search(e) {
    let _ = wx.cloud.database().command

    return Promise.all([db.where(_.or([{

      title: wx.cloud.database().RegExp({
        regexp: e,
        options: 'i'
      })


    }, {
      name: wx.cloud.database().RegExp({
        regexp: e,
        options: 'i'
      })
    }])).get()]).then(res => {
        return res[0].data.map(item => ({
          ...item,
          text: item.title
        }))
      }

    )


  },
  selectResult(e) {
    console.log(e.detail.item)
    let id = e.detail.item._id
    wx.navigateTo({
      url: '/pages/learnDetail/learnDetail?id1=' + id,
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