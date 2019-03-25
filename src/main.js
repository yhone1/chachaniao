// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import store from './store/index'
// 引入echarts
import echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入mockjs
require('./mock.js')

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    if (sessionStorage.username) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.filter('getYMD', function (input) {
  return input.split(' ')[0]
})
