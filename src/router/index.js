import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/view/index'

Router.prototype.goBack = function () {
  this.isBack = true
  // window.history.go(-1)
}

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/loginIn',
    children: [
      {
        path: '/',
        name: 'loginIn',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/loginIn.vue')
      },
      {
        path: '/home',
        name: 'home',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/home.vue')
      },
      {
        path: '/loginOut',
        name: 'loginOut',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/loginOut.vue')
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/userInfo.vue')
      },
      {
        path: '/changePassword',
        name: 'changePassword',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/changePassword.vue')
      },
      {
        path: '/myGroup',
        name: 'myGroup',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/myGroup.vue')
      },
      {
        path: '/handleCardInfo',
        name: 'handleCardInfo',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/handleCardInfo.vue')
      },
      {
        path: '/editHandleCardInfo/:cellPhone',
        name: 'editHandleCardInfo',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/editHandleCardInfo.vue')
      },
      {
        path: '/qrcode',
        name: 'qrcode',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/qrcode.vue')
      },
      {
        path: '/addGroupPerson',
        name: 'addGroupPerson',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/addGroupPerson.vue')
      },
      {
        path: '/handlePersonInfo',
        name: 'handlePersonInfo',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/handlePersonInfo.vue')
      },
      {
        path: '/passDetail/:id',
        name: 'passDetail',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/passDetail.vue')
      },
      {
        path: '/notpassDetail/:id',
        name: 'notpassDetail',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/notpassDetail.vue')
      }
    ]
  }
]

const routers = new Router({ routes })

routers.beforeEach(function (to, from, next) {
  document.body.scrollTop = document.documentElement.scrollTop = 0
  next()
})

// console.log(routers.isBack, 'router.isBack')
export default routers
