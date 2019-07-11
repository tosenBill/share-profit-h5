export default {
  loginIn (data) {
    return this.post(this.ONLINE_ROOT_PATH + '/login/pass', data)
  },
  register () {
    // return this.ROOT_PATH + 'user/register'
  }
}
