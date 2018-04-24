<template lang="pug">
div#canvasContainer.text-center
  h2 The Problem Tree
  div#canvasScroll
    CPOP-canvas(
      :canvasNum='0'
      :parentCanvas='null'
    )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CPOPCanvas from './CPOP-Canvas';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    CPOPCanvas,
  },
  props: [],
  data() { return {}; },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
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
