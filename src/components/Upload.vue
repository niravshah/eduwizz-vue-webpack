<template>
  <div>
    <div class="row mt">
      <div class="col-md-12">
        <h1>Upload Answer Sheets</h1>
      </div>
    </div>
    <div clas="row">
      <div clas="col-md-12">
        <input v-on:change="getSignedUrl()" type="file" name="paperFile" id="paperFile">
        <span id="paperFileSpinner"></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Upload',
    data: function () {
      return {
        signedUrl: ''
      }
    },
    methods: {
      getSignedUrl: function () {
        const files = document.getElementById('paperFile').files
        const file = files[0]

        // eslint-disable-next-line no-undef
        Quagga.decodeSingle({
          decoder: {
            readers: ['code_128_reader'] // List of active readers
          },
          locate: true, // try to locate the barcode in the image
          src: file
        }, function (result) {
          if (result.codeResult) {
            console.log('result', result.codeResult.code)
          } else {
            console.log('not detected')
          }
        })
      }
    }
  }
</script>
<style></style>
