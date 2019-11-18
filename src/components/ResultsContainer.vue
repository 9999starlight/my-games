<template>
  <div class="resultsContainer">
      <div v-for="result in getGameResults" :key="result.guid">
        <SingleResult v-bind:result="result" />
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import SingleResult from './SingleResult'

export default {
  name: 'ResultsContainer',
  components: {
    SingleResult
  },

  computed: {
    ...mapGetters(['getGameResults'])
  }
}
</script>
<style lang="scss" scoped></style>
