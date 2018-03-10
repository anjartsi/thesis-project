<template lang="pug">
div
  h2 Points ({{problemSize.current}} total)
  h3 Shortest Distance: {{shortest}}
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
          td(:style='xyStyle(index)') {{point.x}}
          td(:style='xyStyle(index)') {{point.y}}
          td.danger(@click='deletePoint({ index })' v-if='editing')
            span.fa.fa-times.text-danger
          td(v-else)
      
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
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
      const oldColor = 'black';
      const newColor = 'red';
      this.changePointColor({
        index,
        oldColor,
        newColor,
        canvasNum: this.canvasNum,
      });
    },
    vueUnhighlightPoint(index) {
      const oldColor = 'red';
      const newColor = 'black';
      this.changePointColor({
        index,
        oldColor,
        newColor,
        canvasNum: this.canvasNum,
      });
    },
  },
};
</script>

<style scoped>
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

