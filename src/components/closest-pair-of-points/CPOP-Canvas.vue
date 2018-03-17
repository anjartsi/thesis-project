<template lang="pug">
div.parent
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
  hr
  div.children
    div.leftChild
      CPOP-canvas(
        v-if='leftChildExists'
        :canvasNum='getLeftChildCanvasNum(canvasNum)'
        :parentCanvasNum='canvasNum'
      )
    div.rightChild
      CPOP-canvas(
        v-if='rightChildExists'
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
      return this.myPoints[this.problem.size - 1].x - this.myPoints[0].x + 4 * this.pointRadius;
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
    leftChildExists() {
      const childCanvasNum = this.getLeftChildCanvasNum(this.canvasNum);
      return this.problemTree[childCanvasNum] !== undefined;
    },
    rightChildExists() {
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
    clearCanvas() {
      // erase the canvas
      const a = this.valueRange.max - this.valueRange.min + 20 * this.pointRadius;
      const b = this.valueRange.max - this.valueRange.min + 20 * this.pointRadius;
      this.provider.context.clearRect(-10 * this.pointRadius, -10 * this.pointRadius, a, b);
      
    },
    redrawFrame() {
      this.clearCanvas();
      // all your children redraw themselves
      this.$children.forEach(child => {
        if (typeof child.draw === 'function') child.draw();
      });
    },
  },
  watch: {
    allPoints(newVal) {
      // If all the points get deleted, the last point remains drawn
      // So we need to call the clearCanvas method in this case
      if(newVal.length === 0) {
        this.clearCanvas();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let leftEdge = 2 * this.pointRadius - this.myPoints[0].x;
      if (this.canvasNum === 0) leftEdge = 0;
      this.ctx = this.$refs['the-canvas'].getContext('2d');
      // translate down so that y = 0 is at the bottom not the top
      this.ctx.translate(0, this.canvasHeight - 2 * this.pointRadius);
      // translate left by the leftmost x so that the origin is left of the canvas.
      // This way, the leftmost point will be drawn at the left edge of the canvas.
      this.ctx.translate(leftEdge + 2 * this.pointRadius, 0);
      // make the y-axis upside down so that positive y-values go up
      this.ctx.scale(1, -1);
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
  background-color: lightcyan;
} 
div.leftChild, div.rightChild {
  display: inline-block;
  vertical-align: top;
}
div.parent {
  display: inline-block;
  /* text-align: center; */
  /* overflow: visible; */
}
</style>
