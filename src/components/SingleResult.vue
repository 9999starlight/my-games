<template>
  <div class="singleResult">
    <img :src="result.image.medium_url" alt="game image" />
    <p>{{ result.name }}</p>
    <p>{{ result.expected_release_year }}</p>
    <p>{{ result.deck }}</p>
    <p>{{ result.guid }}</p>
    <button class="btn" @click="moreDetails">More details</button>
    <gameDetails />
  </div>
</template>
<script>
import gameDetails from './GameDetails'
import { mapActions } from 'vuex'
export default {
  name: 'SingleResult',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  components: {
    gameDetails
  },
  methods: {
    ...mapActions(['moreDetails']),
    moreDetails () {
      this.$store.dispatch('moreDetails', this.result.guid)
    }
  }
}
</script>
<style lang="scss" scoped></style>
