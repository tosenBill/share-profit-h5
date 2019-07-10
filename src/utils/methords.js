/**
 * author 沈童童
 * time 2019-03-30
 */
import Contants from '@contants/index'

export default {
  /**
     * @description 判断是否为邮箱地址
     * @param {Object} str 【必须按】 需要判断的字符串
     * @returns {Boolean} 返回布尔值
     */
  isEmail (str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
  },
  /**
   * @description  判断是否为身份证号
   * @param  {String|Number} str  【必须按】 需要判断的字符串
   * @returns {Boolean} 返回布尔值
   */
  isIdCard (str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  },
  /**
   * @description  判断是否为手机号
   * @param  {String|Number} str  【必须按】 需要判断的字符串
   * @returns {Boolean} 返回布尔值
   */
  isPhoneNum (str) {
    return /^[0]?\d{2,3}[- ]?\d{7,8}$|(?:^1[3456789]|^9[28])\d{9}$/.test(str)
  },
  setCookie (key, value, t) {
    const oDate = new Date()
    oDate.setTime(oDate.getTime() + (t * 24 * 60 * 60 * 1000))
    document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toUTCString()
  },
  /**
     *
     * @desc 根据key读取cookie
     * @param  {String} name
     * @return {String}
  */
  getCookie (key) {
    const cookieArr = document.cookie.split('; ')
    for (let i = 0; i < cookieArr.length; i++) {
      const arr1 = document.cookie.split('; ')// 由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；

      for (let j = 0; j < arr1.length; j++) {
        const arr2 = arr1[j].split('=')// 通过=截断，把name=Jack截断成[name,Jack]数组；
        if (arr2[0] === key) {
          return decodeURI(arr2[1])
        }
      }
    }
    return ''
  },
  /**
   *
   * @desc 根据key删除cookie
   * @param  {String} key
  */
  removeCookie (key) {
    // 设置已过期，系统会立刻删除cookie
    document.cookie = '_USER_COOKIE=; expires=Mon, 11 Nov 1990 00:00:00 GMT;path=/'
  },
  /**
   * 阿里云OSS压缩 ** 如果图片路径为空,返回默认图片; 如果图片是阿里云图片,则添加限制 *
   */
  compressImg (imgPath, width) {
    let _ossQuery = `x-oss-process=image/resize,m_lfit,w_${width}/sharpen,80`
    let _imgHost = imgPath.split('/')[2]
    let _allowPath = ['dj001.oss-cn-beijing.aliyuncs.com']
    // console.log(imgPath, 'imgPath')
    // console.log(_allowPath.includes(_imgHost), '_allowPath.includes(_imgHost)')
    if (!imgPath) {
      imgPath = Contants.DEFAUTL_URL + _ossQuery
    } else if (imgPath && _allowPath.includes(_imgHost)) {
      return imgPath + '?' + _ossQuery
    }
    return imgPath
  },
  /**
   * @description 处理数据 批量进行oss压缩处理
   * @param {Array} data 处理前的数据
   * @param {Array} params 处理的条件
   * @param     {Array} path 处理图片的字段
   * @param     {Array} width 处理图片的宽度 可选 不填写默认不进行oss压缩
   * @example Utils.resolveData(item['dtos'], [{ path: 'imgUrl', width: 120 }])
   */
  resolveData (data = [], params = []) {
    if (this.isArray(data)) {
      let _url = ''
      data.map(k => {
        params.map(p => {
          if (this.isArray(k[p.path])) {
            k[p.path] = k[p.path].map(childPath => {
              _url = childPath
                ? Contants.BASE_IMG_URL + childPath
                : Contants.DEFAUTL_URL
              return p.width ? this.compressImg(_url, p.width) : _url
            })
          } else {
            _url = k[p.path]
              ? Contants.BASE_IMG_URL + k[p.path]
              : Contants.DEFAUTL_URL
            k[p.path] = p.width ? this.compressImg(_url, p.width) : _url
          }
        })
      })
    }
    return data
  }
}
