<template>
  <nav class="flex" id="nav">
    <ul class="links flex">
      <li class="logo">My Games</li>
      <router-link :to="{ name: 'home' }" tag="li" active-class="active" exact
        ><a>Home</a></router-link
      >
      <router-link
        v-if="loggedIn"
        :to="{ name: 'list' }"
        tag="li"
        active-class="active"
        ><a>My List</a></router-link
      >
    </ul>
    <ul class="userLinks flex">
      <li v-if="loggedIn" class="emailDisplay">
        <font-awesome-icon :icon="['fa', 'user']" class="userIcon">
        </font-awesome-icon>
        {{ currentUser }}
      </li>
      <li v-if="loggedIn">
        <button class="logBtn" @click.prevent="logoutUser">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="userIcon">
          </font-awesome-icon>
          Logout
        </button>
      </li>
      <router-link
        v-if="!loggedIn"
        :to="{ name: 'login' }"
        tag="li"
        class="logBtn loginBtn fullWidth"
      >
        <a>
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="userIcon">
          </font-awesome-icon>
          Login
        </a>
      </router-link>
    </ul>
  </nav>
</template>

<script>
import { auth } from '../firebaseConfig'

export default {
  data () {
    return {
      loggedIn: false,
      currentUser: false
    }
  },

  name: 'appHeader',

  created () {
    if (auth.currentUser) {
      this.loggedIn = true
      this.currentUser = auth.currentUser.email
    }
  },

  methods: {
    logoutUser () {
      auth
        .signOut()
        .then(() => {
          if (this.$router.currentRoute.name === 'list') {
            this.$router.replace({
              name: 'home'
            })
          }
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
nav {
  @include alignment($direction: column);

  .logo {
    font-family: "Monoton", Arial, cursive;
    display: block;
    position: absolute;
    left: 0;
    @include fonts($size: 1.1rem);
    padding: 0.5rem;
    align-self: center;
    background-image: -webkit-linear-gradient(
      left,
      #996a6e 62.5%,
      white 25%,
      #fde071 37.5%,
      #ef9671,

      white 75%
    );
    background-image: linear-gradient(
      160deg,
      white 25%,
      #fde071 37.5%,
      #ef9671,
      #996a6e 62.5%,
      white 75%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: rgb(62, 134, 134);
    -webkit-text-fill-color: rgba(117, 62, 134, 0.466);
    // text-fill-color: transparent;
  }
  ul {
    li {
      padding: 0.7rem;
      @include fonts($size: 0.8rem);
    }

    .logBtn {
      background-color: transparent;
      @include fonts($color: lighten($turquoise, 15%));
    }

    .loginBtn {
      text-align: right;
    }
  }

  .links {
    background: linear-gradient(90deg, rgba(70, 68, 68, 0) 0%, rgba(255, 255, 255, 0.048) 25%, rgba(255, 255, 255, 0.068) 75%, rgba(255, 255, 255, 0) 100%);
    @include alignment($justify: flex-end);
    box-shadow: 0 8px 16px 0 rgba(146, 172, 174, 0.2), 0 6px 20px 0 rgba(9, 151, 174, 0.46);
  }
}

.userLinks {
  @include alignment($justify: space-between, $align: center);
  @include fonts($size: 1rem, $color: lighten($turquoise, 15%));

  .userIcon {
    @include fonts($color: lighten($turquoise, 15%));
    display: inline-block;
    margin-right: 0.2rem;
  }
}

.active {
   border-bottom: 2px inset $turquoise;
   transition: ease-in-out;
}

@media (min-width: 400px) {
  nav {
    ul li,
    button,
    .logo {
      @include fonts($size: 108%);
    }
  }
}

@media (min-width: 776px) {
  nav {
    .logo {
      @include fonts($size: 1.5rem);
    }
  }
}
</style>
