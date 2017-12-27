import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    appLoaded: false,
    auth: {
      tokenExpires: null,
      isLoggedIn: false,
      user: null
    }
  },
  mutations: {

    updateAppLoaded(state, bool) {
      state.appLoaded = bool
    },

    updateTokenExpires(state, expires) {
      state.auth.tokenExpires = expires
    },

    // Mark user as logged in
    login (state, data) {
      state.auth.user = data.user
      state.auth.tokenExpires = data.tokenExpires
      state.auth.isLoggedIn = true
    },

    // Mark user as logged out
    logout (state) {
      state.auth.user = null
      state.auth.tokenExpires = null
      state.auth.isLoggedIn = false
    }
  }
});

export default store;