<template lang='pug'>
div.container-fluid
  h3(style="text-align:center") Problem Size
  div.row
    div.col-xs-12.text-center
      label(for="n1") n =  
      input#n1.text-center(
        type='number'
        min='1'
        max='10'
        v-model.number='problemSize'
        @input='$emit("input", problemSize)'
      )
  div.row
    div.col-xs-12
      input.range-slider__range(
        type='range'
        min='1'
        max='10'
        v-model.number='problemSize'
        @input='$emit("input", problemSize)'
      )
</template>

<script>
  export default {
    props: {
      problemSize: Number
    }, // end props
    components: {
    },
    // end components
    data () {
      return {
      }
    } // end data
  }
</script>

<style scoped>
label {
  margin-right: 0.25em
}
</style>