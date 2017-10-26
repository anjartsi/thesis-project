<template lang="pug">nav.navbar.navbar-inverse
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
  data () {
    return {
      nav: [
        {link: '/', text: 'Home'},
        {link: '/stable-marriage', text: 'Stable Marriage'}
      ]
    }
  }
}
</script>

<style>
  
</style>