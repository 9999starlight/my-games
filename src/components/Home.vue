<template>
  <div class="container center">
    <div class="formWrapper flex flexCenter pd1">
      <h3 class="mgb1">Search for games</h3>
      <h5 class="mgb1">Login to add games to your list and mark favorites</h5>
      <form class="search flex flexCenter">
        <input type="text" v-model="searchData" />
        <button @click.prevent="fetchData" class="btn searchBtn">Search</button>
      </form>
      <p class="typing">Start typing to search...</p>
    </div>
    <ResultsContainer v-if="getGameResults.length" />
    <h3 class="mg1" v-else>{{ statusMessage }}</h3>
    <!-- <h3 v-if="errorMessage"></h3> -->
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
      /* errorMessage: '' */
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
            console.log(response.data.results)
            response.data.results.forEach(d => resultsArray.push(d))
            this.$store.dispatch('catchResults', resultsArray)
          } else {
            this.statusMessage = 'Game not found'
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  color: $white;
  @include boxSize($width: 100%);
  @include alignment($textAlign: center);

  .formWrapper {
    @include alignment($direction: column, $textAlign: center);
    .typing {
      @include fonts($size: 0.8rem, $color: lightgray);
    }
  }

  .search {
    padding: 1rem 0;

    input[type='text'] {
      transition: width 0.5s ease-in-out;
      width: 180px;
      height: 30px;
      font-size: 1.1rem;
      color: $blackLead;
    }

    .searchBtn {
      background: linear-gradient(229deg, #095e52, #8fc5c9);
      @include fonts($color: $white);
      letter-spacing: 3px;
      text-shadow: #17171a 1px 1px 0;
        &:hover {
           filter: brightness(40%);
         }
    }

    @media(min-width: 500px) {
      input[type='text']:focus {
      width: 400px;
  }
}

  }
}
</style>
