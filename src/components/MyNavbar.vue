<template lang="pug">
nav.navbar.navbar-fixed-top.navbar-default
  div.container-fluid
    div.navbar-header
      button.navbar-toggle.collapsed(type="button" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false")
        span.sr-only Toggle navigation
        - for (let i = 0; i < 3; i++)
          span.icon-bar
      router-link.navbar-brand(to="/") FwA
    div.collapse.navbar-collapse#nvbar-collapse-1
      ul.nav.navbar-nav(v-for="item in nav")
        li: router-link(:to='item.link') {{item.text}}
            
</template>

<script>

export default{
  data() {
    return {
      nav: [
        { link: '/', text: 'Home' },
        { link: '/stable-marriage', text: 'Stable Marriage' },
        { link: '/interval-scheduling', text: 'Interval Scheduling' },
        { link: '/closest-pair-of-points', text: 'Closest Pair of Points' },
      ],
    };
  },
};
</script>

<style scoped>
  nav {
    margin-bottom: 0px;
  }
</style>