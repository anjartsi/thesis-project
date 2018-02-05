<template lang="pug">
  div
    div#tray(:style='{ "padding-left": unit+"px" }')
      div.tickContainer(:style='{ width: rowWidth}')
        div.tickmark(v-for='i in ticks + 1') {{i - 1}}
      transition-group(name='rows-slide' tag='div')
        IS-row(
          class='rows-slide-item'
          v-for='(row, index) in rows'
          :rowIndex='index'
          :rowData='row'
          :key='"row"+index'
          :unit='unit'
          )
      div.tickContainer(:style='{ width: rowWidth}')
        div.tickmark(v-for='i in ticks + 1') {{i - 1}}
</template>

<script>
import Vuex from 'vuex';
import ISRow from './IS-Row';

export default {
  components: { ISRow },

  data() {
    return {
      // The size of the smallest interval
      unit: 60,
    };
  },
  computed: {
    ...Vuex.mapState([
      'problemSize',
      'intervals',
      'rows',
      'min',
      'max',
    ]),
    ticks() {
      return this.max - this.min;
    },
    rowWidth() {
      // The +1 is for the zero tick mark (or for the last tick mark, you decide)
      return `${this.unit * (1 + this.max - this.min)}px`;
    },
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
div.tickContainer {
  padding-top: 10px;
  padding-bottom: 10px;
  overflow-x:hidden;
}
div.tickmark {
  display:inline-block;
  width: 60px;
  border-left: 1px dashed black;
}

/* .rows-slide-item, .rows-slide-move {
  display: inline-block;
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: linear;
  transition-delay: 0ms;
}
.rows-slide-enter {
  transform: translateX(-100%);
}
.rows-slide-leave-to {
  transform: translateX(100%);
}
.rows-slide-leave-active {
  position: absolute;
}
.rows-slide-move {

} */
</style>
