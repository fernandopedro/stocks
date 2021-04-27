import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARY!!!

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6ImZlcm5hbmRvcGVkcm9AZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxOTQzODgyMiwiZXhwIjoxNjE5Njk4MDIyfQ.n-DR4aQfjq-gcFi_GK7j_HaTY8G2dM_3NoK3g7qhw7M'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')