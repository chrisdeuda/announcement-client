import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store';

import Vuelidate from 'vuelidate'
import axios from 'axios'
import App from './App.vue'
import router from './router'

axios.defaults.withCredentials = true
axios.defaults.baseUrl = process.env.VUE_APP_API_BASE_URL

window.axios = axios;

Vue.prototype.$http = axios
Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Vuelidate)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
