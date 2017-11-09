<template lang='pug'>
div.container-fluid
  h3(style="text-align:center") Problem Size
  div.row
    div.col-xs-12.text-center
      label(for="n1") n =  
      input#n1.text-center(
        type='number'
        :min='minimumValue'
        :max='maximumValue'
        v-model='problemSize'
      )
  div.row
    div.col-xs-12
      input(
        type='range'
        :min='minimumValue'
        :max='maximumValue'
        v-model='problemSize'
      )
</template>

<script>
  export default {
    computed: {
      minimumValue() {
        const { min } = this.$store.state;
        if (min) {
          return min;
        }
        return 1;
      },
      maximumValue() {
        const { max } = this.$store.state;
        if (max) {
          return max;
        }
        return 10;
      },
      problemSize: {
        get() { return this.$store.state.problemSize; },
        set(newValue) {
          this.$store.dispatch('updateProblemSize', { n: newValue });
        },
      },
    },
    props: [
    ], // end props
    components: {
    },
    // end components
    data() {
      return {
      };
    },
    // end data
  };
</script>

<style scoped>
label {
  margin-right: 0.25em
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -moz-appearance:textfield;
    -webkit-appearance: none;
    margin: 0;
}
input[type=range] {
  height: 4rem;
}
</style>