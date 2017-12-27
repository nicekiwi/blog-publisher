<template lang="pug">
  section.section
    .container
      h1.title Dashboard
      div
        router-link.button.is-link(:to="'posts/create'") Create Post
</template>

<script>
  export default {

  }
</script>