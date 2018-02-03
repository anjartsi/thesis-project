<template lang="pug">
  div
    div#tray
      IS-row(
        v-for='(row, index) in rows'
        :rowIndex='index'
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
      'rows',
    ]),
  },
  methods: {
    ...Vuex.mapGetters([
      'getCollision',
    ]),
  }, // end methods
};
</script>

<style scoped>
div#tray {
  border: 1px solid black;
  user-select: none;
  overflow-x: auto;
  width: 100%;
}
</style>
