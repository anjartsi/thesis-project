<template lang="pug">
  div.container-fluid
    div#tray
      IS-row(
        v-for='(row, index) in rows'
        :rowData='row'
        :key='index'
        )
</template>

<script>
import Vuex from 'vuex';
import ISRow from './IS-Row';

export default {
  components: { ISRow },

  data() {
    return {};
  },
  computed: {
    ...Vuex.mapState([
      'problemSize',
      'intervals',
    ]),
    rows() {
      const arr = this.intervals;
      return this.placeIntervals(arr);
    },
  },
  methods: {
    ...Vuex.mapGetters([
      'getCollision',
    ]),
    fitsInRow(interval, row) {
      let conflict = false;
      for (let i = 0; i < row.length; i++) {
        conflict = conflict || this.getCollision(interval, row[i]);
      }
      return !conflict;
    },
    placeIntervals(arr) {
      const rows = [[]];
      let interval;
      let rowNum = 0;
      for (let i = 0; i < arr.length; i++) {
        interval = arr[i];
        if (this.fitsInRow(interval, rows[rowNum])) {
          rows[rowNum].push(i);
        } else {
          rowNum++;
          i--;
          if (rowNum >= rows.length) {
            rows.push([]);
          }
        }
      }
      return rows;
    },
  }, // end methods
};
</script>

<style scoped>
div#tray {
  border: 1px solid black;
}
</style>
