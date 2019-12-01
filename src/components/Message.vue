<template>
  <p class="message">{{ getMessage }}</p>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Message',

  created () {
    this.$store.dispatch('messageTimeout')
  },

  computed: {
    ...mapGetters(['getMessage'])
  },

  methods: {
    ...mapActions['messageTimeout']
  }
}
</script>
<style lang="scss" scoped>
</style>
