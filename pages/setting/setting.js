// pages/setting/setting.js
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
  onLoad(e) {
    this.setData({
      tel:e.tel
    })

  },
  submit(e){
    let tel = this.data.tel
    let username = e.detail.value.username
    let pwd = e.detail.value.pwd
    if(username&&pwd){db.collection('user').where({
      tel:tel
    }).update({
      data:{
        username:username,
        pwd:pwd
      }
    }).then(res=>{
      wx.showToast({
        icon:'success',
        title: '修改成功'
      })   
    })}else{
      wx.showToast({
        icon:'none',
        title: '不能为空'
      })
     
    }


  },
  


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(e) {
  
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