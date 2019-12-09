<template>
  <div class="gameListWrapper flex flexCenter">
    <h1 class="mgb2">My List</h1>
    <div class="buttonWrapper flex flexCenter fullWidth mgb1">
      <button @click="sortByAbc" class="btn sortBtn">Sort A-Z</button>
      <button @click="sortByYear" class="btn sortBtn">Sort by Year</button>
    </div>
    <Loader v-if="isLoading" />
    <transition-group name="gameList" tag="div" style="width: 100%">
      <div
        class="gameList flex flexCenter fullWidth"
        v-for="listItem in fetchedDatabase"
        :key="listItem.dbId"
      >
        <ListItem v-bind:listItem="listItem" v-on:updating="getUpdatedData" />
      </div>
    </transition-group>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      fetchedDatabase: []
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
  },

  mixins: [loaderMixin],

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    ...mapActions(['fetchUser']),

    // realtime fetched or updated collection
    snapshotFunction (snapshot) {
      const gamesArray = []
      snapshot.docs.forEach(doc => {
        const game = doc.data()
        game.dbId = doc.id
        gamesArray.push(game)
      })
      this.fetchedDatabase = gamesArray
    },

    // fetch current user's collection
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

    // fetch collection after update
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
  
  h1 {
    font-family: Lobster, Times, cursive;
  }
  .gameList {
    transition: all 0.8s;
  }

  .gameList-enter, .gameList-leave-to {
    opacity: 0;
    transform: scale(0);
  }

  .gameList-enter-to {
    opacity: 1;
    transform: scale(1);
  }

  .gameList-move {
    opacity: 1;
    transition: all 0.5s;
  }

  .buttonWrapper {
    @include alignment($justify: space-evenly);

    .sortBtn {
      background: linear-gradient(
        to bottom,
        rgb(120, 119, 128) 0%,
        rgb(59, 58, 68) 0%,
        rgb(130, 135, 161) 0%,
        rgb(65, 62, 66) 49%,
        rgb(62, 59, 63) 50%,
        rgb(140, 140, 156) 100%
      );
      color: white;
      width: 120px;
      font-size: 0.8rem;
      padding: 10px 0;
      box-shadow: $shadowSmall;
    }
  }
}

@media (min-width: 996px) {
  .gameListWrapper {
    @include boxSize($maxWidth: 900px);
  }
}
</style>
