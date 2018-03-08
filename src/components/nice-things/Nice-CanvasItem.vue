<script>
export default {
  inject: ['provider'],
  methods: {
    draw() {
      console.log('draw me');
    },
  },
  render() {
    if (!this.provider.context) return;
    this.draw();
  },
};
</script>
