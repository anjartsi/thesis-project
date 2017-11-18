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
        v-if='solving'
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
      SM-person-box(
        v-if='solving'
        v-for='woman in unmatched.w' 
        :gender='"w"'
        :index='woman'
        :key='woman'
      )
</template>

<script>
import SMPersonBox from './SMPersonBox';

export default {
  components: {
    SMPersonBox,
  },
  computed: {
    solving() { return this.$store.getters.solving; },
    n() { return this.$store.state.n; },
    unmatched() { return this.$store.state.unmatched; },
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