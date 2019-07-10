
import ROOT_PATH from '../hostConfig/host.config'
import getLogin from './url/online/Auth'
import getshow from './url/offline/shop'
import { get, post } from '../hostConfig/axios'

export default Object.assign(
  {},
  ROOT_PATH,
  getLogin,
  getshow,
  {
    get,
    post
  }
  // {
  // get({ url, headers = this.getHeaders(), params, responseType = 'json' }) {
  //   return axios({ method: 'get', url, headers, params, responseType, timeout: 15000 })
  // },
  // post({ url, headers = this.getHeaders(), data = {} }) {
  //   return axios({ method: 'post', url, headers, data, timeout: 15000 })
  // },
  // getHeaders() {
  //   const _USER_COOKIE = window._Vue.$Utils.getCookie('_USER_COOKIE')
  //   const headers = {
  //     'Content-Type': 'application/json;charset=UTF-8'
  //   }
  //   // if (_USER_COOKIE) {
  //   //   headers.token = _USER_COOKIE
  //   //   // console.log(_USER_COOKIE, '_USER_COOKIE')
  //   // } else {
  //   //   // console.log(window.location, 'window.location.href')
  //   //   window._Vue.$router.push({ path: '/login' })
  //   // }
  //   return headers
  // }
  // }
)
