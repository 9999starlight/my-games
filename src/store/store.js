import Vue from 'vue'
import Vuex from 'vuex'
import gamesResults from './modules/gamesResults'
import firebaseFunctions from './modules/firebaseFunctions'
import infoMessage from './modules/infoMessage'
Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  modules: {
    gamesResults,
    infoMessage,
    firebaseFunctions
  }
})
