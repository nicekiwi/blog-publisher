<template>
  <div class="trash-confirm">
    <i class="confirmed-icon fa fa-circle-o-notch fa-spin fa-fw" v-if="isConfirmed"></i>
    <a @click.prevent="clickedOn" v-else>
      <i class="trash-confirm-icon trash-icon fa fa-trash" aria-hidden="true" v-if="isClicked"></i>
      <i class="trash-icon fa fa-trash-o" aria-hidden="true" v-else></i>
    </a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isClicked: false,
        isConfirmed: false
      }
    },
    props: [ 'trashName', 'trashData' ],
    methods: {
      clickedOn() {
        if(this.isClicked) {
          this.isConfirmed = true;
          Event.$emit(this.trashName, this.trashData);
        }

        this.isClicked = true;
        setTimeout(() => this.isClicked = false, 5000);
      }
    }
  }
</script>

<style lang="scss">

  .trash-confirm {
    width: 30px;
    position: relative;
    text-align: center;
    font-size: 16px;
    line-height: 1.1;

    a {
      position: relative;
      display: inline-block;
    }

    .trash-confirm-icon {
      color: red;
    }
  }
</style>