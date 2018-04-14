<template lang="pug">
  div#solver
    h1 Solver
    h4
    nice-Button.btn-primary(
      @click='divide'
      :class='{disabled:finished || divided || pointsInSubproblem <= 3}'
    ) Divide
    nice-Button.btn-success(
      @click='divideLevel'
    ) Divide Entire Level
    hr
    nice-Button.btn-primary(
      @click='bruteForceOne'
      :class='{disabled:finished || divided}'
    ) Brute Force (one step)
    nice-Button.btn-warning(
      @click='bruteForceAuto'
      :class='{disabled:finished || divided}'
    ) Brute Force (auto)
    nice-Button.btn-success(
      @click='bruteForceLevel'
    ) Brute Force Entire Level
    hr
    nice-Button.btn-primary(
      @click='conquerOne'
      :class='{disabled: !readyToConquer}'
    ) Conquer (one step)
    nice-Button.btn-warning(
      @click='conquerAuto'
      :class='{disabled: !readyToConquer}'
    ) Conquer (auto)
    nice-Button.btn-success(
      @click='conquerLevel'
    ) Conquer Entire Level
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceButton from '../nice-things/Nice-Button';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');
export default {
  components: {
    NiceButton,
  },
  computed: {
    ...mapState([
      'messages',
      'problemTree',
      'solver',
    ]),
    canvasNum() {
      return this.solver.canvasNum;
    },
    selectedTreeNode() {
      return this.problemTree[this.canvasNum];
    },
    pointsInSubproblem() {
      return this.selectedTreeNode.problem.size;
    },
    divided() {
      return this.selectedTreeNode.divided;
    },
    finished() {
      return this.selectedTreeNode.finished;
    },
    readyToConquer() {
      // can't be conquered if it hasn't been divided
      if (!this.divided) return false;
      const leftChild = this.problemTree[this.getLeftChildCanvasNum()(this.canvasNum)];
      const rightChild = this.problemTree[this.getRightChildCanvasNum()(this.canvasNum)];
      // can only be conquered if both subproblems have been solved
      return leftChild.finished && rightChild.finished;
    }
  },
  methods: {
    ...mapActions([
      'bruteForceAuto',
      'bruteForceOne',
      'bruteForceLevel',
      'divide',
      'divideLevel',
      'conquerOne',
      'conquerAuto',
      'conquerLevel',
    ]),
    ...mapGetters([
      'getLeftChildCanvasNum',
      'getRightChildCanvasNum',
    ]),
  },
};
</script>

<style>
#solver {
  position: fixed;
}
</style>
