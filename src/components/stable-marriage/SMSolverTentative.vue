<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Tentatively Matched
  div.row
    div.col-xs-6
      div.row(v-for='(couple, index) in tentative' v-if='index < n / 2')
        div.col-xs-3
          h4 {{index + 1}}.) 
        div.personBox(:style='{"background-color": colors[couple.man], width: "20%"}')
          p m
            sub {{couple.man}}
        div.personBox(:style='{"background-color": colors[couple.woman], width: "20%"}')
          p w
            sub {{couple.woman}}
    div.col-xs-6
      div.row(v-for='(couple, index) in tentative' v-if='index >= n / 2 && index < n')
        div.col-xs-3
          h4 {{index + 1}}.) 
        div.personBox(:style='{"background-color": colors[couple.man], width: "20%"}')
          p m
            sub {{couple.man}}
        div.personBox(:style='{"background-color": colors[couple.woman], width: "20%"}')
          p w
            sub {{couple.woman}}
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
  margin-right: 5px;
}
</style>