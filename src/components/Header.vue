<template>
  <nav class="flex" id="nav">
    <ul class="links flex">
      <router-link :to="{ name: 'home' }" tag="li" active-class="active" exact
        ><a>Search</a></router-link
      >
      <router-link v-if="getUser" :to="{ name: 'list' }" tag="li" active-class="active"
        ><a>My List</a></router-link
      >
    </ul>
    <ul class="userLinks flex">
      <li>{{ getUser ? getUser.email : null }}</li>
      <li v-if="getUser">
        <button class="btn logBtn" @click.prevent="logoutUser">Logout</button>
      </li>
      <li v-if="getUser === null">
        <button class="btn logBtn" @click="toggleLogin">Login</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
// import { auth } from '../firebaseConfig'
export default {
  name: 'appHeader',

  computed: {
    ...mapGetters(['getUser'])
  },

  methods: {
    ...mapMutations(['toggleLogin']),
    ...mapActions(['logout']),

    logoutUser () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style lang="scss" scoped>
nav {
  @include alignment($direction: column);
  ul {
    li {
      padding: 0.7rem;
      @include fonts($size: 1rem);
    }

    .logBtn {
      background-color: transparent;
      @include fonts($color: $turquoise, $size: 1rem);
    }
  }

  .links {
    @include alignment($justify: flex-end);
    background-color: $darkPurple;
  }
}

.userLinks {
  @include alignment($justify: space-between, $align: center);
}

.active {
  background: $turquoiseGradient;
  opacity: 0.9;
}
</style>
