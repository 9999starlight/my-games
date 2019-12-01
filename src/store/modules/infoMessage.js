const state = {
  message: ''
}

const actions = {
  messageTimeout ({ commit }) {
    setTimeout(() => {
      commit('clearMessage')
    }, 3000)
  }
}

const mutations = {
  updateMessage (state, message) {
    state.message = message
  },
  clearMessage (state) {
    state.message = ''
  }
}

const getters = {
  getMessage: state => {
    return state.message
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
