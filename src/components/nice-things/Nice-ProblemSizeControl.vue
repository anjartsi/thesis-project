<template lang='pug'>
div.container-fluid
  h3(style="text-align:center") Problem Size
  transition(appear name='fade')
    div.row(v-show='!editing').absolute-position
      div.col-xs-12.text-center
        h3#psize n = {{problemSize}} 
      div.col-xs-12
        div.alert.alert-info.text-center
          h4 You must be in 
            button.btn.btn-primary(
              @click='$store.dispatch("switchMode")'
              ) Edit Mode 
            |  to change the problem size
          h4 
            strong Warning:
            |  Switching to Edit Mode will erase all progress made in the solver
  div.row
    div.col-xs-12.text-center
      transition(appear name='fade')
        div(v-show='editing')
          label(for="n1") n =  
          input#n1.text-center(
            type='number'
            :min='minimumValue'
            :max='maximumValue'
            v-model='problemSize'
          ) 
  transition(appear name='fade')
    div.row(v-show='editing')
      div.col-xs-2
        button.btn.btn-lg.btn-danger.pull-left(@click='decrement') -
      div.col-xs-8
        input(
          type='range'
          :min='minimumValue'
          :max='maximumValue'
          v-model='problemSize'
        )
      div.col-xs-2
        button.btn.btn-lg.btn-success.pull-right(@click='increment') +

  
</template>

<script>
  export default {
    computed: {
      editing() { return this.$store.getters.editing; },
      minimumValue() {
        const { min } = this.$store.state.min;
        if (min) {
          return min;
        }
        return 1;
      },
      maximumValue() {
        const { max } = this.$store.state.max;
        if (max) {
          return max;
        }
        return 10;
      },
      problemSize: {
        get() { return this.$store.state.problemSize; },
        set(newValue) {
          this.$store.dispatch('updateProblemSize', { n: newValue }, { root: true });
        },
      },
    },
    methods: {
      increment() { this.problemSize++; },
      decrement() { this.problemSize--; },
    }, // end methods
    components: {
    }, // end components
    data() {
      return {
      };
    }, // end data
  };
</script>

<style scoped>
label {
  margin-right: 0.25em
}

/* Remove the arrows from the number input */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -moz-appearance:textfield;
    -webkit-appearance: none;
    margin: 0;
}
label, input[type=number] {
  font-size: 1.6em;
}
input[type=range] {
  height: 4rem;
}
div.alert {
  padding-bottom: 0px;
}


#psize {
  margin-top: 0px;
}
.absolute-position {
  position: absolute;
}
</style>