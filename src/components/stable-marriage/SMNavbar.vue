<template lang='pug'>
nav.navbar.navbar-default
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
          button#dropdownFile.btn.btn-default.navbar-btn.dropdown-toggle(
            type='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='true'
          ) File
            span.caret
          ul.dropdown-menu(aria-labelledby='dropdownFile')
            li: a(href='#') Action
            li: a(href='#') Another Action
</template>

<script>
  export default {};
</script>

<style scoped>
  nav {
    margin-bottom: 0px;
  }
</style>