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
      }
    ]
  }
  // {
  //   path: '',
  //   // name: 'Layout',
  //   component: Layout,
  //   // redirect: 'recommend',
  //   children: [
  //     {
  //       path: '/',
  //       component: Home,
  //       children: [
  //         {
  //           path: '/',
  //           name: 'recommend',
  //           component: () => import('@/layout/components/recommend.vue')
  //         },
  //         {
  //           path: 'production',
  //           name: 'production',
  //           component: () => import('@/layout/components/production.vue')
  //         },
  //         {
  //           path: 'designer',
  //           name: 'designer',
  //           component: () => import('@/layout/components/designer.vue')
  //         },
  //         {
  //           path: 'my',
  //           name: 'my',
  //           component: () => import('@/layout/components/my.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'myDetail:id',
  //       component: () => import('@/view/my/myDetail.vue'),
  //       beforeEnter: (to, from, next) => { // 路由独享的守卫
  //         // ...
  //         next()
  //       }
  //     }
  //   ]
  // }
]

const routers = new Router({ routes })

routers.beforeEach(function (to, from, next) {
  document.body.scrollTop = document.documentElement.scrollTop = 0
  next()
})

// console.log(routers.isBack, 'router.isBack')
export default routers
