<template lang="pug">
  div 
    primary-nav
    notification
    router-view
</template>

<script>

  import { mapState } from 'vuex'
  import PrimaryNav from '../components/PrimaryNav.vue'
  import Notification from '../components/Notification.vue'

  export default {

    components: { PrimaryNav, Notification },

    data() {
      return {
        loaded: false
      }
    },

    mounted() {
      this.refreshAuth();
    },

    computed: mapState({
      tokenExpires: state => state.auth.tokenExpires,
      isLoggedIn: state => state.auth.isLoggedIn
    }),

    methods: {
      refreshAuth() {
        if(this.isLoggedIn) {
          let now = new Date().getTime();
          let check = this.tokenExpires - 60000;
          if(now >= check) {
            axios.post('/token-refresh').then(response => {
              this.$store.commit('updateTokenExpires', response.data.tokenExpires);
            }).catch(err => {
              this.$router.push('/logout')
            });
          }
        }
        setTimeout(this.refreshAuth, 15000);
      }
    }
  }

</script>

<style lang="stylus">

</style>
