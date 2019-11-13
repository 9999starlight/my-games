const state = {
  gameResults: []
}

const mutations = {
  clearArr (state) {
    state.gameResults = []
  },
  // mutation for changing array state
  setGameResults (state, resultsArray) {
    state.gameResults = resultsArray
  }
}

const actions = {
  clearArr (context) {
    context.commit('clearArr')
  },
  // action for changing array state
  catchResults (context, resultsArray) {
    context.commit('setGameResults', resultsArray)
  }
}

const getters = {
  getGameResults (state) {
    return state.gameResults
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
