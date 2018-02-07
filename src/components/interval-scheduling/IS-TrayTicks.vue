<template lang='pug'>
  div.tickContainer(:style='{ width: rowWidth}')
        div.tickmark(v-for='i in ticks + 1'  :style='{ width: unit+"px" }') {{i - 1}}
</template>

<script>
import Vuex from 'vuex';

export default {
  props: [
    'unit',
  ],
  computed: {
    ...Vuex.mapState([
      'latestTime',
      'earliestTime',
    ]),
    ticks() {
      return this.latestTime - this.earliestTime;
    },
    rowWidth() {
      // The +1 is for the zero tick mark (or for the last tick mark, you decide)
      return `${this.unit * (1 + this.latestTime - this.earliestTime)}px`;
    },
  },
};
</script>

<style scoped>
div.tickContainer {
  padding-top: 10px;
  padding-bottom: 10px;
}
div.tickmark {
  display:inline-block;
  border-left: 1px dashed black;
}

</style>
