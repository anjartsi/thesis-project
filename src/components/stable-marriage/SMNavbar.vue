<template lang='pug'>
nav.navbar.navbar-fixed-top.navbar-inverse
  div.container-fluid
    div.navbar-header
      button.navbar-toggle.collapsed(type="button" data-toggle="collapse" data-target="#navbar-collapse-2" aria-expanded="false")
        span.sr-only Toggle navigation
        - for (let i = 0; i < 3; i++)
          span.icon-bar
      div.navbar-brand Stable Marriage
    div.collapse.navbar-collapse#nvbar-collapse-2
      ul.nav.navbar-nav
        li.dropdown
          a#dropdownFile.dropdown-toggle(
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='true'
          ) File
            span.caret
          ul.dropdown-menu(aria-labelledby='dropdownFile')
            li: a(role='button' @click='getText') Save As Text File
            li: a(role='button') Load Text File
      ul.nav.navbar-nav.navbar-right
        li
          nice-button-lock.bg-primary
</template>

<script>
import NiceButtonLock from '../nice-things/NiceButtonLock';

export default {
  components: {
    NiceButtonLock,
  },
  computed: {
    problemSize() { return this.$store.state.problemSize; },
    locked() { return this.$store.getters.editing; },
    preferences() { return this.$store.state.preferences; },
  },
  methods: {
    lock() { this.$store.dispatch('switchMode'); },
    getText() {
      let str = '';
      const printArray = (val) => {
        str += val;
        str += ' ';
        return val;
      };
      const printRowsOf2dArray = (val) => {
        val.map(printArray);
        // erase the extra space
        str = str.substr(0, str.length - 1);
        str += '\n';
        return val;
      };
      this.preferences.m.map(printRowsOf2dArray);
      str += '\n';
      this.preferences.w.map(printRowsOf2dArray);
      // eslint-disable-next-line
      console.log(str);
    },
  },
};
</script>

<style scoped>

  nav {
    margin-top: 50px;
    margin-bottom: 0px;
  }
</style>