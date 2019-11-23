const state = {
  user: JSON.parse(localStorage.getItem('user')),
  showLogin: false
}

const mutations = {
  toggleLogin (state) {
    state.showLogin = !state.showLogin
    console.log(state)
  }
}

const actions = {}

const getters = {
  showLoginState (state) {
    return state.showLogin
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
