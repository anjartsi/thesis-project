<template lang="pug">
  div
    IS-interval(
      v-for='(interval, index) in rowData'
      :key='index'
      :index='interval'
    ) 
</template>

<script>
// import Vuex from 'vuex';
import ISInterval from './IS-Interval';

export default {
  components: {
    ISInterval,
  },
  props: [
    'rowData',
  ],
  data() { return {}; },
  methods: {
  },
};
</script>

<style scoped>

</style>
