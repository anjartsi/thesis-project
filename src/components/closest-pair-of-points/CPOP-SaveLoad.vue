<template lang='pug'>
div
  //- SAVE 
  nice-modal(:id='saveId')
    h4(slot='title') Save Instance as Text
    h4
      a.btn.btn-primary(
        :href='"data:text/plain;charset=utf-8,"+ encodeURIComponent(getInstanceAsText())'
        download='closest-pair-of-points-instance.txt'
        ) Download Text File
    h5 Or copy the following text
    textarea.saveText(
      readonly
      :rows='12' 
      :cols='40' 
    ) {{getInstanceAsText()}}
  //- LOAD 
  nice-modal(:id='loadId')
    h4(slot='title') Load Instance from File
    div.row
      div.col-xs-6
        div#rules
          h3 Rules
          ul.text-left
            li NUMBERS ONLY
            li Write each point on a new line
              ul 
                li the number of points will be automatically detected
            li Each line should have two integers separated by one or more spaces
              ul
                li Maximum number of points is {{problemSize.max}}. Any points after that will be ignored.
                li The first integer will be the x-coordinate
                li The second integer will be the y-coordinate
                li Points must be in the range [{{valueRange.min}}, {{valueRange.max}}]
            li Any lines that don't meet the above criteria will be ignored
            li Any empty lines will be ignored
      div.col-xs-6
        div.row
          h5 Paste your Instance Text here
          textarea(
            :rows='12'
            :cols='40' 
            v-model='loadInput'
            :placeholder='getInstanceAsText()'
          )
        div.row
          h5 Or Upload a File
          form(enctype="multipart/form-data" novalidate)
            div.dropbox
              label#fileInputLabel(for='fileInput').btn.btn-lg.btn-primary Choose a File
              input.input-file#fileInput(
                @change='readFile'
                type="file" 
                accept=".txt"
              )
              //- label(for='fileInput') Or Choose a file
        br
        div.row
          div.col-xs-11
           
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
      @click='$store.commit("closestPairOfPoints/loadStart")'
    )
      span(aria-hidden='true') &times;
    h4 Error while loading file
    h5(v-for='msg in loadMessage') {{msg}}
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceModal from '../nice-things/Nice-Modal';

const { mapState, mapGetters } = createNamespacedHelpers('closestPairOfPoints');

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
    ...mapState([
      'points',
      'loadError',
      'loadMessage',
      'valueRange',
      'problemSize',
    ]),
    ...mapGetters({
      locked: 'editing',
    }),
  },
  methods: {
    getInstanceAsText() {
      let str = '';
      this.points.forEach(element => {
        str += `${element.x} ${element.y}\n`;
      });
      return str;
    },
    loadFile() {
      if (!this.$store.getters['closestPairOfPoints/editing']) this.$store.dispatch('closestPairOfPoints/switchMode');
      this.$store.dispatch('closestPairOfPoints/loadFile', { loadText: this.loadInput });
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
#fileInput {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

#loadError {
  opacity: 0.9;
  position: absolute;
  width: 97%;
  height: 400px;;
  margin-left: -1%;
  margin-top: 2em;
  z-index: 2;
}

#rules {
  background-color: #eeeeee;
  border: 1px solid black;
  border-radius: 10px;
}

#rules h3 {
  margin-left: 0.5em;
}

.saveText {
  background-color: #DDD;
}
#loadError {
  width: 800px;
  margin-left: 112px;
}
</style>