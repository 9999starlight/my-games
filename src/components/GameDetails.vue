<template>
  <div class="detailsContainer">
    <div v-if="getSingleGameDetail.name" class="details pd1">
      <img
        :src="getSingleGameDetail.image"
        alt="game image"
        class="block"
      >
      <h2 class="mgb1">{{ getSingleGameDetail.name }}</h2>
      <p class="mgb1"><strong>Year: </strong>{{ getSingleGameDetail.year }}</p>
      <p class="mgb1"><strong>Genre: </strong>{{ getSingleGameDetail.genre }}</p>
      <p class="mgb1"><strong>Publishers: </strong>{{ getSingleGameDetail.publishers }}</p>
      <p class="mgb1"><strong>Platforms: </strong>{{ getSingleGameDetail.platforms }}</p>
      <p class="mgb1"><strong>Description: </strong>{{ getSingleGameDetail.description }}</p>
      <p class="mgb1"><strong>Similar Games: </strong>{{ getSingleGameDetail.similarGames }}</p>
      <a :href="getSingleGameDetail.giantBombDetails" target="_blank" class="gbLink">Giant Bomb Details</a>
      <button class="addBtn">Add to my list</button>
    </div>
    <p v-else class = "noDetails">...</p>
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
.details {
  @include alignment($textAlign: left);
  img {
    @include boxSize($height: auto, $width: 200px);
    margin: 1rem auto;
  }
  strong {
    color: lighten( $yellow, 30% );
  }
  .gbLink {
    color: $yellow;
    text-decoration: underline;
  }
}
</style>
