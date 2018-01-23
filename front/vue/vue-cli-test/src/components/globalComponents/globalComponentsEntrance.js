import globalComponents1 from './globalComponents1.vue'
// 这里是重点
const Loading = {
    install: function(Vue){
        Vue.component('globalComponents1', globalComponents1)
    }
}

// use的使用主要是因为需要注入Vue实例
// 导出组件
export default function(Vue) {
    Vue.component('globalComponents1', globalComponents1)
}

// 等同于
// export default {
//     install: function(Vue){
//         Vue.component('globalComponents1',globalComponents1)
//     }
// }