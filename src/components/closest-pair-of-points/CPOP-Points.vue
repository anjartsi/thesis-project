<template lang="pug">
div#pointsCont
  h2 Points ({{myPoints.length}} total)
  div(
    v-if='editing'
  )
    nice-button.btn-danger(
      @click='vueDeleteAllPoints'
    ) Delete All Points
  h3(
    v-else
    :style='{"background-color": stateColors.closest}'
    ) Shortest Distance: {{shortest}}
  div.scrollable
    table.text-center.table.table-striped.table-hover
      thead
        tr
          th.border-right Index
          th x
          th y
          th(v-if='editing') Delete
          th(v-else)
      tbody
        tr(
          v-for='(point, index) in myPoints'
          :key='index'
          @mouseenter='vueHighlightPoint(index)'
          @mouseleave='vueUnhighlightPoint(index)'
          )
          td.border-right(:style='{"background-color": indexColumnColor(index)}') {{index}}
          td(:style='xyStyle(index)') {{point.x.toFixed(2)}}
          td(:style='xyStyle(index)') {{point.y.toFixed(2)}}
          td.danger(@click='deletePoint({ index })' v-if='editing')
            span.fa.fa-times.text-danger
          td(v-else)
      
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceButton from '../nice-things/Nice-Button';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    NiceButton,
  },
  data() {
    return {
      oldColor: '',
    };
  },
  computed: {
    ...mapState([
      'points',
      'problemSize',
      'problemTree',
      'solver',
    ]),
    ...mapGetters([
      'editing',
    ]),
    stateColors() {
      return this.$store.state.closestPairOfPoints.colors;
    },
    canvasNum() {
      return this.solver.canvasNum;
    },
    myPoints() {
      if (this.canvasNum === 0 || this.canvasNum === null) return this.points;
      return this.problemTree[this.canvasNum].problem.points;
    },
    colors() {
      return this.problemTree[this.canvasNum].colors;
    },
    closestA() {
      if (!this.problemTree[this.canvasNum].problem) return null;
      return this.problemTree[this.canvasNum].problem.closestA;
    },
    closestB() {
      if (!this.problemTree[this.canvasNum].problem) return null;
      return this.problemTree[this.canvasNum].problem.closestB;
    },
    shortest() {
      if (!this.problemTree[this.canvasNum].problem) return '';
      const { shortest } = this.problemTree[this.canvasNum].problem;
      return shortest.toFixed(2) || '?';
    },
  },
  methods: {
    ...mapActions([
      'deletePoint',
      'changePointColor',
    ]),
    indexColumnColor(index) {
      const col = this.colors[index];
      if (col === 'black') return null;
      return col;
    },
    xyStyle(index) {
      if ((index === this.closestA || index === this.closestB) && index !== null) {
        return {
          'background-color': '#AAFFAA',
        };
      }
      return null;
    },
    vueHighlightPoint(index) {
      // remember the color it previously was
      this.oldColor = this.colors[index];
      const newColor = 'red';
      this.changePointColor({
        index,
        oldColor: this.oldColor,
        newColor,
        canvasNum: this.canvasNum,
      });
    },
    vueUnhighlightPoint(index) {
      const oldColor = 'red';
      const newColor = this.oldColor;
      this.changePointColor({
        index,
        oldColor,
        newColor,
        canvasNum: this.canvasNum,
      });
    },
    vueDeleteAllPoints() {
      const l = this.points.length;
      for (let i = 0; i < l; i++) {
        this.deletePoint({ index: 0 });
      }
    },
  },
};
</script>

<style scoped>
#pointsCont {
  background-color: #fff;
  min-height: max-content;
}
ul{
  list-style-type: none;
}
div {
  max-height: 500px;
}
table {
  font-size: 16px;
}
.scrollable {
  height: 500px;
  overflow-y: scroll;
}
tr {
  width: 100%;
}
td, th {
  width: 25%;
  text-align: center;
}
td.danger {
  cursor: pointer;
}
td.border-right {
  border-right: 1px solid lightgray;
}

</style>

