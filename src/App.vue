<template lang="pug">
div#app
  my-navbar
  router-view
  my-footer
</template>

<script>
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';

export default {
  name: 'app',
  components: {
    MyNavbar, MyFooter,
  },
};
</script>

<style>
  #app {
    width: 95%;
    margin: auto;
  }

  body {
    padding-top: 100px;
  }
  
  .cant-highlight-text {
    user-select: none;
  }
  /* Global transition  */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
