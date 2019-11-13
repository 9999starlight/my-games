<template>
  <div class="container">
    <form>
      <input type="text" v-model="searchData" />
      <button @click.prevent="fetchData">SEARCH</button>
    </form>
    <ResultsContainer  v-if ="getGameResults.length"/>
    <h3 v-else>{{ statusMessage }}</h3>
    <!-- <h3 v-if="errorMessage">Something went wrong. Please try again later</h3> -->
  </div>
</template>

<script>
import { apiKey, proxy, giantBombApi } from '../apiData'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import ResultsContainer from './ResultsContainer'

export default {
  name: 'home',
  data () {
    return {
      searchData: '',
      statusMessage: ''
      // errorMessage: false
    }
  },
  components: {
    ResultsContainer
  },
  created () {
    console.log(this.searchData)
  },
  computed: {
    ...mapGetters(['getGameResults']),
    ...mapActions(['clearArr', 'catchResults'])
  },
  methods: {
    fetchData () {
      axios
        .get(
          `${proxy}${giantBombApi}search/?api_key=${apiKey}&format=json&query=${this.searchData}&resources=game`
        )
        .then(response => {
          console.log(response)
          this.$store.dispatch('clearArr')
          let resultsArray = []
          if (response.data.results.length) {
            response.data.results.forEach(d => resultsArray.push(d))
            this.$store.dispatch('catchResults', resultsArray)
          } else {
            this.statusMessage = 'Game not found'
          }
        })
        .catch(error => console.log(error))
        // this.errorMessage = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  color: $blue;
  background: $orangeGradient;
  @include boxSize($width: 100%, $height: 100%);
}
</style>
