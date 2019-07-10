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
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/home.vue')
      },
      {
        path: '/register',
        name: 'register',
        meta: {
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/view/register.vue')
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
