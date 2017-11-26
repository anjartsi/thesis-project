<template lang='pug'>
div.row#automator
  div.btn-group.btn-group-lg
    button.btn.btn-primary(
      @click='slower' 
      :class='{disabled:finished}'
    )
      i.fa.fa-minus
    button.btn.btn-success(
      v-if='!playing && !finished'
      @click='play'
      :class='{disabled:finished}'
    )
      i.fa.fa-play
    button.btn.btn-warning(
      v-else
      @click='pause'
      :class='{disabled:finished}'
    )
      i.fa.fa-pause
    button.btn.btn-danger(
      @click='faster'
      :class='{disabled:finished}'
      )
      i.fa.fa-plus
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
      slower() {
        this.dt = Math.min(this.dt * 2, 4000);
        if (this.playing) {
          this.pause();
          this.play();
        }
      },
    },
  };
</script>

<style scoped>
div#automator {
  width: 200px;
}
</style>