<template lang='pug'>
button(
  @click='$emit("click")'
).btn.btn-block.btn-lg 
  slot Don't Push Me
</template>

<script>
export default {
  name: 'NiceButton',
  // end props
  data() {
    return {
    };
  },
  // end data
};
</script>

<style scoped>
</style>