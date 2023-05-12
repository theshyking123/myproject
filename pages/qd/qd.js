var db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
qd:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
color1(){
  this.setData({
    iscolor1:true,
    iscolor2:false,
    a:true
  })
  this.getlist(1);
},
color2(){
  this.setData({
    iscolor1:false,
    iscolor2:true,
    a:false
  })
  this.getlist(2);
},
  checkboxChange(e) {
    let value = e.detail.value
    for (const item of this.data.datalist) {
      if(value.includes(item._id))
      {
        db.collection('qingdang').doc(item._id).update({
          data:{
            checked:"2"
          }
        })
      }else{
        db.collection('qingdang').doc(item._id).update({
          data:{
            checked:"1"
          }
        })
      }
  }

  },
  onLoad(options) {
    let userid = options.userid
    this.setData({
      userid: userid
    })
  },
  delete(e) {
    let id = e.currentTarget.dataset.id
    db.collection('qingdang').doc(id).remove().then(res => {
      wx.showToast({
        title: '删除成功',
      })
    })
  },
  getlist(e) {
    if(e==2){
      var color = "1"
    }else{
      var color = "2"
    }
    db.collection('qingdang').where({
      _openid: this.data.userid,
      checked:color
    }).get().then(res => {
      this.setData({
        datalist: res.data
      })
    })
  },
  handTap(e) {

    wx.navigateTo({
      url: `/pages/qingdan/qingdan?id=${e.currentTarget.dataset.id}`,
    })
  },
  addlist() {
    let user = wx.getStorageSync('user')
    let tel = user.tel
    db.collection('user').where({
      tel: tel
    }).get().then(
      res => {
        if (res.data[0].huiyuan === 2) {
          let a = 1
          wx.navigateTo({
            url: '/pages/qingdan/qingdan?id=' + a,
          })
        } else {
          db.collection('qingdang').where({
            _openid: this.data.userid
          }).get().then(res => {
            if (res.data.length < 2) {
              let a = 1
              wx.navigateTo({
                url: '/pages/qingdan/qingdan?id=' + a,
              })
            } else {
              wx.showToast({
                title: '请先成会员',
              })
            }
          })



        }
      }
    )





  },
  // '+e.currentTarget.dataset.id

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
    let user = wx.getStorageSync('user')
    wx.cloud.database().collection('qingdang').where({
      _openid: user._openid
    }).remove()
    this.setData({
      datalsit: []
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