import { auth } from '../../firebaseConfig'

const state = {
  user: null
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

const actions = {
  fetchUser ({ commit }) {
    if (!auth.currentUser) {
      commit('setUser', null)
    } else {
      commit('setUser', auth.currentUser.uid)
    }
  }
}

const getters = {
  user (state) {
    return state.user
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
