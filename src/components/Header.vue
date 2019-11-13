<template>
  <nav>
    <ul>
      <router-link :to="{ name: 'home' }" tag="li" active-class="active" exact
        ><a>Search</a></router-link
      >
      <router-link :to="{ name: 'myList' }" tag="li" active-class="active"
        ><a>My List</a></router-link
      >
      <li>User Email</li>
      <router-link to="/login" tag="li" active-class="active"
        ><a>Login</a></router-link
      >
      <router-link to="/signup" tag="li" active-class="active"
        ><a>Sign Up</a></router-link
      >
      <router-link to="/" tag="li">Logout</router-link>
      <!--za sada sam stavila da kada se logout ide na home-->
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'appHeader'
}
</script>
<style lang="scss" scoped>
.active {
  background-color: red;
}
</style>
