<template lang='pug'>
div.modal.fade(
  role='dialog'
  aria-labelledby='name'
  tabindex="-1"
  backdrop='static'
  )
  div.modal-dialog.modal-lg(role='document')
    div.modal-content
      div.modal-header
        button.close(type='button' data-dismiss='modal' aria-label='Close')
          <span aria-hidden='true'>&times;</span>
        h4.modal-title(id='name') 
          slot(name='title') Title text
      div.modal-body
        slot Body Text
      div.modal-footer
        div.row
          div.col-xs-10
            slot(name='buttons')
          div.col-xs-2
            button.btn.btn-default(type='button' data-dismiss='modal') Close
</template>

<script>
  export default {
    props: [
      'name', 'body',
    ],
  };
</script>

<style scoped>
  
</style>