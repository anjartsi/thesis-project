<template lang='pug'>
div.row
  div.col-xs-3.col-lg-2.col-xl-1
    h3 Automate
  div.col-xs-5.col-lg-6.col-xl-7
    div.btn-group.btn-group-lg
      button.btn.btn-primary.fastSlow(
        @click='slower' 
        :class='{disabled:finished}'
      ) Slower
        br
        | (&divide; 2)
      button.btn.btn-success.playPause(
        v-if='!playing && !finished'
        @click='play'
        :class='{disabled:finished}'
      ) Run Algorithm
        br
        i.fa.fa-play    
      button.btn.btn-warning.playPause(
        v-else
        @click='pause'
        :class='{disabled:finished}'
      ) Pause Algorithm
        br
        i.fa.fa-pause
      button.btn.btn-danger.fastSlow(
        @click='faster'
        :class='{disabled:finished}'
        ) Faster
          br
          | (&times; 2)
  div.col-xs-4
    div.row
      div.col-xs-7
        h4 Current speed: 
      div.col-xs-5 
        h4 &times;{{speed / dt}}
    div.row
      div.col-xs-7
        h4 Time per iteration:
      div.col-xs-5
        h4 {{dt / 1000}} s
</template>

<script>
  import NiceButton from './NiceButton';
  
  export default {
    components: {
      NiceButton,
    },
    props: [
      'funcs',
      'speed',
      'finished',
    ],
    // end props
    data() {
      return {
        playing: false,
        t1: null,
        t2: null,
        dt: this.speed,
        intervalID: null,
      };
    },
    // end data
    methods: {
      play() {
        if (!this.playing) {
          this.playing = true;
          this.automate();
        }
      },
      pause() {
        if (this.playing) {
          this.playing = false;
          window.clearInterval(this.intervalID);
        }
      },
      automate() {
        if (this.playing) {
          this.intervalID = window.setInterval(this.doEverythingOnce, this.dt);
        }
      },
      // end automate
      doEverythingOnce() {
        if (!this.finished) {
          for (let i = 0; i < this.funcs.length; i++) {
            this.funcs[i]();
          }
        } else {
          this.pause();
        }
      },
      // end doEverythingOnce()
      faster() {
        this.dt = Math.max(this.dt / 2, 125);
        if (this.playing) {
          this.pause();
          this.play();
        }
      },
      // end faster()
      slower() {
        this.dt = Math.min(this.dt * 2, 4000);
        if (this.playing) {
          this.pause();
          this.play();
        }
      },
      // end slower()
    },
    // end methods
  };
</script>

<style scoped>
.btn-group {
  width: 100%;
}
.playPause {
  width: 50%;
}
.fastSlow {
  width: 25%;
}
.btn {
  font-size: 1.8rem;
}
h4 {
  font-size: 1.6rem;
}
</style>