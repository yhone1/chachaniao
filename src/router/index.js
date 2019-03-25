import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/login'
import index from '../components/mymain'
import yhgl from '../components/kehu'
import tzgg from '../components/tongzhigonggao'
import fkgl from '../components/fangkuan'
import cpgl from '../components/chanpinguanli'
import yggl from '../components/yuangongguanli'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login/'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        needLogin: true
      },
      component: index
    },
    {
      path: '/yhgl',
      name: 'yhgl',
      meta: {
        needLogin: true
      },
      component: yhgl
    },
    {
      path: '/tzgg',
      name: 'tzgg',
      meta: {
        needLogin: true
      },
      component: tzgg
    },
    {
      path: '/fkgl',
      name: 'fkgl',
      meta: {
        needLogin: true
      },
      component: fkgl
    },
    {
      path: '/cpgl',
      name: 'cpgl',
      meta: {
        needLogin: true
      },
      component: cpgl
    },
    {
      path: '/yggl',
      name: 'yggl',
      meta: {
        needLogin: true
      },
      component: yggl
    }
  ]
})
