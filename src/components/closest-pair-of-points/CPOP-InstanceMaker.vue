<template lang="pug">
div
  div.row
    h2 Instance Maker
  div.row
    input(type='text' v-model='point'   @keyup.enter='addPoint({ point })')
    button.btn.btn-primary(@click='addPoint({ point })') Click Me
  div.row
    div {{text}}
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  data() {
    return {
      point: '',
    };
  },
  computed: {
    text() {

    },
    ...mapState([
      'points',
    ]),
  },
  methods: {
    ...mapActions([
      'addPoint',
    ]),
  },
};
</script>

<style scoped>

</style>
