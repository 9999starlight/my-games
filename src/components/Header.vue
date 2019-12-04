<template>
  <nav class="flex" id="nav">
    <ul class="links flex">
      <router-link :to="{ name: 'home' }" tag="li" active-class="active" exact
        ><a>Search</a></router-link
      >
      <router-link
        v-if="isLogged"
        :to="{ name: 'list' }"
        tag="li"
        active-class="active"
        ><a>My List</a></router-link
      >
    </ul>
    <ul class="userLinks flex">
      <li v-if="isLogged">{{ currentUser }}</li>
      <li v-if="isLogged">
        <button class="btn logBtn" @click.prevent="logoutUser">Logout</button>
      </li>
      <router-link
        v-if="!isLogged"
        :to="{ name: 'login' }"
        tag="li"
        active-class="active"
        class="logBtn"
        ><a>Login</a></router-link
      >
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { auth } from '../firebaseConfig'

export default {
    data() {
    return {
      isLogged: false,
      currentUser: false
    }
  },

  name: 'appHeader',

  created() {
    if (auth.currentUser) {
      this.isLogged = true
      this.currentUser = auth.currentUser.email
      // console.log(auth.currentUser)
    }
  },

  methods: {
    // ...mapMutations[('setUser')],

    logoutUser () {
      auth.signOut().then(() => {
        localStorage.removeItem('user')
        // this.$store.commit('setUser', null)
        if (this.$router.currentRoute.name === 'list') {
          this.$router.replace({
            name: 'home'
          })
        }
      }).catch(err => {
            console.log(err.message)
        })
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
