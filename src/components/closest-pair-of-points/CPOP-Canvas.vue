<template lang="pug">
div
  hr
  div.canvasCont
    canvas(
      ref='the-canvas' 
      :class='{highlightable: solving && !selected, selected: selected}'
      @click='selectMe'
    )
      CPOP-canvas-point(
        v-for='(point, index) in myPoints'
        :key='index'
        :index='index'
        :point='point'
        :canvasNum='canvasNum'
        @drawEvent='redrawFrame'
        )  
    div.children
      div.leftChild
        CPOP-canvas(
          v-if='leftChild'
          :canvasNum='getLeftChildCanvasNum(canvasNum)'
          :parentCanvasNum='canvasNum'
        )
      div.rightChild
        CPOP-canvas(
          v-if='rightChild'
          :canvasNum='getRightChildCanvasNum(canvasNum)'
          :parentCanvasNum='canvasNum'
        )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceCanvas from '../nice-things/Nice-canvas';
import CPOPCanvasController from './CPOP-CanvasController';
import CPOPCanvasPoint from './CPOP-CanvasPoint';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  mixins: [NiceCanvas],
  name: 'CPOP-canvas',
  components: {
    CPOPCanvasController,
    CPOPCanvasPoint,
  },
  props: [
    'canvasNum',
    'parentCanvasNum',
  ],
  computed: {
    ...mapState([
      'pointRadius',
      'valueRange',
      'solver',
      'problemTree',
    ]),
    ...mapGetters([
      'solving',
      'getLeftChildCanvasNum',
      'getRightChildCanvasNum',
    ]),
    canvasHeight() {
      return this.valueRange.max - this.valueRange.min + 4 * this.pointRadius;
    },
    canvasWidth() {
      if (this.canvasNum === 0) {
        // The root problem has the whole range as its width
        return this.valueRange.max - this.valueRange.min + 4 * this.pointRadius;
      }
      return this.myPoints[this.problem.size - 1].x - this.myPoints[0].x + 2 * this.pointRadius;
    },
    problem() {
      return this.problemTree[this.canvasNum].problem;
    },
    allPoints() {
      return this.$store.state.closestPairOfPoints.points;
    },
    myPoints() {
      if (this.canvasNum === 0) {
        return this.allPoints;
      }
      return this.problem.points;
    },
    selected() { return this.canvasNum === this.solver.canvasNum; },
    leftChild() {
      const childCanvasNum = this.getLeftChildCanvasNum(this.canvasNum);
      return this.problemTree[childCanvasNum] !== undefined;
    },
    rightChild() {
      const childCanvasNum = this.getRightChildCanvasNum(this.canvasNum);
      return this.problemTree[childCanvasNum] !== undefined;
    },
  },
  data() {
    return {
      ctx: null,
    };
  },
  methods: {
    ...mapActions([
      'selectCanvas',
    ]),
    selectMe() {
      if (this.solving) this.selectCanvas({ canvasNum: this.canvasNum });
    },
    redrawFrame() {
      // erase the canvas
      // eslint-disable-next-line
      const a = this.canvasWidth + 4 * this.pointRadius;
      const b = this.canvasHeight + 4 * this.pointRadius;
      this.provider.context.clearRect(-2 * this.pointRadius, -2 * this.pointRadius, a, b);
      // all your children redraw themselves
      this.$children.forEach(child => {
        if (typeof child.draw === 'function') child.draw();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.ctx = this.$refs['the-canvas'].getContext('2d');
      // translate down so that y = 0 is at the bottom not the top
      this.ctx.translate(0, this.canvasHeight - 2 * this.pointRadius);
      // make the y-axis upside down so that positive y-values go up
      this.ctx.scale(1, -1);
      // translate left so that the leftmost point in myPoints starts from the left
      this.ctx.translate(2 * this.pointRadius - this.myPoints[0].x, 0);
      this.redrawFrame();
    });
  },
};
</script>


<style scoped>
canvas {
  outline: 1px solid black;
  background-color: gray;
}
canvas.highlightable:hover {
  cursor: pointer;
  background-color: lightgray;
}
canvas.selected {
  background-color: lightyellow;
} 
div.leftChild, div.rightChild {
  display: inline-block;
  vertical-align: top;
}
div.canvasCont {
  text-align: center;
  overflow: visible;
}
</style>
