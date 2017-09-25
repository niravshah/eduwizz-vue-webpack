<template>
  <div>
    <div class="row mt">
      <div class="col-md-12">
        <h1>Download</h1>
      </div>
    </div>
    <div clas="row">
      <div clas="col-md-12">
        <a v-bind:disabled="!isValid" v-bind:href="downloadUrl">Click this Link to Download</a>
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
      var headers = {'Authorization': 'JWT ' + localStorage.getItem('token')}
      axios.get('/api/aws/sign/get?key=' + this.$route.query.key, {headers: headers}).then(res => {
        this.downloadUrl = res.data.url
      }).catch(e => {
        this.$router.push('/error?status=' + e.response.status + '&message=' + e.response.data.message)
      })
    }
  }
</script>
<style></style>
