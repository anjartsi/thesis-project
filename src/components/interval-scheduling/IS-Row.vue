<template lang="pug">
  transition
    div.trayRow
      div
        IS-interval(
          v-for='(interval, index) in rowData'
          :key='index'
          :index='interval'
        ) 
</template>

<script>
import Vuex from 'vuex';
import ISInterval from './IS-Interval';

export default {
  components: {
    ISInterval,
  },
  props: [
    'rowIndex',
  ],
  computed: {
    ...Vuex.mapState([
      'rows',
    ]),
    rowData() {
      return this.rows[this.rowIndex];
    },
  },
  data() { return {}; },
  methods: {
  },
};
</script>

<style scoped>
.trayRow {
  position: relative;
  height: 50px;;
}
.trayRow > div {
  position: relative;
}
.trayRow:nth-child(even){
  background-color: lightgray;
}
.trayRow:nth-child(odd){
background-color: rgba(211, 211, 211, 0.3);
}

.v-enter-active, .v-leave-active {
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: ease;
  transition-delay: 0ms;
}
.v-enter {
  transform: translateX(-100%);
}
.v-leave-to {
  transform: translateX(100%);
}
</style>
