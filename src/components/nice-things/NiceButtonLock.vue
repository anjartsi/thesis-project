<template lang='pug'>
div.fixed
  div.container-fluid
    div.row
      div.col-xs-4.text-right
        h4 Edit Mode
      div.col-xs-4
        label.switch
          input(
            type='checkbox'
            :checked='solving' 
            @click='click'
          )
          span.slider.round
      div.col-xs-4.text-left
        h4 Solve Mode
</template>

<script>
import NiceButton from './NiceButton';

export default {
  name: 'NiceButtonLock',
  components: {
    NiceButton,
  },
  props: [
    'isLocked',
  ],
  // end props
  computed: {
    solving() { return this.$store.getters.solving; },
  },
  methods: {
    click() { this.$store.dispatch('switchMode'); },
  },
};
</script>

<style scoped>
.fixed {
  width: 400px;
}
div.col-xs-4 {
  margin-top: 10px;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 2.5em;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 2em;
  background-color: #101010;
  -webkit-transition: .4s;
  transition: .4s;
}

/* The circle that slides */
.slider:before {
  position: absolute;
  content: "";
  height: 2em;
  width: 2em;
  left: 4px;
  bottom: 4px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(240%);
  -ms-transform: translateX(240%);
  transform: translateX(240%);
}

</style>