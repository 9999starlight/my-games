<template>
  <p class="message">{{ message }}</p>
</template>
<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: String,
      required: true
    }
  },

  created () {
    this.messageTimeout()
  },

  methods: {
    emptyMessage () {
      this.$emit('emptyMessage', '')
    },

    messageTimeout () {
      setTimeout(() => {
        this.emptyMessage()
      }, 3000)
    }
  }
}
</script>
<style lang="scss" scoped>
.message {
  @include fonts($size: 0.9rem, $color: rgb(207, 117, 132));
  padding: 0.6rem 0;
}
</style>
