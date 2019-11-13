<template>
  <div class="detailsContainer">
    <h2>Game details</h2>
    <div class="details">
      <img
        :src="getSingleGameDetail.image"
        alt="game image"
      >
      <h2>{{ getSingleGameDetail.name }}</h2>
      <h2>Year: {{ getSingleGameDetail.year }}</h2>
      <h4>Genre: {{ getSingleGameDetail.genre }}</h4>
      <h4>Publishers: {{ getSingleGameDetail.publishers }}</h4>
      <h4>Platforms: {{ getSingleGameDetail.platforms }}</h4>
      <h4>Description: {{ getSingleGameDetail.description }}</h4>
      <h4>Similar Games: {{ getSingleGameDetail.similarGames }}</h4>
      <a :href="getSingleGameDetail.giantBombDetails" target="_blank">Giant Bomb Details</a>
      <button>Add to my list</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'gameDetails',
  computed: {
    ...mapGetters(['getSingleGameDetail'])
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
