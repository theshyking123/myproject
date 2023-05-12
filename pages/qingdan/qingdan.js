var db = wx.cloud.database().collection('qingdang')
var dbqingdangload = wx.cloud.database().collection('listreload')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    zhuting: '',

  },
  action: {
    method: "pause"
  },
  up() {
    let user = wx.getStorageSync('user')
    wx.cloud.database().collection('user').where({
      tel: user.tel
    }).get().then(res => {
      if (res.data[0].huiyuan == 1) {
        wx.showToast({
          title: '请升级为会员',
        })
      }else{
        wx.showToast({
          title: '设置成功',
          icon: "none"
        })
    
        let newdate = new Date(String(this.data.date) + ' ' + String(this.data.time)).getTime()
        let now = new Date().getTime()
        let aa = (newdate - now)
        setTimeout(() => {
          this.setData({
            action: {
              method: "play"
            }
          })
          wx.showToast({
            title: `今天任务：${this.data.zhuting}`,
            duration: 5000,
            icon: "none"
          })
        }, aa)
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {

    this.setData({
      id: e.id
    })
    this.aaa()

  },
  aaa() {
    if (this.data.id != 1) {
      db.doc(this.data.id).get().then(res => {
        let qg = res.data
        this.setData({
          datalist: qg.list,
          zhuting: qg.title,
          date: qg.date,
          time: qg.time
        })
      })
    }
  },
  inputadd(e) {
    let list = e.detail.value
    this.setData({
      datalist: [...this.data.datalist, list.item]
    })
  },
  submit(e) {
    let qg = {};
    this.setData({
      zhuting: e.detail.value.title
    })
    qg.title = e.detail.value.title
    qg.date = this.data.date
    qg.time = this.data.time
    qg.cuo = new Date(this.data.date + ' ' + '00:00:00').getTime()
    qg.list = this.data.datalist
    qg.checked = "1"
    if (this.data.id != 1) {
      console.log(this.data.id)
      db.doc(this.data.id).update({
        data: qg
      }).then(res => {
        wx.showToast({
          title: '保存成功',
        })
      })
    } else {
      db.add({
        data: qg
      }).then(res => {
        wx.showToast({
          title: '保存成功',
        })
      })
      dbqingdangload.add({
        data: qg
      })
    }
  },
  bindDateChange(res) {
  
    this.setData({
      date: res.detail.value
    })

  },
  bindTimeChange(res) {
    this.setData({
      time: res.detail.value
    })
  },
  reset() {
    this.setData({
      datalist: []
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