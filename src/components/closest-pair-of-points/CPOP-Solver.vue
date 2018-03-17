<template lang="pug">
  div
    h1 Solver
    h4
    nice-Button.btn-default(
      @click='divide'
      :class='{disabled:finished || divided}'
    ) Divide
    nice-Button.btn-default(
      @click='divideLevel'
      :class='{disabled:false}'
    ) Divide Entire Level
    hr
    nice-Button.btn-default(
      @click='bruteForceOne'
      :class='{disabled:finished || divided}'
    ) Brute Force (one step)
    nice-Button.btn-default(
      @click='bruteForceAll'
      :class='{disabled:finished || divided}'
    ) Brute Force (auto)
    hr
    nice-Button.btn-default(
      @click='conquerOne'
      :class='{disabled: !readyToConquer}'
    ) Conquer (one step)
    nice-Button.btn-default(
      @click='conquerAll'
      :class='{disabled: !readyToConquer}'
    ) Conquer (auto)
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
      'bruteForceAll',
      'bruteForceOne',
      'divide',
      'divideLevel',
      'conquerOne',
      'conquerAll',
    ]),
    ...mapGetters([
      'getLeftChildCanvasNum',
      'getRightChildCanvasNum',
    ]),
  },
};
</script>
