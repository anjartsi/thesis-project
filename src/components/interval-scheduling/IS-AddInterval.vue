<template lang="pug">
div.container-fluid
  div#newIntervalForm
    div.col-xs-6
      label(for='startTime') Start: 
      button.btn.btn-danger(
        @click='decrementStart'
      )
        i.fa.fa-minus
      input#startTime(
        type='number'
        :min='earliestTime'
        :max='finishTime - 1'
        v-model.lazy='startTime'
      )
      button.btn.btn-success(
        @click='incrementStart'
      )
        i.fa.fa-plus
    div.div.col-xs-6
      label(for='finishTime') Finish:
      button.btn.btn-danger(
        @click='decrementFinish'
      ) 
        i.fa.fa-minus
      input#finishTime(
        type='number'
        :min='startTime + 1'
        :max='latestTime'
        v-model.lazy='finishTime'
      )
      button.btn.btn-success(
        @click='incrementFinish'
      ) 
        i.fa.fa-plus
  div.row
    div.col-xs-12
      vue-slider(
        :min='earliestTime'
        :max='latestTime'
        v-model='sliderInterval'
        :tooltipDir='["left", "right"]'
        :dot-width='15'
        :dot-height='40'
      )
  br
  div.row
    div.col-xs-2
      nice-button.btn-danger(@click='deleteAllIntervals') Clear All
    div.col-xs-5
      nice-button.btn-success(@click='createNewInterval') Add Interval
    div.col-xs-5
      nice-button.btn-warning(@click='createRandomInterval') Add Random Interval
  nice-Hint(namespace='intervalScheduling'  :show='editing').hint
    p Use the buttons and sliders above to add more intervals to the set
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceButton from '../nice-things/Nice-Button';
import NiceHint from '../nice-things/Nice-Hint';
import VueSlider from 'vue-slider-component';
import { randomInt } from '../../scripts/stuff';
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('intervalScheduling');

export default {
  components: {
    NiceButton,
    VueSlider,
    NiceHint,
  },
  props: [
    'index',
  ],
  data() {
    return {
      startTime: 0,
      finishTime: 5,
      correctIntervalText: false,
    };
  },
  computed: {
    ...mapState([
      'problemSize',
      'earliestTime',
      'latestTime',
    ]),
    ...mapGetters([
      'editing',
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
    }, // end intervalText
    sliderInterval: {
      get() {
        return [this.startTime, this.finishTime];
      },
      set(newVal) {
        [this.startTime, this.finishTime] = newVal;
      }
    }
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
    ...mapActions([
      'deleteAllIntervals',
    ]),
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
      this.$store.dispatch('intervalScheduling/addInterval', {
        start: this.startTime,
        finish: this.finishTime,
      });
    },
    createRandomInterval() {
      let a = randomInt(this.earliestTime, this.latestTime);
      let b = randomInt(this.earliestTime, this.latestTime);
      while (b === a) b = randomInt(this.earliestTime, this.latestTime);

      const start = Math.min(a, b);
      const finish = Math.max(a, b);
      this.$store.dispatch('intervalScheduling/addInterval', {
        start,
        finish,
      });
      this.startTime = start;
      this.finishTime = finish;
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
.hint {
  left: 300px;
}
</style>
