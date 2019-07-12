
// import Host from '@/config/host'
import axios from 'axios'
import Qs from 'qs'
// import { read } from 'fs';
// import ROOT_PATH from './host.config'

// 请求超时时间
axios.defaults.timeout = 10000

// axios.defaults.headers.token = 'glfjldjflhsfod'
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(
  config => {
    // console.log('ROOT_PATH', ROOT_PATH)
    // console.log('window._vue', window._Vue.$store.state.userDefaultDomain)
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = sessionStorage.getItem('token')
    // console.log(token)
    // token && (config.headers.access_token = token)
    if (token) {
      config.headers = {
        'token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  res => {
    // let _data = res.data
    // console.log(_data)
    if (res.status === 200) {
      // console.log('res', res)
      // console.log('_data', _data)
      // if (res.code !== '0000-0000') {
      //   window._Vue.$toast({
      //     message: _data.errMsg,
      //     duration: 3000
      //   })
      // }
      // console.log(_data.code)
      /*
      if (Object.prototype.toString.call(_data).slice(8, -1) === 'Object') {
        if (_data.code !== '0000-0000') {
          window._Vue.$notify({
            message: _data.errMsg,
            duration: 1000,
            background: '#ff4444'
          })
        }
        switch (_data.code) {
          case 1001:
            // window._Vue.$store.dispatch("loginOut")
            window._Vue.$notify({
              message: _data.message,
              duration: 1000,
              background: '#ff4444'
            })
            break
          case 1002: {
            window._Vue.$notify({
              message: _data.message,
              duration: 1000,
              background: '#ff4444'
            })
            _data = null
            break
          }
        }
      }
      */
    }
    return res
  },
  err => {
    switch (err.response.status) {
      case 400:
        break
      case 401: {
        // let _messages = "";
        // if (err.response.data.title === "Unauthorized") {
        //     _messages = "登录失效, 请重新登录";
        // } else {
        //     _messages = err.response.data.message ? err.response.data.message : "登录失效, 请重新登录";
        // }
        // window._Vue.$message.error(_messages);
        // window._Vue.$router.push({ name: "login" });
        // window._Vue.$store.dispatch('setLogin',false);
        break
      }
      case 405:
      case 500:
      default:
        console.log('server err')
        window._Vue.$notify({
          message: '服务器错误',
          duration: 1000,
          background: '#ff4444'
        })
        // if (err.response.data && err.response.data.message) {
        //   window._Vue.$message.error(err.response.data.message)
        // } else {
        //   window._Vue.$message.error('服务器错误')
        // }
        break
    }
    return err.response
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
* post方法，对应post请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export const post = (url, ...params) => {
  return new Promise((resolve, reject) => {
    // const qsParams = Qs.stringify(...params)
    // console.log('params', qsParams)
    axios.post(url, Qs.stringify(...params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
