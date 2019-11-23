<template>
  <div class="gameListWrapper">
    <h2>My List</h2>
    <Loader v-if="isLoading" />
    <div class="gameList" v-for="listItem in fetchedDatabase" :key="listItem.dbId">
      <ListItem  v-bind:listItem="listItem"/>
    </div>
  </div>
</template>

<script>
import { db } from '../firebaseConfig'
import Loader from './Loader'
import loaderMixin from '../mixins/loaderMixin'
import ListItem from './ListItem'

export default {
  data () {
    return {
      fetchedDatabase: [],
      isLoading: false
    }
  },

  name: 'my-list',

  components: {
    ListItem,
    Loader
  },

  created () {
    this.fetchGamesCollection()
  },

  mixins: [loaderMixin],

  methods: {
    // firebase realtime (snapshot) functions for fetching and sorting data
    snapshotFunction (snapshot, gamesArray) {
      snapshot.docs.forEach(doc => {
        const game = doc.data()
        game.dbId = doc.id
        gamesArray.push(game)
        this.fetchedDatabase = gamesArray
      })
    },

    fetchGamesCollection () {
      this.toggleLoader()
      // if (this.user) {
      const gamesArray = []
      db.collection('games')
        // .where('userId', '==', this.user.uid)
        .get()
        .then(
          snapshot => {
            this.toggleLoader()
            this.snapshotFunction(snapshot, gamesArray)
            console.log(this.fetchedDatabase)
          },
          err => console.log(err.message)
        )
      // }
    }
  }
}
</script>
<style lang="scss" scoped></style>
