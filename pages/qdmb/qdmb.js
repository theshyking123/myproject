var db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalis:[],
    title:'',
    qg:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    db.collection('muban').doc(e.id).get().then(res => {
      let qg = res.data
      this.setData({
        
        datalist: qg.list,
        title:qg.title,
        qg :qg
      })
    })
  },
  handleTap(){
    let qg = this.data.qg
db.collection('qingdang').add({
  data:{
    title:qg.title,
    list:qg.list,
    date:'',
    time:'',
    cuo:1,
    checked:"1"
  }
}).then(res=>{
  wx.showToast({
    title: '保存成功',
  })
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