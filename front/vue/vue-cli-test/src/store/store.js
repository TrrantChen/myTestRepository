import Vue from 'vue'
import Vuex from 'vuex';
import myStore from './myStore';

Vue.use(Vuex);

const store = new Vuex.Store(myStore);

export default store;