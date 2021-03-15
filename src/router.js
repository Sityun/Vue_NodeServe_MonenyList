import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: "Index", redirect: '/index' },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/index.vue'),
      children: [
        { path: "", name: "Home", component: () => import("./views/Home.vue") },
        { path: "/home", name: "HomeA", component: () => import("./views/Home.vue") },
        { path: "/info", name: "info", component: () => import("./views/info.vue") },
        { path: "/foundlist", name: "Foundlist", component: () => import("./views/Foundlist.vue") }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue'),
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('./views/404.vue'),
    },
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log()
  const isLogin = localStorage.eleToken ? true : false;
  // 如果是登录和注册页面就正常跳转
  if (to.path == "/login" || to.path == "/register") {
    if (isLogin) {
      next("/index")
    } else {
      next()
    }
  } else {
    // 如果不是 则判断是否登录
    isLogin ? next() : next("/login");
  }

})

export default router