<template lang="pug">
div.container-fluid
  div#newIntervalForm
    div.row
      label(for='startTime') Start: 
      button.btn.btn-danger(
        @click='decrementStart'
      ) &minus;
      input#startTime(
        type='number'
        :min='earliestTime'
        :max='finishTime - 1'
        v-model='startTime'
      )
      button.btn.btn-success(
        @click='incrementStart'
      ) &plus;
    div.row
      br
      label(for='finishTime') Finish:
      button.btn.btn-danger(
        @click='decrementFinish'
      ) &minus;
      input#finishTime(
        type='number'
        :min='startTime + 1'
        :max='latestTime'
        v-model='finishTime'
      )
      button.btn.btn-success(
        @click='incrementFinish'
      ) &plus;
  br
  div.row
    div.col-xs-12
      nice-button.btn-primary(@click='createNewInterval') Add Interval
</template>

<script>
import Vuex from 'vuex';
import NiceButton from '../nice-things/Nice-Button';

export default {
  components: {
    NiceButton,
  },
  props: [
    'index',
  ],
  data() {
    return {
      startTime: 0,
      finishTime: 1,
    };
  },
  computed: {
    ...Vuex.mapState([
      'problemSize',
      'earliestTime',
      'latestTime',
    ]),
  },
  methods: {
    incrementStart() {
      // If there's enough room
      if (this.startTime < this.latestTime - 1) {
        this.startTime = this.startTime + 1;
      }
      // check to see if start === finish
      if (this.startTime >= this.finishTime) {
        this.incrementFinish();
      }
    },
    incrementFinish() {
      if (this.finishTime < this.latestTime) {
        this.finishTime++;
      }
    },
    decrementStart() {
      if (this.startTime > this.earliestTime) {
        this.startTime--;
      }
    },
    decrementFinish() {
      if (this.finishTime > this.earliestTime + 1) {
        this.finishTime--;
      }
      if (this.finishTime <= this.startTime) {
        this.decrementStart();
      }
    },
    createNewInterval() {
      this.$store.dispatch('addInterval', { start: this.startTime, finish: this.finishTime });
    },
  },
};
</script>

<style scoped>

#newIntervalForm label {
  text-align: right;
  width: 25%;
  margin-right: 2.5%;
  margin-left: 2.5%;
}
#newIntervalForm input[type=number] {
  width: 25%;
  margin-left: 2.5%;
  margin-right: 2.5%;
  text-align: center;
}
#newIntervalForm label, input[type=number] {
  font-size: 1.2em;
}
/* Remove the arrows from the number input */
#newIntervalForm input[type=number]::-webkit-inner-spin-button,
#newIntervalForm input[type=number]::-webkit-outer-spin-button {
    -moz-appearance:textfield;
    -webkit-appearance: none;
    margin: 0;
}

#newIntervalForm button {
  width: 15%;
}
</style>
