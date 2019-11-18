<template>
  <div class="detailsContainer flex flexCenter">
    <Loader v-if="!singleGameDetail.name" />
    <div v-if="singleGameDetail.name" class="details pd1">
      <img :src="singleGameDetail.image" alt="game image" class="block" />
      <h2 class="mgb1">{{ singleGameDetail.name }}</h2>
      <p class="mgb1"><strong>Year: </strong>{{ singleGameDetail.year }}</p>
      <p class="mgb1"><strong>Genre: </strong>{{ singleGameDetail.genre }}</p>
      <p class="mgb1">
        <strong>Publishers: </strong>{{ singleGameDetail.publishers }}
      </p>
      <p class="mgb1">
        <strong>Platforms: </strong>{{ singleGameDetail.platforms }}
      </p>
      <p class="mgb1">
        <strong>Description: </strong>{{ singleGameDetail.description }}
      </p>
      <p class="mgb1">
        <strong>Similar Games: </strong>{{ singleGameDetail.similarGames }}
      </p>
      <a
        :href="singleGameDetail.giantBombDetails"
        target="_blank"
        class="gbLink"
        >Giant Bomb Details</a
      >
      <button class="addBtn">Add to my list</button>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { apiKey, proxy, giantBombApi } from '../apiData'
import axios from 'axios'
import Loader from './Loader'

export default {
  name: 'gameDetails',
  components: {
    Loader
  },
  data () {
    return {
      singleGameDetail: {},
      id: this.result.guid
    }
  },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  created () {
    this.moreDetails(this.id)
  },
  /* computed: {
    ...mapGetters(['getSingleGameDetail'])
  }, */
  methods: {
    moreDetails (id) {
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
          this.singleGameDetail = details
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
<style lang="scss" scoped>
.detailsContainer {
  @include alignment($direction: column);
  .details {
    @include alignment($textAlign: left);
    img {
      @include boxSize($height: auto, $width: 200px);
      margin: 1rem auto;
    }
    strong {
      color: lighten($yellow, 30%);
    }
    .gbLink {
      color: $yellow;
      text-decoration: underline;
    }
  }
}
</style>
