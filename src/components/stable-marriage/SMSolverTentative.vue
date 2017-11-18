<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Tentatively Matched
  div.row
    div(v-if='n <= 3')
      div.col-xs-12
        div.row(v-for='i in n')
          div.col-xs-2
            h4 {{i}} .)
          div.col-xs-10(v-if='tentative[i-1]')
            SM-person-box(
              :gender='"m"'
              :index='tentative[i-1].man'
            )
            SM-person-box(
              :gender='"w"'
              :index='tentative[i-1].woman'
            )
    div(v-else)
      div.col-xs-6
        div.row(v-for='i in n' v-if='i <= (n + 1) / 2')
          div.col-xs-2
            h4 {{i}}.)
          div.col-xs-10(v-if='tentative[i-1]')
            SM-person-box(
              :gender='"m"'
              :index='tentative[i-1].man'
            )
            SM-person-box(
              :gender='"w"'
              :index='tentative[i-1].woman'
            )
      div.col-xs-6
        div.row(v-for='i in n' v-if='i > (n + 1) / 2')
          div.col-xs-2
            h4 {{i}}.)
          div.col-xs-10(v-if='tentative[i-1]')
            SM-person-box(
              :gender='"m"'
              :index='tentative[i-1].man'
            )
            SM-person-box(
              :gender='"w"'
              :index='tentative[i-1].woman'
            )
</template>

<script>
import SMPersonBox from './SMPersonBox';

export default {
  components: {
    SMPersonBox,
  },
  data() {
    return {
    };
  }, // end data
  computed: {
    n() { return this.$store.state.problemSize; },
    tentative() { return this.$store.state.tentatives; },
  }, // end computed
};
</script>

<style scoped>
div.row {
  margin-bottom: 5px;
}
div.row h4 {
  display: inline-block;
  margin-top:20px;
  margin-right: 5px;
}
</style>