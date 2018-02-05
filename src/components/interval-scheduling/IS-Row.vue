<template lang="pug">
  div.trayRow(:style='{ width: rowWidth }')
    div
      transition-group(name='interval-list' tag='div' out-in)
        IS-interval(
          v-for='(interval, index) in rowData'
          :key='index + "interval"'
          :index='interval'
          :unit='unit'
          class='interval-list-item'
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
    'rowIndex', 'unit',
  ],
  computed: {
    ...Vuex.mapState([
      'rows',
      'max',
      'min',
    ]),
    rowData() {
      return this.rows[this.rowIndex];
    },
    rowWidth() {
      return `${this.unit * (this.max - this.min)}px`;
    },
  },
  data() { return {}; },
  methods: {
  },
};
</script>

<style>
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

/* 
.interval-list-enter-active, .interval-list-leave-active {
  transition-property: all;
  transition-duration: 250ms;
  transition-timing-function: ease;
  transition-delay: 0ms;
}
.interval-list-enter {
  opacity: 0;
  transform: translateY(-50%);
}
.interval-list-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateY(50%);
}
.interval-list-move {
  transition-duration: 250ms;
} */
</style>
