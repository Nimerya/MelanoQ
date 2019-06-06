import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './plugins/i18n'
import bootstrap from './plugins/bootstrap'
import vuelidate from './plugins/vuelidate'
import datepicker from './plugins/datepicker'
import moment from './plugins/moment'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import ApiService from "./common/api.service"

library.add(faSignOutAlt, faCheck, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

ApiService.init();

Vue.config.productionTip = false


new Vue({
  store,
  router,
  i18n,
  bootstrap,
  vuelidate,
  datepicker,
  moment,
  render: h => h(App)
}).$mount('#app')
