<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Next Proposal
  div.row(v-if='proposingMan')
    div.col-xs-1
      div.personBox(
        :style='{width: "100%", "background-color":colors[proposingMan]}'
      )
        p m
          sub {{proposingMan}}
    div.col-xs-11
      div.personBox(
      v-for="i in n" 
      :style='{"background-color":colors[i]}'
      )
        p w
          sub {{i}}
  div.row(v-else)
    div
      h4 Waiting for next proposal
</template>

<script>
export default {

  data () {
    return {

    }
  },
  // end data
  props: [
    'n', 'colors', 'proposingMan'
  ]
}
</script>

<style scoped>
</style>