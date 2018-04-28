<template lang="pug">
div#canvasContainer.text-center
  h2 The Problem Tree
  nice-hint(namespace='closestPairOfPoints'  :show='false')
    p Click on a problem to select it
  div#canvasScroll
    CPOP-canvas(
      :canvasNum='0'
      :parentCanvas='null'
    )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CPOPCanvas from './CPOP-Canvas';
import NiceHint from '../nice-things/Nice-Hint';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    CPOPCanvas,
    NiceHint,
  },
  props: [],
  data() { return {}; },
  computed: {
    ...mapState([]),
    ...mapGetters([
      'solving',
    ]),
  },
  methods: {
    ...mapActions([]),
  },

};
</script>

<style scoped>
#canvasContainer {
  overflow-wrap: normal;
}
#canvasScroll {
  display: inline-block;
  width: max-content;
  max-width: max-content;
  min-width: max-content;
  border: 1px solid black;
  background-color: white;
  padding: 15px;
}
</style>
