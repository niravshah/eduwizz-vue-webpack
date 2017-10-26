<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Upload Answer Sheet</h3>
    <div class="row mt">
      <div class="col-md-12">
        <h4>1. Enter Question Paper Id</h4>
        <input id="qid" name="qid" v-model="qid" type="text">
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
        <h4>4. Send</h4>
        <div v-bind:disabled="!isOkToSend" v-on:click="sendAnswerSheets()" class="btn btn-theme"
             style="width: 150px"><i
          class="fa fa-send"></i> Send
        </div>
      </div>
    </div>
    <span id="paperFileSpinner"></span>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Upload',
    data: function () {
      return {
        signedUrl: '',
        files: [],
        qid: '',
        okToSend: true
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
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (e) {
              _this.processFile(e.target.result, file.type, res.data.signedData)
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

      processFile: function (dataURL, fileType, signedUrl) {
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

          if (canvas.toBlob) {
            canvas.toBlob(
              function (blob) {
                var dat = {}
                dat['file'] = blob
                dat['url'] = signedUrl
                _this.files.push(dat)
              },
              fileType
            )
          }
        }
        image.onerror = function () {
          alert('There was an error processing your file!')
        }
      },
      sendAnswerSheets: function () {
        console.log('About to send these files to S3:')
        for (var i = 0; i < this.files.length; i++) {
          var dat = this.files[i]
          let data = new FormData()
          data.append('file', dat['file'])
          let signedUrl = dat['url']
          axios.post(signedUrl, data).then(resp => {}).catch(err => { console.log(err) })
        }
      }
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
