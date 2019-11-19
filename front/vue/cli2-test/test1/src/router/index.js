import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Index from '@/components/index'
import Page1 from '@/components/page1'
import Page2 from '@/components/page2'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld }, 
    { path: '/index', name: 'h', component: Index }, 
    { path: '/page1', name: 'j', component: Page1 }, 
    { path: '/page2', name: 'k', component: Page2 }
  ]
})
