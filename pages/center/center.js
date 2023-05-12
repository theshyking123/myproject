// pages/center/center.js
var db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: '',
    userupdate: '',
    isMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    let user = wx.getStorageSync('user')
    this.setData({
      userinfo: user
    })


  },
  submit(e) {
    // let username = e.detail.value.username
    let tel = e.detail.value.tel
    let pwd = e.detail.value.pwd
    if (tel && pwd) {
      db.collection('user').where({
        tel: tel
      }).get().then(res => {
        if (pwd === res.data[0].pwd) {
          wx.setStorageSync('user', res.data[0])
          wx.showToast({
            icon: 'success',
            title: '登录成功'
          })
          this.setData({
            userinfo: res.data[0]
          })
        }

      })
    } else {
      wx.showToast({
        icon: 'error',
        title: '不能为空'
      })
    }
  },
  handleLoginOut() {
    this.setData({
      userinfo: ''
    })
    wx.setStorageSync('user', null)
  },
  handleAccount() {
    wx.navigateTo({
      url: '/pages/setting/setting?tel=' + this.data.userinfo.tel,
    })
  },

  uplevel() {
    let user = wx.getStorageSync('user')
    let tel = user.tel
    db.collection('user').where({
      tel: tel
    }).get().then(res => {
      if (res.data[0].huiyuan == 2) {
        wx.showToast({
          title: '该账号已成为会员，无需升级',
          icon: 'none'
        })
      } else {
        this.setData({
          isMask: false,
        })
      }
    })

    // this.jifengUp()
  },
  back() {

    this.setData({
      isMask: true,
    })
  },
  wxpay() {
    let user = wx.getStorageSync('user')
    let tel = user.tel
    wx.showModal({
      title: '提示',
      content: '是否支付100元',
      success(res) {
        if (res.confirm) {
          db.collection('user').where({
            tel: tel
          }).get().then(res => {
            db.collection('user').where({
              tel: tel
            }).update({
              data: {
                huiyuan: 2,
                flow: res.data[0].flow + 10000
              }

            })
            let mouth = new Date().getMonth() + 1
            let year = new Date().getFullYear()
            let date1 = new Date().getDate()
            let date = String(year)+'-'+String(mouth)+'-'+String(date1)

            db.collection('pay').add({
              data: {
                username: res.data[0].username,
                tel: res.data[0].tel,
                date:date,
                number:100
              }

            })

            wx.showToast({
              title: '支付成功',
            })
          })
        }
      }
    })

  },

  jifengUp() {
    let user = wx.getStorageSync('user')
    let tel = user.tel
    db.collection('user').where({
      tel: tel
    }).get().then(res => {
      if (res.data[0].huiyuan == 2) {
        wx.showToast({
          title: "该账号已成为会员,无需升级",
          icon: 'none',

        })

        return;
      }
      let jifeng = res.data[0].jifeng - 50
      if (jifeng >= 0) {
        db.collection('user').where({
          tel: tel
        }).update({
          data: {
            huiyuan: 2,
            jifeng: jifeng,
            flow: res.data[0].flow + 10000
          }
        })
        wx.showToast({
          title: '升级成功',
        })

      } else {
        wx.showToast({
          title: '积分不足',
        })
      }
    })

  },
  aboutJifeng() {
    wx.navigateTo({
      url: '/pages/duihuang/duihuang',
    })
  },
  payrecord(){
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  about() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  handlePersonal() {
    let user = wx.getStorageSync('user')
    let tel = user.tel
    wx.navigateTo({
      url: '/pages/personal/personal?tel=' + tel,
    })
  },
  handlesend() {
    wx.navigateTo({
      url: '/pages/xuetangreload/xuetangreload',
    })
  },
  handleqd() {
    wx.navigateTo({
      url: '/pages/qdreload/qdreload',
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