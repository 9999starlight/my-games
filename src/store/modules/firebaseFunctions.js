import { auth } from '../../firebaseConfig'
// import router from '../../router'

const state = {
  user: null,
  showLogin: false
}

const mutations = {
  toggleLogin (state) {
    state.showLogin = !state.showLogin
  },

  setUser (state) {
    if (localStorage.getItem('user') === null) {
      state.user = null
    } else {
      state.user = JSON.parse(localStorage.getItem('user'))
    }
  }
}

const actions = {
  signUp ({ commit }, payload) {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(cred => {
        const user = cred.user
        localStorage.setItem('user', JSON.stringify(user))
        commit('setUser')
        commit('toggleLogin')
      })
      .catch(err => {
        console.log(err.message)
        commit('updateMessage', err.message)
      })
  },

  login ({ commit }, payload) {
    // console.log(email, password)
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(cred => {
        const user = cred.user
        localStorage.setItem('user', JSON.stringify(user))
        commit('setUser')
        commit('toggleLogin')
      })
      .catch(err => {
        console.log(err.message)
        commit('updateMessage', err.message)
      })
  },

  logout ({ commit }) {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem('user')
        window.location.reload()
        // if (this.$route.path === '/my_list') router.push('')
        // router.push('/')
        // commit('setUser') // kada stavim ovo onda je too much recursion
        // console.log(state.user)
        // alert('user logged out')
        /* if (this.props.history.location.pathname === '/movies_list/') {
        this.props.history.push('/')
      } */
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

const getters = {
  showLogin (state) {
    return state.showLogin
  },

  getUser (state) {
    return state.user
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
