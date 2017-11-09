<template lang='pug'>
div.container-fluid
  h3(style="text-align:center") Problem Size
  div.row
    div.col-xs-12.text-center
      label(for="n1") n =  
      input#n1.text-center(
        type='number'
        :min='min? min : 1'
        :max='max? max : 10'
        v-model.number='n'
        @input='$emit("input", n)'
      )
  div.row
    div.col-xs-12
      input.range-slider__range(
        type='range'
        :min='min? min : 1'
        :max='max? max : 10'
        v-model.number='n'
        @input='$emit("input", n)'
      )
</template>

<script>
  export default {
    props: [
      'problemSize',
      'min',
      'max',
    ], // end props
    components: {
    },
    // end components
    data() {
      return {
        n: this.problemSize,
      };
    },
    // end data
  };
</script>

<style scoped>
label {
  margin-right: 0.25em
}
</style>