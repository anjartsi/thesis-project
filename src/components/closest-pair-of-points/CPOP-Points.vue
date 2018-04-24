<template lang="pug">
div#pointsCont
  h3.text-center Points 
    br
    | ({{myPoints.length}} total)
  div(
    v-if='editing'
  )
    nice-button.btn-danger(
      @click='vueDeleteAllPoints'
    ) Delete All
  h4.text-center(
    v-else
    :style='{"background-color": stateColors.closest}'
    ) Min Distance:
      br 
      | {{shortest}}
  div.scrollable
    table.table.table-striped.table-hover
      tbody
        tr(
          v-for='(point, index) in myPoints'
          :key='index'
          @mouseenter='vueHighlightPoint(index)'
          @mouseleave='vueUnhighlightPoint(index)'
          )
          //- todo - refactor this as a list
          td(:style='xyStyle(index)') 
            span.pull-left ({{point.x.toFixed(1)}} , {{point.y.toFixed(1)}})
            span.danger.pull-right(@click='deletePoint({ index })' v-if='editing')
              i.fa.fa-times.text-danger
            span(v-else)
      
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
      if (index === undefined) return null;
      let col = this.colors[index]
      if (col === 'black') col = 'white';
      return {
        'background-color': col,
      };
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
table {
  font-size: 14px;
}
tr {
  width: 100%;
}
td, th {
  text-overflow: clip;
}
td.danger {
  cursor: pointer;
}
td.border-right {
  border-right: 1px solid lightgray;
}

</style>

