<template>
  <div class="gameListWrapper flex flexCenter">
    <Loader v-if="isLoading" />
    <h2 class="mgb2">My List</h2>
    <div class="buttonWrapper flex flexCenter fullWidth mgb1">
      <button @click="sortByAbc" class="sortBtn">Sort A-Z</button>
      <button @click="sortByYear" class="sortBtn">Sort by Year</button>
    </div>
    <div
      class="gameList flex flexCenter fullWidth mgb1"
      v-for="listItem in fetchedDatabase"
      :key="listItem.dbId"
    >
      <ListItem v-bind:listItem="listItem" v-on:updating="getUpdatedData" />
    </div>
    <a href="#nav" v-scroll-to="'#nav'" class="block hashLink mgb2"
        >Back to top &nbsp;<font-awesome-icon
          :icon="['fa', 'hand-point-up']"
          font-size="15px"
        ></font-awesome-icon
    ></a>
  </div>
</template>

<script>
import { db } from '../firebaseConfig'
import Loader from './Loader'
import loaderMixin from '../mixins/loaderMixin'
import ListItem from './ListItem'
import { auth } from '../firebaseConfig'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      fetchedDatabase: [],
      // user: auth.currentUser.uid
    }
  },

  name: 'list',

  components: {
    ListItem,
    Loader
  },

  created () {
    this.$store.dispatch('fetchUser')
    this.fetchGamesCollection()
    // console.log(this.user)
  },

  mixins: [loaderMixin],

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    snapshotFunction (snapshot) {
      const gamesArray = []
      snapshot.docs.forEach(doc => {
        const game = doc.data()
        game.dbId = doc.id
        gamesArray.push(game)
      })
      this.fetchedDatabase = gamesArray
    },

    fetchGamesCollection () {
      this.toggleLoader()
      if (this.user) {
        db.collection('games')
          .where('userId', '==', this.user)
          .get()
          .then(
            snapshot => {
              this.toggleLoader()
              this.snapshotFunction(snapshot)
            },
            err => console.log(err.message)
          )
      }
    },

    // sorting methods
    sortByAbc () {
      db.collection('games')
        .orderBy('name')
        .where('userId', '==', this.user)
        .get()
        .then(
          snapshot => {
            this.snapshotFunction(snapshot)
          },
          err => console.log(err.message)
        )
    },

    sortByYear () {
      db.collection('games')
        .orderBy('year')
        .where('userId', '==', this.user)
        .get()
        .then(
          snapshot => {
            this.snapshotFunction(snapshot)
          },
          err => console.log(err.message)
        )
    },

    getUpdatedData () {
      const gamesArr = []
      db.collection('games')
        .where('userId', '==', this.user)
        .get()
        .then(data => {
          data.docs.forEach(doc => {
            const game = doc.data()
            game.dbId = doc.id
            gamesArr.push(game)
          })
          this.fetchedDatabase = gamesArr
        })
        .catch(err => console.log(err.message))
    }
  }
}
</script>
<style lang="scss" scoped>
.gameListWrapper {
  @include alignment($direction: column);
  @include boxSize($width: 100%);
  margin: 1rem auto;

  .buttonWrapper {
    @include alignment($justify: space-evenly);

    .sortBtn {
      background: linear-gradient(to bottom, rgb(120, 119, 128) 0%, rgb(59, 58, 68) 0%, rgb(130, 135, 161) 0%, rgb(65, 62, 66) 49%, rgb(62, 59, 63) 50%, rgb(140, 140, 156) 100%);
      color: white;
      width: 155px;
      font-size: 0.8rem;
      padding: 10px 0;
    }
  }
}

 @media (min-width: 996px) {
    .gameListWrapper {
      @include boxSize($maxWidth: 900px);
    }
  }
</style>
