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
    div.row
      br
      label(for='textInput') Interval:
      input#textInput(
        type='text'
        v-model.lazy='intervalText'
        @keyup.enter='addTypedInterval'
        )
  br
  div.row
    div.col-xs-12
      nice-button.btn-success(@click='createNewInterval') Add Interval
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
      correctIntervalText: false,
    };
  },
  computed: {
    ...Vuex.mapState([
      'problemSize',
      'earliestTime',
      'latestTime',
    ]),
    intervalText: {
      get() {
        return `${this.startTime} ${this.finishTime}`;
      },
      set(newVal) {
        let correct = true;
        let start;
        let finish;
        let s = newVal.replace(/-|,|\s+/, ' ');
        s = s.split(' ');
        correct = correct && s.length === 2;
        if (correct) {
          start = Number.parseInt(s[0], 10);
          finish = Number.parseInt(s[1], 10);
        }
        correct = correct && start < finish;
        this.correctIntervalText = correct;
        if (correct) {
          this.startTime = Math.max(this.earliestTime, start);
          this.finishTime = Math.min(this.latestTime, finish);
        } else {
          this.startTime = this.startTime;
          this.finishTime = this.finishTime;
        }
      },
    },
  },
  watch: {
    startTime(newVal) {
      const num = this.coerce(newVal, this.earliestTime, this.latestTime - 1);
      this.startTime = num;
      if (num >= this.finishTime) {
        this.finishTime = this.coerce(this.finishTime, num + 1, this.latestTime);
      }
    },
    finishTime(newVal) {
      const num = this.coerce(newVal, this.earliestTime + 1, this.latestTime);
      this.finishTime = num;
      if (num <= this.startTime) {
        this.startTime = this.coerce(this.startTime, this.earliestTime, num - 1);
      }
    },
  },
  methods: {
    coerce(num, min, max) {
      let val = Math.max(num, min);
      val = Math.min(val, max);
      return val;
    },
    incrementStart() {
      this.startTime++;
      this.startTime = this.coerce(this.startTime, this.earliestTime, this.latestTime - 1);
    },
    incrementFinish() {
      this.finishTime++;
      this.finishTime = this.coerce(this.finishTime, this.earliestTime + 1, this.latestTime);
    },
    decrementStart() {
      this.startTime--;
      this.startTime = this.coerce(this.startTime, this.earliestTime, this.latestTime - 1);
    },
    decrementFinish() {
      this.finishTime--;
      this.finishTime = this.coerce(this.finishTime, this.earliestTime + 1, this.latestTime);
    },
    createNewInterval() {
      this.$store.dispatch('addInterval', { start: this.startTime, finish: this.finishTime });
      this.startTime = this.startTime;
    },
    addTypedInterval() {
      if (this.correctIntervalText) {
        this.createNewInterval();
      }
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

input#textInput {
  font-size: 1.2em;
  width: 50%;
  margin-left: 10px;
  padding-left: 3px;
}

#newIntervalForm button {
  width: 15%;
}
</style>
