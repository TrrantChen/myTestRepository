import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

import Routes from './routes';
import Store from './store';

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        common: Store
    },
    strict: process.env.NODE_ENV !== 'production'
});

const router = new VueRouter({
    routes: Routes,
});

let app = new Vue({
    components: {
        App,
    },
    router,
    store,
});

app.$mount('#app');

