export default {
  getLogin (data) {
    return this.post(this.ONLINE_ROOT_PATH + 'user/authenticate', data)
  },
  register () {
    // return this.ROOT_PATH + 'user/register'
  }
}
