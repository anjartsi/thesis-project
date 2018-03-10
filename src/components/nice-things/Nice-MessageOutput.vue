<template lang="pug">
  div
    div.row
      h2.col-xs-12
        slot Messages:
    div.row.col-xs-12
      div.messagesCont(v-if='displayHistory' :style='style')
        ol
          li(v-for='msg in messages') {{msg}}
        div.whitespace()
      div(v-else)
        p {{messages[messages.length - 1]}}
</template>

<script>

export default {
  components: {},
  props: [
    'namespace',
    'messages',
    'displayHistory',
    'height',
  ],
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    style() {
      return {
        'max-height': `${this.height}px`,
      };
    },
  },
  methods: {
    scrollDown() {
      const container = this.$el.querySelector('.messagesCont');
      container.scrollTop = container.scrollHeight;
    },
  },
  watch: {
    messages() {
      this.count++;
      this.scrollDown();
    },
  },
  mounted() {

  },
};
</script>

<style scoped>
div.messagesCont {
  overflow-y: auto;
}

div.whitespace {
  width: 10%;
  height: 20px;
}
</style>
