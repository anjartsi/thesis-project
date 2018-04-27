<template lang="pug">
div#app
  my-navbar
  router-view
  my-footer
</template>

<script>
import store from './store/index';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';

export default {
  name: 'app',
  store,
  components: {
    MyNavbar, MyFooter,
  },
};
</script>

<style>
#app {
  background-color: #f4f4f4;
  margin: 0px auto;
  max-width: 1024px;
}

  body {
    padding-top: 100px;
    /* background-color: #101010; */
  }
  
  .cant-highlight-text {
    user-select: none;
  }
  /* Global transition  */
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-100%);
  }
</style>
