<template>
  <div id="app">
    <appHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
/* import Home from './components/Home'
import GameDetails from './components/GameDetails'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MyList from './components/MyList' */

export default {
  name: 'app',
  data () {
    return {
      // activeComponent: 'home'
    }
  },
  components: {
    'appHeader': Header
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
 @import './styles/global.scss';
#app {
    /* @include background(linear-gradient(135deg, rgba(58,62,64,0.63) 0%, rgba(0,0,0,1) 100%), url('./assets/sunlight_sparkle.jpg'), $backConfig); */
    /* background: linear-gradient(135deg, rgba(58,62,64,0.63) 0%, rgba(0,0,0,1) 100%); */
    background: linear-gradient(to bottom right, #000000d4 0%, rgba(33, 21, 43, 0.82) 51%, #000000cf 100%);
    background: -webkit-linear-gradient(-45deg, rgba(0, 0, 0, 0.849) 0%, rgba(33, 21, 43, 0.82) 51%, rgba(0, 0, 0, 0.795) 100%);
    @include boxSize($width: 100%, $minHeight: 100vh);
    font-family: 'Raleway', Arial, sans-serif;
    color: $white;
}
</style>
