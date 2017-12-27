<template lang="pug">
  section.section
    .container
      form.login-form(role='form', @submit.prevent='onSubmit()')
        .columns
          .column
            .field
              label.label Title
                .control
                  input.input(v-model='title', type='text', placeholder='This thing happend..')
          .column
            .field
              label.label Date
                .control
                  input.input(v-model='dateString', type='text', placeholder='DD-MM-YYYY HH:MM')
        .field
          label.label Content
            .control
              textarea.textarea(v-model='content', placeholder='This one time at band camp, a bear came..')
        .field
          .control
            label.checkbox
              input(type='checkbox') 
              | &nbsp;Publish Now
        .field
          .control
            button.button.is-link(type="submit", v-text="isCreate?'Create Post':'Update Post'")
</template>

<script>

  import moment from 'moment'

  export default {
    data() {
      return {
        title: '',
        content: '',
        dateString: '',
        date: null
      }
    },
    mounted() {
      this.fetchPost()
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      isCreate() {
        return this.id === 'create'
      }
    },
    methods: {
      fetchPost() {
        axios.get(`/post/${this.id}`)
          .then(res => this.post = res.data)
          .catch(res => {
            Event.$emit('notification', {
              type: 'is-danger',
              content: 'Unable to locate requested post.'
            })
            this.$route.push('/posts')
          })
      },
      validatePost() {

        const datetime = moment(this.post.dateString, 'DD-MM-YYYY HH:mm', true)

        if(!datetime.isValid()) return false
        if(this.post.title.length < 5) return false
        if(this.post.content.length < 5) return false

        this.post.date = datetime.toISOString()
        return true
      },
      onSubmit() {
        if(!this.validatePost()) return

        const url = this.isCreate ? `/post/create`: `/post/${this.id}/update`

        axios.post(url, this.post).then(res => {
          if(res.success === true) {
            Event.$emit('notification', {
              type: 'is-success',
              content: res.response
            })
            this.$route.push('/posts')
          } else {
            Event.$emit('notification', {
              type: 'is-danger',
              content: res.response
            })
          }
        })
      }
    }
  }
</script>
