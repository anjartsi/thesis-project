<template lang="pug">
div.blah
  h1 Blah
  div.loading(v-if='loading')
    p Loading . . .
  div.error(v-if='error') 
    p {{ error }}  
  div.content(v-if='post') 
    p {{ post }}

</template>

<script>
// This class was used to test calling api and fetching data
// todo - delete it :(
export default {
  data() {
    return {
      loading: true,
      post: null,
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
    getPost() {
      const me = this;
      console.log(me.$route.path);
      this.$http.get(`/api${me.$route.path}`)
      // eslint-disable-next-line
    .then(function (data) {
          me.post = data.data;
          for (const row of data.data) {
            console.log(JSON.stringify(row));
          }
          me.loading = false;
        })
      // eslint-disable-next-line
    .catch(function (err) {
          me.error = err.toString();
          me.loading = false;
        });
    },
    fetchData() {
      this.getPost();
    },
  },
};
</script>

<style>
.error {
  color: #AA0000;
}
</style>
