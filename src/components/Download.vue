<template>
  <div>
    <div class="row mt">
      <div class="col-md-12">
        <h1>Download</h1>
      </div>
    </div>
    <div clas="row">
      <div clas="col-md-12">
        <a v-bind:disabled="!isValid" v-bind:href="downloadUrl">Download Now</a>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Download',
    data: function () {
      return {
        downloadUrl: '#'
      }
    },
    computed: {
      isValid: function () {
        return false
      }
    },
    created: function () {
      axios.get('/api/aws/links?key=' + this.$route.query.key).then(res => {
        this.downloadUrl = res.data.url
      }).catch(e => {})
    }
  }
</script>
<style></style>
