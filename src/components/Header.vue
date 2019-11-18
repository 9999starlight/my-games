<template>
  <nav class="flex">
    <ul class ="links flex">
      <router-link :to="{ name: 'home' }" tag="li" active-class="active" exact
        ><a>Search</a></router-link
      >
      <router-link :to="{ name: 'myList' }" tag="li" active-class="active"
        ><a>My List</a></router-link
      >
      <!-- <li>User Email</li>
      <router-link to="/login" tag="li" active-class="active"
        ><a>Login</a></router-link
      >
      <router-link to="/signup" tag="li" active-class="active"
        ><a>Sign Up</a></router-link
      >
      <router-link to="/" tag="li">Logout</router-link> -->
      <!--za sada sam stavila da kada se logout ide na home-->
    </ul>
    <ul class = "userLinks flex">
      <!-- <router-link to="/login" tag="li" active-class="active"
        ><a>Login</a></router-link
      >
      <router-link to="/signup" tag="li" active-class="active"
        ><a>Sign Up</a></router-link
      > -->
      <li>User Email</li>
      <li><button class="btn logBtn">Login</button></li>
      <!-- <router-link to="/" tag="li">Logout</router-link> -->
      <li><button class="btn logBtn">Logout</button></li>
      </ul>
  </nav>
</template>

<script>
export default {
  name: 'appHeader'
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
  @include alignment($justify: space-between)
}

.active {
  background: $turquoiseGradient;
  opacity: 0.9;
}
</style>
