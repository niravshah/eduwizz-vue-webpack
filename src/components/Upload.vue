<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Upload Answer Sheet</h3>
    <div v-if="uploadErrors.length != 0" class="row">
      <div clas="col-md-12">
        <p v-for="e in uploadErrors">{{e}}</p>
      </div>
    </div>
    <div class="row mt">
      <div class="col-md-12">
        <h4>1. Enter Question Paper Id</h4>
        <input id="qid" name="qid" v-model="qid" type="text" autofocus>
      </div>
    </div>
    <div class="row mt">
      <div class="col-md-12">
        <h4>2. Select Answer Sheets</h4>
        <div v-bind:disabled="!isQidValid" class="btn btn-theme file-preview-input"><span
          class="glyphicon glyphicon-folder-open"></span> <span
          class="file-preview-input-title">Browse</span>
          <input type="file" name="input-file-preview"
                 v-on:change="getSignedUrl($event.target.files)"
                 multiple accept="image/*"/>
        </div>
      </div>
    </div>
    <div class="row mt">
      <div class="col-md-12">
        <h4>3. Preview</h4>
        <div id="previewPane"></div>
      </div>
    </div>
    <div class="row mt">
      <div class="col-md-12">
        <h4>4. Upload</h4>
        <!-- v-bind:disabled="!isOkToSend" -->
        <div class="btn btn-theme"
             style="width: 150px" data-toggle="modal" data-target="#myModal" data-backdrop="static"
             data-keyboard="false"><i
          class="fa fa-cloud-upload"></i> Upload
        </div>
        <span id="saveSpinner"></span>
      </div>
    </div>
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Are you sure?</h4>
          </div>
          <div class="modal-body">
            <p>Some text in the modal.</p>
            <radial-progress-bar :diameter="200"
                                 :completed-steps="completedSteps"
                                 :total-steps="totalSteps"
                                 :startColor="accentColor"
                                 :stopColor="accentColor"
                                 style="margin: auto">
              <p>Total: {{ totalSteps }}</p>
              <p>Completed: {{ completedSteps }}</p>
            </radial-progress-bar>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <div v-on:click="modalSend()" class="btn btn-theme" style="width: 100px"><i class="fa fa-send"></i> Yes
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import RadialProgressBar from 'vue-radial-progress/dist/vue-radial-progress.min.js'

  export default {
    name: 'Upload',
    data: function () {
      return {
        signedUrl: '',
        files: [],
        qid: '',
        okToSend: true,
        uploadErrors: [],
        completedSteps: 2,
        totalSteps: 5,
        accentColor: '#FF4081'
      }
    },
    computed: {
      isQidValid: function () {
        return this.qid !== ''
      },
      isOkToSend: function () {
        return this.okToSend && this.files.length !== 0
      }
    },
    methods: {
      getSignedUrl: function (files) {
        for (var i = 0; i < files.length; i++) {
          const file = files[i]
          const url = '/api/aws/sign/put?name=' + file.name + '&type=' + file.type
          this.okToSend = false
          var _this = this
          axios.get(url).then(res => {
            /* let data = new FormData()
             data.append('file', file)
             axios.put(res.data.signedData, data).then(resp => {}).catch(err => {
             console.log(err)
             }) */
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (e) {
              _this.processFile(e.target.result, file.type, res.data.signedData, file.name)
              var img = document.createElement('img')
              img.src = e.target.result
              var pane = document.getElementById('previewPane')
              pane.insertBefore(img, pane.childNodes[0])
            }
            this.okToSend = true
          }).catch(err => {
            console.log(err)
          })
        }
        console.log(this.files)
      },

      processFile: function (dataURL, fileType, signedUrl, name) {
        var maxWidth = 800
        var maxHeight = 800
        var _this = this

        var image = new Image()
        image.src = dataURL

        image.onload = function () {
          var width = image.width
          var height = image.height
          var shouldResize = (width > maxWidth) || (height > maxHeight)
          if (!shouldResize) {
            var dat = {}
            dat['name'] = name
            dat['file'] = dataURL
            dat['url'] = signedUrl
            _this.files.push(dat)
            return
          }
          var newWidth
          var newHeight
          if (width > height) {
            newHeight = height * (maxWidth / width)
            newWidth = maxWidth
          } else {
            newWidth = width * (maxHeight / height)
            newHeight = maxHeight
          }
          var canvas = document.createElement('canvas')
          canvas.width = newWidth
          canvas.height = newHeight
          var context = canvas.getContext('2d')
          context.drawImage(this, 0, 0, newWidth, newHeight)

          var dataUrl = canvas.toDataURL('image/jpeg')

          /* if (canvas.toBlob) {
           canvas.toBlob(
           function (blob) {
           var dat = {}
           dat['file'] = blob
           dat['url'] = signedUrl
           _this.files.push(dat)
           },
           fileType
           )
           } */
          var resizedImage = _this.dataURLToBlob(dataUrl)
          var dat2 = {}
          dat2['name'] = name
          dat2['file'] = resizedImage
          dat2['url'] = signedUrl
          _this.files.push(dat2)
        }
        image.onerror = function () {
          alert('There was an error processing your file!')
        }
      },
      sendAnswerSheets: function () {
        var _this = this
        _this.$modal.show('hello-world')
        console.log('About to send these files to S3:')

        for (var i = 0; i < this.files.length; i++) {
          var dat = this.files[i]
          // let data = new FormData()
          // data.append('file', dat['file'])
          let signedUrl = dat['url']
          let data = dat['file']
          axios.put(signedUrl, data).then(resp => {
            console.log('received response')
            console.log(resp)
          }).catch(err => {
            // alert('There was an error processing your file!')
            _this.uploadErrors.push(err.message)
            console.log('received error')
            console.log(err)
          })
        }
      },
      dataURLToBlob: function (dataURL) {
        var BASE64_MARKER = ';base64,'
        var parts, contentType, raw
        if (dataURL.indexOf(BASE64_MARKER) === -1) {
          parts = dataURL.split(',')
          contentType = parts[0].split(':')[1]
          raw = parts[1]

          return new Blob([raw], {type: contentType})
        }

        parts = dataURL.split(BASE64_MARKER)
        contentType = parts[0].split(':')[1]
        raw = window.atob(parts[1])
        var rawLength = raw.length

        var uInt8Array = new Uint8Array(rawLength)

        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i)
        }

        return new Blob([uInt8Array], {type: contentType})
      },
      modalSend: function () {
        console.log('Sending Files')
      }
    },
    components: {
      RadialProgressBar
    }
  }
</script>
<style lang="scss">

  $accent-color: #FF4081;

  #previewPane img {
    width: 200px;
    margin: 20px 20px;
  }

  #qid {
    width: 300px;
    height: 30pt;
    border-radius: 4px;
    font-size: 24px;
    text-align: center;
  }

  .file-preview-input {
    position: relative;
    overflow: hidden;
    margin: 0px;
    color: white;
    background-color: $accent-color;
    border-color: #ccc;
    width: 150px;
  }

  .file-preview-input input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
  }

  .file-preview-input-title {
    margin-left: 2px;
  }
</style>
