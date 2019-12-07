<template>
  <div class="container center">
    <div class="formWrapper flex flexCenter pd1 mg2">
      <h2 class="mgb1">Search for games</h2>
      <h5 class="mgb1">Login to add games to your list and mark favorites</h5>
      <form class="search flex flexCenter">
        <input type="text" v-model="searchData" placeholder="Search..." ref="mainInput" autofocus/>
        <button @click.prevent="fetchData" class="searchBtn">
          <font-awesome-icon :icon="['fas', 'search']" class="magnify">
          </font-awesome-icon>
        </button>
      </form>
      <p class="typing">Enter game name or keyword to search...</p>
      <Loader v-if="isLoading" />
    </div>
    <ResultsContainer v-if="hasResults" />
    <h3 class="mg1" v-else>{{ statusMessage }}</h3>
  </div>
</template>

<script>
import { apiKey, enableHttps, giantBombApi } from '../apiData'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import ResultsContainer from './ResultsContainer'
import Loader from './Loader'
import loaderMixin from '../mixins/loaderMixin'

export default {
  name: 'home',
  data () {
    return {
      searchData: '',
      statusMessage: '',
      hasResults: false
    }
  },
  components: {
    ResultsContainer,
    Loader
  },

  mixins: [loaderMixin],

  mounted () {
    this.$refs['mainInput'].focus()
  },

  computed: {
    ...mapGetters(['getGameResults']),
    ...mapActions(['clearArr', 'catchResults'])
  },

  methods: {
    // search by input value
    fetchData () {
      this.toggleLoader()
      axios
        .get(
          `${enableHttps}${giantBombApi}search/?api_key=${apiKey}&format=json&query=${this.searchData}&resources=game`
        )
        .then(response => {
          this.toggleLoader()
          console.log(response)
          this.$store.dispatch('clearArr')
          let resultsArray = []
          if (response.data.results.length) {
            console.log(response.data.results)
            this.hasResults = true
            response.data.results.forEach(d => resultsArray.push(d))
            this.$store.dispatch('catchResults', resultsArray)
          } else {
            this.hasResults = false
            this.statusMessage = 'Game not found'
          }
        })
        .catch(error => {
          console.log(error)
          this.statusMessage = 'Something went wrong, try again later!'
        })
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
      @include fonts($size: 0.8rem, $color: rgb(160, 159, 159));
    }
  }

  .search {
    padding: 1rem 0;

    input[type='text'] {
      transition: width 0.5s ease-in-out;
      @include boxSize($width: 180px, $height: 30px);
      @include fonts($color: $blackLead, $size: 1.1rem);
      padding-left: 0.3rem;
      border-radius: 8px 0 0 8px;
    }

    .searchBtn {
      background: linear-gradient(180deg, #095e52, #0c796a);
      @include fonts($color: $white);
      @include boxSize($width: 60px, $height: 30px);
      border-radius: 0 8px 8px 0;

      .magnify {
        @include fonts($size: 1.2rem);
      }
    }
  }
}

    @media(min-width: 500px) {
      .container {
        .search {
          input[type='text'] {
            @include boxSize($width: 220px, $height: 35px);
              &:focus {
                width: 400px;
              }
          }

          .searchBtn {
            @include boxSize($height: 35px);
          }
        }
      }
    }

    @media(min-width: 996px) {
      .container {
        @include boxSize($maxWidth: 900px);

          .formWrapper {
            @include fonts($size: 120%);
           }
      }
    }
</style>
