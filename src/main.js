import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { auth } from './firebaseConfig'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faWindowClose,
  faTrashAlt,
  faHandPointUp,
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
/* import {
  faUser
} from '@fortawesome/free-regular-svg-icons' */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faAngleDoubleDown, faAngleDoubleUp, faWindowClose, faTrashAlt, faHandPointUp, faUser, faSignOutAlt, faSignInAlt, faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)
let VueScrollTo = require('vue-scrollto')
Vue.use(VueAxios, axios)
Vue.use(VueScrollTo)

Vue.config.productionTip = false

auth.onAuthStateChanged(user => {
  new Vue({
    store,
    router,
    axios,
    render: h => h(App)
  }).$mount('#app')
})
