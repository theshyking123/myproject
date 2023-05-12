var db =wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
   
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.getlist()


  },
  q222(){
    db.collection('muban').add({
      data:{
        title:"考研报名资料必备清单",
        list:["1.身份证&身份证复印件",
        "⒉.免冠证件照",
        "3.学历证书及扫描图片",
        "4.学位证书及扫面图片",
        "5.成绩单",
        "6.准考证下载打印",
        "7.个人作品集",
        "8.英语水平证明",
        "9.科研成果",
        "10.已发布论文【原刊&复印件】"
        
          ]
   
      }
    }).then(res => {
    console.log('1231')
    })
  },
  getlist() {
    db.collection('muban').get().then(res => {
      this.setData({
        datalist: res.data
      })
    })
  },
  handTap(e) {
    
    wx.navigateTo({
      url: `/pages/qdmb/qdmb?id=${e.currentTarget.dataset.id}`,
    })
  },
  onReady() {
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */


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