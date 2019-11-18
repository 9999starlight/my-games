import Vue from 'vue'
import Vuex from 'vuex'
import gamesResults from './modules/gamesResults'
Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  modules: {
    gamesResults
  }
})
