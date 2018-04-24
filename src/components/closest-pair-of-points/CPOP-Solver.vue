<template lang="pug">
  div#solver
    h1 Solver
    h4 Divide
    nice-Button.btn-primary(
      @click='divide'
      :class='{disabled:finished || divided || pointsInSubproblem <= 3}'
    ) One
    nice-Button.btn-success(
      @click='divideLevel'
    ) Entire Level
    hr
    h4 Brute Force
    nice-Button.btn-primary(
      @click='bruteForceOne'
      :class='{disabled:finished || divided}'
    ) One
    nice-Button.btn-warning(
      @click='bruteForceAuto'
      :class='{disabled:finished || divided}'
    ) Auto
    nice-Button.btn-success(
      @click='bruteForceLevel'
    ) Entire Level
    hr
    h4 Conquer
    nice-Button.btn-primary(
      @click='conquerOne'
      :class='{disabled: !readyToConquer}'
    ) One
    nice-Button.btn-warning(
      @click='conquerAuto'
      :class='{disabled: !readyToConquer}'
    ) Auto
    nice-Button.btn-success(
      @click='conquerLevel'
    ) Entire Level
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

.disabled {
  visibility: hidden!important;
}

</style>
