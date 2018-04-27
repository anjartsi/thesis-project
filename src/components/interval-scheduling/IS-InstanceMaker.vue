<template lang="pug">
div.container-fluid
  div.row
    div.col-xs-12
      h3 Add New Interval ( {{problemSize}} total)
    div.col-xs-12
      IS-add-interval

</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ProblemSizeControl from '../nice-things/Nice-ProblemSizeControl';
import NiceButton from '../nice-things/Nice-Button';
import ISAddInterval from './IS-AddInterval';
import ISTray from './IS-Tray';
import ISSolver from './IS-Solver';

const { mapState, mapGetters } = createNamespacedHelpers('intervalScheduling');

export default {
  components: {
    NiceButton,
    ProblemSizeControl,
    ISAddInterval,
    ISTray,
    ISSolver,
  },
  props: [],
  data() {
    return {
      startTime: 0,
      finishTime: 2,
    };
  },
  computed: {
    ...mapState([
      'problemSize',
      'earliestTime',
      'latestTime',
      'intervals',
    ]),
    ...mapGetters({
      locked: 'editing',
    }),
  }, // end computed
  methods: {
  },
};
</script>

<style scoped>
</style>
