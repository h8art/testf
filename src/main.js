import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueAxios from 'vue-axios'
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
const apiUrl = "http://10.101.104.28:8083/"
Vue.axios.defaults.baseURL = apiUrl + '/api/v1';
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
