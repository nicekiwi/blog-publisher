<template lang="pug">
  nav.navbar.is-dark
    .container
      .navbar-brand
        router-link(class="navbar-item" to="/" exact)
          b nice.kiwi
        .navbar-burger.burger(data-target='navbar')
          span
          span
          span
      #navbar.navbar-menu
        .navbar-start
          template(v-if="isLoggedIn")
            router-link(class="navbar-item" to="/posts") Posts
            router-link(class="navbar-item" to="/tags") Tags
        .navbar-end
          router-link(v-if="isLoggedIn" class="navbar-item" to="/logout") Logout
          router-link(v-else class="navbar-item" to="/login") Login
</template>

<script>

  import { mapState } from 'vuex'

  export default {

    computed: mapState({
      isLoggedIn: state => state.auth.isLoggedIn,
      user: state => state.auth.user
    }),

  }

</script>