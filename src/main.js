import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import "./registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios';
import NProgress from 'nprogress';
Vue.config.productionTip = false;

const baseUrl = 'http://2cee5f22.ngrok.io/api'

Vue.mixin({
  methods: {
    $callSnack: function (text, type) {
      console.log('calling snack')
      let color = ''
      switch (type) {
        case 'success':
          color = 'green';
          break;
        case 'warning':
          color = 'orange';
          break;
        case 'danger':
          color = 'red';
          break;
        case 'info':
          color = 'blue';
          break;
      }
      window.getApp.snackbar = {
        show: true,
        text: text,
        color: color
      }
    },
    $http: function () {
      const instance = axios.create({
        baseURL: baseUrl,
      })

      instance.interceptors.request.use(config => {
        NProgress.start()
        return config
      })

      // before a response is returned stop nprogress
      instance.interceptors.response.use(response => {
        NProgress.done()
        return response
      })
      return instance
    },
    $httpT: function () {

      const instance = axios.create({
        baseURL: baseUrl,
        headers: {
          'Authorization': 'Token ' + store.getters.getToken
        }
      })

      instance.interceptors.request.use(config => {
        NProgress.start()
        return config
      })

      // before a response is returned stop nprogress
      instance.interceptors.response.use(response => {
        NProgress.done()
        return response
      })
      return instance


    }
  },
  data: ()=> ({
    app_name: 'TeleMedicina',
    rules: {
      required: (value) => !!value || 'Required.',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      }
    }
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
