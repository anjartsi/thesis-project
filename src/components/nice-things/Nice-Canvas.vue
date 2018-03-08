<script>
export default {
  data() {
    return {
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null,
      },
    };
  },
  computed: {
    canvasWidth() { return 0; },
    canvasHeight() { return 0; },

  },
  // Allows any child component to `inject: ['provider']` and have access to it.
  provide() {
    return {
      provider: this.provider,
    };
  },

  mounted() {
    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.provider.context = this.$refs['the-canvas'].getContext('2d');

    // Resize the canvas
    this.$refs['the-canvas'].width = this.canvasWidth;
    this.$refs['the-canvas'].height = this.canvasHeight;
  },
};
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
