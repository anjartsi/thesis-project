<template lang="pug">
  div#solver
    h1 Solver
    nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint0
      p The light-blue image is the one that is "selected"
    h4 Divide
    div(:class='{disabled:finished || divided || pointsInSubproblem <= 3}')
      nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint1
        p Divide the selected problem into two subproblems
      nice-Button.btn-primary(
        @click='divide'
      ) One
    div(:class='')
      nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint2
        p Divide all problems at the same level as the selected one
      nice-Button.btn-success(
        @click='divideLevel'
      ) Entire Level
    hr
    h4 Brute Force
    div(:class='{disabled:finished || divided}')
      nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint3
        p Perform one step in brute-forcing the selected problem
      nice-Button.btn-primary(
        @click='bruteForceOne'
      ) One
    div(:class='{disabled:finished || divided}')
      nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint4
        p Completely brute-force the selected problem
      nice-Button.btn-warning(
        @click='bruteForceAuto'
      ) Auto
    div(:class='')
      nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint5
        p Completely brute-force all problems at the same level as the selected one
      nice-Button.btn-success(
        @click='bruteForceLevel'
      ) Entire Level
    hr
    h4 Conquer
    div(:class='{disabled: !readyToConquer}')
      nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint6
        p Perform one step in conquering the selected problem (note, conquering will not work if you attempted to brute force this problem)
      nice-Button.btn-primary(
        @click='conquerOne'
      ) One
    div(:class='{disabled: !readyToConquer}')
      nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint7
        p Completely conquer the selected problem
      nice-Button.btn-warning(
        @click='conquerAuto'
      ) Auto
    div
      nice-hint(namespace='closestPairOfPoints'  :show='solving').hint#hint8
        p Completely conquer all problems at the same level as the selected problem
      nice-Button.btn-success(
        @click='conquerLevel'
      ) Entire Level
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceButton from '../nice-things/Nice-Button';
import NiceHint from '../nice-things/Nice-Hint';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');
export default {
  components: {
    NiceButton,
    NiceHint,
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
      'solving',
      'getLeftChildCanvasNum',
      'getRightChildCanvasNum',
    ]),
  },
};
</script>

<style scoped>

#solver {
  position: fixed;
}

.disabled {
  visibility: hidden!important;
}

.hint {
  left: 100%;
  z-index: 2147483647;
  opacity: 0.9;
  min-width: max-content;
  max-width: 600%;
}

#hint0 {
  top: 10px;
}
</style>
