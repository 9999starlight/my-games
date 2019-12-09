<template>
  <div id="app">
    <appHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'app',

  components: {
    'appHeader': Header
  }
}
</script>

<style lang="scss">
 @import url('https://fonts.googleapis.com/css?family=Monoton|Ubuntu&display=swap');
 @import './styles/global.scss';
#app {
  /* @include background(radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, rgba(0,0,0,0.9) 100%), url('./assets/controller.jpg'), $backConfig); */
  @include background(radial-gradient(ellipse at center, rgba(78, 77, 77, 0.8) 0%, rgba(78, 77, 77, 0.9) 100%), url('./assets/controller.jpg'), $backConfig);
  @include boxSize($width: 100%, $minHeight: 100vh);
  font-family: 'Ubuntu', Arial, sans-serif;
  // font-family: "Lucida Console", Monaco, monospace;
  color: $white;
}
</style>
