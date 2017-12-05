<template lang='pug'>
div
  //- SAVE 
  nice-modal(:id='saveId')
    h4(slot='title') Save Instance as Text
    h4
      a(
        :href='"data:text/plain;charset=utf-8,"+ encodeURIComponent(getText())'
        download='stable-marriage-instance.txt'
        ) Download Text File
    h5 Or copy the following text
    textarea(
      readonly
      :rows='problemSize * 2 + 2' 
      :cols='problemSize * 2 + 10' 
    ) {{getText()}}
  //- LOAD 
  nice-modal(:id='loadId')
    h4(slot='title') Load Instance from File
    div.row
      div.col-xs-5
        h5 Paste your Instance Text here
        textarea(
          :rows='22'
          :cols='45' 
          v-model='loadInput'
          :placeholder='getText()'
        )
      div.col-xs-7.text-center
        div.row
          h5 Or Upload a File
          form(enctype="multipart/form-data" novalidate)
            div.dropbox
              p Drag files here
              input.input-file#fileInput(
                @change='readFile'
                type="file" 
                accept=".txt"
              )
              //- label(for='fileInput') Or Choose a file
        div.row
          h4 Rules
          ul.text-left
            li Don't include any letters please
            li Empty lines are ignored
            li Numbers must be separated by a single space
              ul: li But any whitespace before/after the numbers is ignored
            li Numbers can be zero-indexed OR one-indexed (but not both at the same time)
              ul
                li Zero-indexed: numbers must be in the range [0, n - 1]
                li One-indexed: numbers must be in the range [1, n]
            li The first n lines are the men's preference lists, and the next n lines are the women's preference lists
            li Each row must have exactly n numbers in it
              ul
                li This means you only need to have the preferences
                li For example: If the first row says "1 2 3 4 5" then that means Man 1 prefers Woman 1, then Woman 2, ... , then Woman 5
    div(slot='buttons')
      button.btn.btn-primary(
        type='button' 
        data-dismiss='modal'
        @click='loadFile'
        :class='{disabled: loadInput.length === 0}'
      ) Load File
  //- ALERT
  div.alert.alert-danger.alert-dismissible#loadError(
    v-if='loadError'
    role='alert'
  )
    button.close(
      type='button'
      aria-label='close'
      @click='$store.commit("loadStart")'
    )
      span(aria-hidden='true') &times;
    h4 Error while loading file
    h5(v-for='msg in loadMessage') {{msg}}
</template>

<script>
import NiceModal from '../nice-things/Nice-Modal';

export default {
  components: {
    NiceModal,
  },
  props: [
    'saveId',
    'loadId',
  ],
  data() {
    return {
      loadInput: '',
      message: [],
      uploadFile: undefined,
    };
  },
  computed: {
    problemSize() { return this.$store.state.problemSize; },
    locked() { return this.$store.getters.editing; },
    preferences() { return this.$store.state.preferences; },
    loadMessage() { return this.$store.state.loadMessage; },
    loadError() { return this.$store.state.loadError; },
  },
  methods: {
    getText() {
      let str = '';
      const printArray = (val) => {
        str += val;
        str += ' ';
        return val;
      };
      const printRowsOf2dArray = (val) => {
        val.map(printArray);
        // erase the extra space
        str = str.substr(0, str.length - 1);
        str += '\r\n';
        return val;
      };
      this.preferences.m.map(printRowsOf2dArray);
      str += '\r\n';
      this.preferences.w.map(printRowsOf2dArray);
      // eslint-disable-next-line
      return str;
    },
    loadFile() {
      this.$store.dispatch('loadFile', { loadText: this.loadInput });
    },
    readFile(event) {
      // eslint-disable-next-line
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.loadInput = e.target.result;
          this.loadInput += '\r\n';
        };
        reader.readAsText(file, 'utf-8');
      }
    },
  },
};
</script>

<style scoped>
  
#loadError {
  opacity: 0.9;
  position: absolute;
  width: 97%;
  margin-left: -1%;
  margin-top: 2em;
  z-index: 2;
}
</style>