<template>
  <div class="resultsContainer">
      <div v-for="result in getGameResults" :key="result.guid">
        <SingleResult v-bind:result="result" />
    </div>
    <a href="#nav" v-scroll-to="'#nav'" class="block hashLink mgb1">Back to top &nbsp;<font-awesome-icon :icon="['fa', 'hand-point-up']" font-size="15px"></font-awesome-icon></a>
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
