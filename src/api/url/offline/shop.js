export default {
  getshop (data) {
    return this.post(this.OFFLINE_ROOT_PATH + 'user/authenticate', data)
  }
}
