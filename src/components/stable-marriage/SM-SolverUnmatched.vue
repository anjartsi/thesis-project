<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Unmatched
  div.row
    div.col-xs-2
      h4 Men:
    div.col-xs-10
      div(
        v-for='man in unmatched.m'
        style='display: inline-block'
        @click='$emit("nextManClickedEvent", man)'
        :class='{clickable}'
      )
        SM-person-box(
          :gender='"m"'
          :index='man'
        )
  div.row
    div.col-xs-2
      h4 Women:
    div.col-xs-10
      div(
          v-for='woman in unmatched.w' 
          style='display: inline-block'
        )
        SM-person-box(
          :gender='"w"'
          :index='woman'
        )
</template>

<script>
import SMPersonBox from './SM-PersonBox';

export default {
  components: {
    SMPersonBox,
  },
  computed: {
    solving() { return this.$store.getters['stableMarriage/solving']; },
    n() { return this.$store.state.stableMarriage.n; },
    unmatched() { return this.$store.state.stableMarriage.unmatched; },
  },
  props: [
    'clickable',
  ], // end props
  data() {
    return {
    };
  }, // end data
  methods: {
  },
};
</script>

<style scoped>
h4 {
  padding-top: 8px;
  text-align-last: right;
}
div.row {
  margin-bottom: 5px;
}
.clickable {
  cursor: pointer
}
</style>