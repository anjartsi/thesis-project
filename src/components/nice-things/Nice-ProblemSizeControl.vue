<template lang='pug'>
div.container-fluid
  h3(style="text-align:center") Problem Size
  transition(appear name='fade')
    div.row(v-show='!editing').absolute-position
      div.col-xs-12.text-center
        h3#psize n = {{problemSize}} 
      div.col-xs-11
        div.alert.alert-info.text-center
          h4 You must be in 
            button.btn.btn-primary(
              @click='$store.dispatch(namespace +"/switchMode")'
              ) Edit Mode 
            |  to make changes to the instance
          h4 
            strong Warning:
            |  Switching to Edit Mode will erase all progress made in the Solver
  transition(appear name='fade')
    div.row#buttons(v-show='editing')
      nice-button.btn-danger(@click='decrement') 
        i.fa.fa-minus
      div
        h4 n = {{problemSize}}
      nice-button.btn-success(@click='increment') 
        i.fa.fa-plus
  
</template>

<script>
  import NiceButton from './Nice-Button';
  import VueSlider from 'vue-slider-component';

  export default {
    components: { NiceButton, VueSlider},
    props: [
      'namespace',
    ],
    data() {
      return {
      };
    }, // end data
    computed: {
      editing() { return this.$store.getters[`${this.namespace}/editing`]; },
      minimumValue() {
        const { min } = this.$store.state[this.namespace].min;
        if (min) {
          return min;
        }
        return 1;
      },
      maximumValue() {
        const { max } = this.$store.state[this.namespace].max;
        if (max) {
          return max;
        }
        return 10;
      },
      problemSize: {
        get() { return this.$store.state[this.namespace].problemSize; },
        set(newValue) {
          this.$store.dispatch(`${this.namespace}/updateProblemSize`, { n: newValue }, { root: true });
        },
      },
    },
    methods: {
      increment() { this.problemSize++; },
      decrement() { this.problemSize--; },
    }, // end methods
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
#buttons {
  text-align: center;
}
#buttons button{
  width: 30%;
  display: inline-block;
}
#buttons div {
  display: inline-block;
  width: 40%;
}
</style>