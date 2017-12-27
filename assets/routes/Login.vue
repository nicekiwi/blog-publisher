<template lang="pug">
  section
    section.hero.is-warning
      .hero-body
        .container
          h1.title
            | Halt!
          h2.subtitle
            | Authentication required.
    section.section
      .container
        form.login-form(role='form', @submit.prevent='onSubmit')
          .columns
            .column.is-one-third
              .field
                label.label Username
                p.control
                  input.input(type='text', placeholder='Tom Hanks', required='required', v-model='username')
            .column.is-one-third
              .field
                label.label Password
                p.control
                  input.input(type='password', required='required', v-model='password', placeholder='********')
          .columns
            .column
              .field
                p.control
                  label.checkbox
                    input(type='checkbox', v-model='rememberMe')
                    | &nbsp;Remember me
          .columns
            .column
              .field.is-grouped
                p.control
                  button.button.is-dark.is-loading(disabled='', v-if='isWorking') Submit
                  button.button.is-dark(v-else='') Submit
</template>

<script>

  export default {
    
    data() {
      return {
        isWorking: false,
        username: 'admin',
        password: 'secret',
        rememberMe: false
      }
    },
    mounted() {

    },

    methods: {

      resetForm() {
        this.username = '';
        this.password = '';
        this.rememberMe = false;
      },

      onAuthenticated(response) {

        let fromPath = this.$store.state.route.query.path;
        this.$store.commit('login', response.data);
        this.$router.replace(fromPath ? fromPath: '/')

        Event.$emit('notification', {
          type: 'is-success',
          content: 'Authentication Successful.'
        })

        this.resetForm()
        this.isWorking = false
      },

      onSubmit() {

        this.isWorking = true

        // todo add timeout to this request
        axios.post('/login', {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe
        }).then(this.onAuthenticated)
          .catch(err => {
            Event.$emit('notification', {
              type: 'is-danger',
              content: err.response.data.message
            })

            this.isWorking = false
          })
      }
    }
  }
</script>

<style lang="stylus">

</style>