import Vue from 'vue'
import Vuex from 'vuex'
import gamesResults from './modules/gamesResults'
import currentUser from './modules/currentUser'
import infoMessage from './modules/infoMessage'
Vue.use(Vuex)

export const store = new Vuex.Store({
  // strict: true,
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    gamesResults,
    infoMessage,
    currentUser
  }
})
