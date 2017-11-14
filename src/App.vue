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

<style scoped>
.pageBorder {
}
</style>
