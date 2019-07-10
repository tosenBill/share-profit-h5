// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vant from 'vant'

import 'lib-flexible'
import '../src/assets/css/main.scss'
import 'vant/lib/index.css'

import 'font-awesome/css/font-awesome.min.css'

import api from 'Api'
import utils from './utils/index'

Vue.prototype.$http = api
Vue.prototype.$Utils = utils

Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}

Vue.prototype.$go_back = function () {
  if (this.$route.query.goindex === 'true') {
    this.$router.push('/')
  } else {
    this.$router.back(-1)
  }
  this.$router.isBack = true
}

Vue.config.productionTip = false

// Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(Vant)
/* eslint-disable no-new */
const _Vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
window._Vue = _Vue
