<template lang='pug'>
div
  nav.navbar.navbar-fixed-top.navbar-inverse#navbar2
    div.container-fluid
      //- Navbar head
      div.navbar-header
        button.navbar-toggle.collapsed(
          type="button"
          data-toggle="collapse"
          data-target="#navbar-collapse-2"
          aria-expanded="false"
        )
          span.sr-only Toggle navigation
          - for (let i = 0; i < 3; i++)
            span.icon-bar
        div.navbar-brand 
          slot(name='brand') Brand
      //- Navbar Body
      div.collapse.navbar-collapse#nvbar-collapse-2
        ul.nav.navbar-nav
          //- The File Dropdown
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
                :data-target='"#" + saveId'
                ) Save As Text File
              li: a(
                role='button'
                data-toggle='modal'
                :data-target='"#" + loadId'
              ) Load Text File
              slot(name='file')
        ul.nav.navbar-nav
          //- The File Dropdown
          li.dropdown
            a#dropdownFile.dropdown-toggle(
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='true'
            ) Examples
              span.caret
            ul.dropdown-menu(aria-labelledby='dropdownFile')
              li(:class='{ disabled: solving }')
                a(
                  v-for='instance in instances'
                  role='button'
                  @click='showExample(instance.instance_text)'
                ) {{instance.instance_name}}
          slot(name='menu')
        //- The Lock-Unlock button
        ul.nav.navbar-nav.navbar-right
          li
            nice-button-lock.bg-primary(:namespace='namespace')
        div.nav.navbar-nav
          slot(name='automator')
  //- Add modal to save/load here
  slot(name='modal') 
    div.alert.alert-danger#error
      p Save/Load functionality not implemented.
</template>

<script>
import NiceButtonLock from '../nice-things/Nice-ButtonLock';
import NiceButton from '../nice-things/Nice-Button';

export default {
  components: {
    NiceButtonLock, NiceButton,
  },
  props: [
    'namespace',
    'saveId',
    'loadId',
  ],
  computed: {
    solving() { return this.$store.getters[`${this.namespace}/solving`]; },
  },
  data() {
    return {
      loading: true,
      instances: null,
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    showExample(text) {
      if (!this.solving) this.$store.dispatch(`${this.namespace}/loadFile`, { loadText: text });
    },
    fetchData() {
      this.$http.get(`/api${this.$route.path}`)
        .then((data) => {
          this.instances = data.data;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err.toString();
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
  nav {
    margin-top: 50px;
    margin-bottom: 0px;
  }
  #error {
    text-align: center;
    position: absolute;
    top:50px;
    height: min-content;
    width: 95%;
    z-index: 1;
    opacity: 0.75;
  }
</style>