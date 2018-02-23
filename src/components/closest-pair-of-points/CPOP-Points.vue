<template lang="pug">
div
  h2 Points
  ul
    li(v-for='(point, index) in points') 
      div.pt ({{point.x}}, {{point.y}}) 
      button.btn.btn-danger(@click='deletePoint({ index })') X
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  computed: {
    ...mapState([
      'points',
    ]),
  },
  methods: {
    ...mapActions(['deletePoint']),
  },
};
</script>

<style scoped>
ul{
  list-style-type: none;
}
div.pt {
  display: inline-block;
  width: 100px;
}
</style>

