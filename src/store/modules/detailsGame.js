import { apiKey, proxy, giantBombApi } from '../../apiData'
import axios from 'axios'

const state = {
  singleGameDetail: {
    name: '',
    year: '',
    description: '',
    image: '',
    genre: '',
    publishers: '',
    platforms: '',
    similarGames: '',
    giantBombDetails: ''
  }
}
const actions = {
  moreDetails ({ commit }, id) {
    axios
      .get(
        `${proxy}${giantBombApi}game/${id}/?api_key=${apiKey}&format=json&field_list=genres,name,image,deck,publishers,platforms,similar_games,site_detail_url,expected_release_year`
      )
      .then(response => {
        let singleGame = []
        for (let key in response.data.results) {
          singleGame.push(response.data.results[key])
        }
        let details = {
          name: singleGame[3] == null ? 'N/A' : singleGame[3],
          year: singleGame[1] == null ? 'N/A' : singleGame[1],
          description: singleGame[0] == null ? 'N/A' : singleGame[0],
          image: singleGame[2].medium_url,
          genre:
            singleGame[6] == null
              ? 'N/A'
              : singleGame[6].map(e => e.name).join(', '),
          publishers:
            singleGame[7] == null
              ? 'N/A'
              : singleGame[7].map(e => e.name).join(', '),
          platforms:
            singleGame[4] == null
              ? 'N/A'
              : singleGame[4].map(e => e.name).join(', '),
          similarGames:
            singleGame[8] == null
              ? 'N/A'
              : singleGame[8]
                .map(e => e.name)
                .slice(0, 5)
                .join(', '),
          giantBombDetails: singleGame[5] == null ? 'N/A' : singleGame[5]
        }
        commit('setGameDetails', details)
      })
      .catch(error => console.log(error))
  }/* ,
  clearSingleGameDetail ({ commit }) {
    commit('clearSingleGameDetail')
  } */
}
const mutations = {
  setGameDetails (state, details) {
    state.singleGameDetail = details
  }/* ,
  clearSingleGameDetail (state) {
    state.singleGameDetail = {}
  } */
}

const getters = {
  getSingleGameDetail (state) {
    return state.singleGameDetail
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
