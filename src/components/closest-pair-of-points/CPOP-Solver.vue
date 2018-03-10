<template lang="pug">
  div
    h1 Solver
    nice-Button(@click='bruteForceOne') Brute Force (one step)
    nice-Button(@click='bruteForceAll') Brute Force (auto)
    nice-Button(@click='divide') Divide
    nice-Button(@click='vueBruteForce') Conquer
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceButton from '../nice-things/Nice-Button';

const { mapState, mapActions } = createNamespacedHelpers('closestPairOfPoints');
export default {
  components: {
    NiceButton,
  },
  computed: {
    ...mapState([
      'messages',
    ]),
  },
  methods: {
    ...mapActions([
      'bruteForceAll',
      'bruteForceOne',
      'divide',
    ]),
    vueBruteForceAll() {
    },
    vueBruteForceOne() {
    },
    vueBruteForce() {
      console.log(this.$store.state.closestPairOfPoints);
      // todo - start with brute force
    },
  },
};
</script>
