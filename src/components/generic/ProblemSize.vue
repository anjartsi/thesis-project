<template lang='pug'>
div.container-fluid
  h3(style="text-align:center") Problem Size
  div.row
    div.col-xs-12.text-center
      label(for="n1") n = 
      input(
        type="number"
        min="1"
        max="10"
        v-model.number='n'
        v-on:input='$emit("input", n)'
      )
  div.row
    div.col-xs-12
      input(
        type="range"
        min="1"
        max="10"
        v-model.number='n'
        v-on:input='$emit("input", n)'
      )
</template>

<script>
  export default {
    props: [
      'value'
    ], // end props

    data () {
      return {
        n: this.value
      }
    } // end data
  }
</script>

<style scoped>
</style>