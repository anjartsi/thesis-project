<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h1 Tentatively Matched
  div.row.text-center(v-for='(couple, index) in tentative')
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