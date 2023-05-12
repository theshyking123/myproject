// pages/send/send.js
var db = wx.cloud.database().collection('essay')
var dbuser = wx.cloud.database().collection('user')
var dbxuetang = wx.cloud.database().collection('studyreload')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: '',
    userinfo: {},
    isMingan: true


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  getUser() {
    wx.getUserProfile({
      desc: '请授权',
    }).then(res => {

      this.setData({
        userinfo: res.userInfo
      })
    })
  },
  submit(e) {
    let list = e.detail.value
    this.editorContext.getContents({
      success: res => {
        list.content = res.html
        let str1 = list.title
        let str2 = res.text
        let i = 0;
        wx.cloud.database().collection('word').get().then(res => {
          let j = res.data[0].mingan.length;
          while (j--) {
            if (str1.includes(res.data[0].mingan[i]) || str2.includes(res.data[0].mingan[i])) {
              wx.showToast({
                title: '存在敏感词',
              })
              return;
            }
            i++;
          }

          let user = wx.getStorageSync('user')
          dbuser.where({
            tel: user.tel
          }).get().then(res => {
            if (res.data[0].flow > 0) {
              dbuser.where({
                tel: user.tel
              }).update({
                data: {
                  flow: Number(res.data[0].flow - 1)
                }
              })
              if (this.data.blogImg) {
                let path = this.data.blogImg[0].tempFilePath
                let filename = path.substring(path.indexOf('.'))
                filename = new Date().getTime() + filename
                wx.cloud.uploadFile({
                  cloudPath: filename,
                  filePath: path, // 文件路径
                }).then(res => {
                  list.img = res.fileID
                  db.add({
                    data: {
                      toxiang: list.toxiang,
                      name: list.name,
                      title: list.title,
                      brief: list.brief,
                      content: list.content,
                      img: list.img,
                      hot: 0
                    }
                  }).then(res => {
                    dbxuetang.add({
                      data: {
                        id:res._id,
                        toxiang: list.toxiang,
                        title: list.title,
                        tel:user.tel
                      }
                    })
                    wx.showToast({
                      title: '发布成功'
                    })

                  })
                
                })

              } else {
                
                db.add({
                  data: {
                    toxiang: list.toxiang,
                    name: list.name,
                    title: list.title,
                    brief: list.brief,
                    content: list.content,
                    img: "",
                    hot: 0
                  }
                }).then(res => {
                  console.log(res)
                  dbxuetang.add({
                    data: {
                      id:res._id,
                      toxiang: list.toxiang,
                      title: list.title,
                      tel:user.tel
                    }
                  })
                  wx.showToast({
                    title: '发布成功'
                  })
                })
              }
            } else {
              wx.showToast({
                title: '金币不足',
              })
            }
          })
        })
      }
    })



  },

  onEditorReady() {
    wx.createSelectorQuery().select('#contentEditor').context(
      res => {
        this.editorContext = res.context
      }).exec()
  },

  format(e) {
    let format = e.target.dataset
    if (!format.name) return;
    this.editorContext.format(format.name, format.value)
  },
  chooseImage() {
    wx.chooseMedia({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFiles

        this.setData({
          blogImg: tempFilePaths
        })
        // this.uploadImg(tempFilePaths)
      }
    })
  },
  deleteImg(e) {

    this.setData({
      blogImg: null
    })
  },


  // chooseImg(){
  //   wx.chooseMedia({
  //     count:1,
  //     sizeType:['original', 'compressed'],
  //     sourceType:['album', 'camera'],
  //     success:res=>{
  //       const tempFilePaths = res.tempFiles[0].tempFilePath
  //       this.uploadImg(tempFilePaths)

  //     }
  //   })
  // },
  // uploadImg(tempFilePaths){
  //   wx.cloud.uploadFile({
  //     cloudPath: 'example.png',
  //     filePath: tempFilePaths, // 文件路径
  //   }).then(res => {
  //     // get resource ID
  //     console.log(res.fileID)
  //   }).catch(error => {
  //     // handle error
  //   })
  // },

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