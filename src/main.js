import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://jameslin-vue-pwa-music-app.herokuapp.com/'
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:8080'
}

fastclick.attach(document.body)
Vue.prototype.$axios = axios

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
