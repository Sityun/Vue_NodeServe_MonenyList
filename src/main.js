import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局配置
Vue.use(ElementUI)

// 引入axios
import axios from './http'
// require("./http")
//把axios注册到Vue
Vue.prototype.$axios = axios
//关闭vue在console中的默认提示
Vue.config.productionTip = false
axios.defaults.baseURL = "/api";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
