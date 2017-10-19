<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Tentatively Matched
  div.row(v-if='tentative.length > 0')
    div.col-xs-6
      div.row(v-for='(couple, index) in tentative' v-if='index < n / 2')
        div.col-xs-3
          h4 {{index + 1}}.) 
        div.personBox.m(:style='{"background-color": colors[couple.man]}')
          p m
            sub {{couple.man + 1}}
        div.personBox.w(:style='{"background-color": colors[couple.woman]}')
          p w
            sub {{couple.woman + 1}}
    div.col-xs-6
      div.row(v-for='(couple, index) in tentative' v-if='index >= n / 2 && index < n')
        div.col-xs-3
          h4 {{index + 1}}.) 
        div.personBox.m(:style='{"background-color": colors[couple.man]}')
          p m
            sub {{couple.man + 1}}
        div.personBox.w(:style='{"background-color": colors[couple.woman]}')
          p w
            sub {{couple.woman + 1}}
</template>

<script>
export default {
  data () {
    return {

    }
  },
  // end data
  props: [
    'n', 'colors', 'tentative'
  ]
}
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