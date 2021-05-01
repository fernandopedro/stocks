import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/formatter'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARY!!!

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkZlcm5hbmRvIFBlZHJvIiwiZW1haWwiOiJmZXJuYW5kb3BlZHJvQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2MTk4MTEwODYsImV4cCI6MTYyMDA3MDI4Nn0.DjTbNckSIT8Jvl3onsU5WPghcdvhu4ZLNdLPhsyYPZE'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')