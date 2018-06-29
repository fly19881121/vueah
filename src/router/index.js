import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/page/Index'
import Actionsheet from '@/page/actionsheet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Actionsheet',
      name: 'Actionsheet',
      component: Actionsheet
    }
  ]
})
