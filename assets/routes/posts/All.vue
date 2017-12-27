<template lang="pug">
  section.section
    .container
      h1.title Posts

      div.columns
        div.column
          .tabs
            ul
              li.is-active
                a All&nbsp;
                  span.tag.is-rounded(v-html="posts.length")
              li
                a Published&nbsp;
                  span.tag.is-rounded 12
              li
                a Drafts&nbsp;
                  span.tag.is-rounded 1
              li
                a Trash&nbsp;
                  span.tag.is-rounded 2

      div.columns
        div.column
          ul
            li(v-for="post in posts").card
              .card-content
                .content
                  router-link(:to="'posts/' + post.id") {{ post.title }}
                  br
                  time(datetime='2016-1-1') 11:09 PM - 1 Jan 2016
</template>

<script>

  import moment from 'moment'
  
  export default {
    data() {
      return {
        posts: []
      }
    },
    mounted() {
      this.fetchPosts()
    },
    methods: {
      fetchPosts() {

        axios.get('/posts').then(response => {
          this.posts = response.data
        })

      }
    }
  }
</script>
