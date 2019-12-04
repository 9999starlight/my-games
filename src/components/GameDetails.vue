<template>
  <div class="detailsContainer flex flexCenter">
    <Loader v-if="isLoading" />
    <transition name="fadeIn">
      <div v-if="singleGameDetail.name" class="details">
        <div class="mainGameInfo flex">
          <img
            :src="singleGameDetail.image"
            alt="game image"
            class="block pd1"
          />
          <div class="pd1">
            <h2 class="mgb1">{{ singleGameDetail.name }}</h2>
            <p class="mgb1">
              <strong>Year: </strong>{{ singleGameDetail.year }}
            </p>
            <p class="mgb1">
              <strong>Genre: </strong>{{ singleGameDetail.genre }}
            </p>
            <button class="addBtn mgt1" @click="addToList" :disabled="user === null">Add to my list</button>
            <p v-if="user === null" class= "message">{{ loginMessage }}</p>
            <transition name="expand">
              <Message
                v-if="this.getMessage !== ''"
              />
            </transition>
            <a href="#nav" v-scroll-to="'#nav'" class="block hashLink">Back to top &nbsp;<font-awesome-icon :icon="['fa', 'hand-point-up']" font-size="15px"></font-awesome-icon></a>
          </div>
        </div>
        <p class="additionalInfo">
          <strong>Platforms: </strong>{{ singleGameDetail.platforms }}
        </p>
        <p class="additionalInfo">
          <strong>Publishers: </strong>{{ singleGameDetail.publishers }}
        </p>
        <p class="additionalInfo">
          <strong>Description: </strong>{{ singleGameDetail.description }}
        </p>
        <p class="additionalInfo">
          <strong>Similar Games: </strong>{{ singleGameDetail.similarGames }}
        </p>
        <a
          :href="singleGameDetail.giantBombDetails"
          target="_blank"
          class="gbLink mg1"
          >Giant Bomb Details</a
        >
      </div>
    </transition>
  </div>
</template>

<script>
import { apiKey, enableHttps, giantBombApi } from '../apiData'
import axios from 'axios'
import Loader from './Loader'
import Message from './Message'
import { db } from '../firebaseConfig'
import loaderMixin from '../mixins/loaderMixin'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'gameDetails',
  components: {
    Loader,
    Message
  },

  data () {
    return {
      singleGameDetail: {},
      id: this.result.guid,
      loginMessage: 'Login/Sign Up to add to your list'
    }
  },

  mixins: [loaderMixin],

  props: {
    result: {
      type: Object,
      required: true
    }
  },

  created () {
    this.moreDetails(this.id)
  },

  computed: {
    ...mapGetters(['getMessage', 'user'])
  },

  methods: {
    ...mapMutations(['updateMessage']),

    moreDetails (id) {
      this.toggleLoader()
      axios
        .get(
          `${enableHttps}${giantBombApi}game/${id}/?api_key=${apiKey}&format=json&field_list=genres,name,image,deck,publishers,platforms,similar_games,site_detail_url,expected_release_year`
        )
        .then(response => {
          this.toggleLoader()
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
    },

    addToList () {
      db.collection('games')
        .where('gameId', '==', this.id)
        .where('userId', '==', this.user)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length) {
            this.$store.commit('updateMessage', 'You have already added that item to your list!')
          } else {
            this.message = ''
            db.collection('games').add({
              name: this.singleGameDetail.name,
              image: this.singleGameDetail.image,
              year: this.singleGameDetail.year,
              genre: this.singleGameDetail.genre,
              gbLink: this.singleGameDetail.giantBombDetails,
              userId: this.user,
              gameId: this.id,
              favorite: false
            })
            this.$store.commit('updateMessage', 'Added to your list')
          }
        })
        .catch(err => console.log(err.message))
    }
  }
}
</script>
<style lang="scss" scoped>
.detailsContainer {
  @include alignment($direction: column);
  .fadeIn-enter-active {
    animation: fadeIn 1s;
  }
  .fadeIn-leave-active {
    animation: fadeIn 1s reverse;
  }

  .details {
    @include alignment($textAlign: left);
    @include boxSize($width: 100%);
    .mainGameInfo {
      @include alignment($direction: column);
      img {
        @include boxSize($height: auto, $width: 200px);
      }

      .expand-enter-active {
        animation: expand 0.6s;
      }

      .expand-leave-active {
        animation: expand 0.6s reverse;
      }
    }
    strong {
      color: lighten($yellow, 30%);
    }

    .addBtn {
      background: linear-gradient(
        to bottom,
        rgb(43, 181, 142) 0%,
        rgb(7, 84, 57) 52%,
        rgb(8, 86, 61) 54%,
        rgb(13, 105, 66) 70%,
        rgb(43, 181, 132) 100%
      );
      padding: 7px 25px;
      @include fonts($color: $white, $size: 1.1rem);
    }

    .additionalInfo {
      padding: 0.5rem 1rem;
      @include fonts($size: 0.8rem);
    }
    .gbLink {
      color: $yellow;
      text-decoration: underline;
    }
  }

  @media (min-width: 768px) {
    .details {
      .mainGameInfo {
        @include alignment($direction: row);
      }

      .additionalInfo {
        @include fonts($size: 1rem);
      }
    }
  }
}
</style>
