<template lang="pug">
div#app
  nav-bar
  div.container-fluid
    div.row
      div.col-xs-1
      div.col-xs-10
        router-view
  my-footer
</template>

<script>
import NavBar from './components/NavBar'
import MyFooter from './components/MyFooter'
export default {
  name: 'app',
  components: {
    NavBar, MyFooter
  }
}
</script>

<style>
</style>
