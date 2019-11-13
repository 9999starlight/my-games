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

</style>
