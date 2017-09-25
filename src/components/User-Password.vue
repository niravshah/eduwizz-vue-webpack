<template>
  <div>
    <h3><i class="fa fa-angle-right"></i>User Reset Password</h3>
    <div class="row mt">
      <div class="col-lg-12">
        <div class="form-panel">
          <form class="form-horizontal style-form" novalidate>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Password</label>
              <div class="col-sm-6">
                <input name="password" v-model="password" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Repeat Password</label>
              <div class="col-sm-6">
                <input name="rPassword" v-model="rPassword" type="text" class="form-control">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button v-bind:disabled="!isValid" v-on:click.prevent="submit()" class="btn btn-theme">Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import axios from 'axios'

  export default {
    name: 'User-Password',
    data: function () {
      return {
        password: '',
        rPassword: ''
      }
    },
    computed: {
      isValid: function () {
        return !this.errors.any() &&
          this.password !== '' &&
          this.rPassword !== ''
      }
    },
    methods: {
      submit: function () {
        var url = '/api/admin/user/' + this.$route.query.sid + '/reset'
        var body = {
          password: this.password
        }
        axios.post(url, body).then(res => {
          console.log('Response', res)
        }).catch(err => {
          console.log('Error', err)
        })
      }
    }
  }
</script>
<style></style>
