<template>
  <div class="loderContainer">
     <div class="loader mg2"></div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.loader {
  @include boxSize($width: 50px, $height: 50px);
  border-top: rgba(141, 241, 216, 0.877) 6px dotted;
  border-right: rgba(111, 240, 218, 0.884) 7px dotted;
  border-bottom: rgba(75, 240, 199, 0.863) 8px dotted;
  border-left: rgba(24, 235, 200, 0.884) 9px dotted;
  border-radius: 100%;
  animation: spinning 2s infinite linear;
}
</style>
