export default {
  loginIn (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/login/pass', data)
  },
  loginOut (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/login/out')
  },
  getUserInfo () {
    return this.post(this.ONLINE_ROOT_PATH + '/user/info')
  },
  sendCode (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/update/pwd/verify/code', data)
  },
  setPassword (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/modify/pass', data)
  },
  modifyPassword (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/user/modify/pass', data)
  },
  // 修改个人信息
  updateUserInfo (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/user/update', data)
  },
  // 添加团队成员
  addGroupPerson (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/user/save', data)
  },
  // 添加办卡人信息
  addCardHandleInfo (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/card/save', data)
  },
  // 我的团队
  myGroupList (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/user/team/page', data)
  },
  // 办卡信息
  handleCardList (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/card/team/page', data)
  },
  // 团队列表删除某一个
  myGroupListDel (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/user/delete', data)
  },
  // 获取办卡item信息
  getCardItemInfo (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/card/info', data)
  },
  // 编辑办卡人收货地址
  editHandCardPersonAddress (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/card/update ', data)
  },
  // 获取我的二维码信息
  getMyQrcodeInfo (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/user/qrcode ', data)
  }
}
