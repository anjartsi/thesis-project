<template lang='pug'>
div
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
              li: a(
                role='button'
                data-toggle='modal'
                data-target='#saveModal'
                ) Save As Text File
              li: a(
                role='button'
                data-toggle='modal'
                data-target='#loadModal'
              ) Load Text File
        ul.nav.navbar-nav.navbar-right
          li
            nice-button-lock.bg-primary
  SM-save-load(saveId='saveModal'  loadId='loadModal')
</template>

<script>
import NiceButtonLock from '../nice-things/NiceButtonLock';
import NiceButton from '../nice-things/NiceButton';
import SMSaveLoad from './SMSaveLoad';

export default {
  components: {
    NiceButtonLock, NiceButton, SMSaveLoad,
  },
  data() {
    return {};
  },
  computed: {
    problemSize() { return this.$store.state.problemSize; },
    locked() { return this.$store.getters.editing; },
  },
  methods: {
    lock() { this.$store.dispatch('switchMode'); },
  },
};
</script>

<style scoped>

  nav {
    margin-top: 50px;
    margin-bottom: 0px;
  }
</style>