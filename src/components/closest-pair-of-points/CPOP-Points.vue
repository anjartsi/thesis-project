<template lang="pug">
div
  h2 Points
  ul
    li(v-for='(point, index) in points') 
      | ({{point.x}}, {{point.y}}) 
      button.btn.btn-danger(@click='removeMe(index)') X
</template>

<script>
import Vuex from 'vuex';

export default {
  computed: {
    ...Vuex.mapState([
      'points',
    ]),
  },
  methods: {
    removeMe(index) {
      this.$store.dispatch('deletePoint', { index });
    },
  },
};
</script>

<style scoped>
ul{
  list-style-type: none;
}
</style>

