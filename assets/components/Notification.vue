<template lang="pug">
  .notification(:class="type", v-if="!hidden")
    button.delete(@click="reset()")
    .content {{ content }}
</template>

<script>
  export default {
    data() {
      return {
        hidden: true,
        type: null,
        content: null,
        timeoutFunc: null,
        timeout: null
      }
    },
    mounted() {
      Event.$on('notification', payload => {
        this.type = payload.type
        this.content = payload.content
        this.timeout = payload.timeout || 5000
        this.hidden = false

        // Reset Timeout
        clearTimeout(this.timeoutFunc)

        // Start New Timeout
        this.timeoutFunc = setTimeout(this.reset, this.timeout)
      })
    },
    methods: {
      reset() {
        this.type = null
        this.content = null
        this.hidden = true
        clearTimeout(this.timeoutFunc)
      }
    }
  }
</script>

<style lang="stylus">

  .notification {
    position: absolute;
    top: 67px;
    right: 15px;
    z-index: 10
  }

</style>
