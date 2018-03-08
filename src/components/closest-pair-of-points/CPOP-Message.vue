<template lang="pug">
  div.text-center#alertContainer
    div.alert.alert-info {{messages.addPoint}}
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('closestPairOfPoints');
export default {
  computed: {
    ...mapState([
      'messages',
    ]),
  },
};
</script>

<style>

#alertContainer div {
  position: absolute;
  width: 50%;
  z-index: 1;
  opacity: 0.9;;
}
</style>
