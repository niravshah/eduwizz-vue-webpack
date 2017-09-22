<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Add a New User</h3>
    <div class="row mt">
      <div class="col-lg-12">
        <div class="form-panel">
          <form class="form-horizontal style-form" novalidate>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Name</label>
              <div class="col-sm-6">
                <input name="username" v-model="username" type="text" class="form-control">
              </div>
            </div>
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
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">User Email</label>
              <div class="col-sm-6">
                <input name="email" v-model="email" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <button v-bind:disabled="!isValid" v-on:click.prevent="submit()" class="btn btn-theme">Sign Up
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
    name: 'Users',
    data: function () {
      return {
        username: '',
        password: '',
        rPassword: '',
        email: ''
      }
    },
    computed: {
      isValid: function () {
        return !this.errors.any() &&
          this.username !== '' &&
          this.password !== '' &&
          this.rPassword !== '' &&
          this.email !== '' &&
          this.password === this.rPassword
      }
    },
    methods: {
      submit: function () {
        var url = '/api/auth/login'
        var body = {username: this.username, password: this.password, email: this.email}
        axios.post(url, body).then(res => {}).catch(e => {})
      }
    }
  }
</script>
<style></style>
