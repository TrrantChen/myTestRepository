import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/page/index'
import HelloWorld from '@/components/helloworld'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/test',
            name: 'test',
            component: HelloWorld,
        }
    ]
});
