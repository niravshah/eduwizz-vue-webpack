<template>
  <div>

    <div v-if="users.length > 0" class="row mt">
      <div class="col-lg-12">
        <div class="content-panel">
          <h4><i class="fa fa-angle-right"></i> Current Users</h4>
          <section id="no-more-tables">
            <table class="table table-bordered table-striped table-condensed cf">
              <thead class="cf">
              <tr>
                <th>Username</th>
                <th>Active</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in users">
                <td data-title="username">{{user.username}}</td>
                <td data-title="active">{{user.active}}</td>
              </tr>

              </tbody>
            </table>
          </section>
        </div><!-- /content-panel -->
      </div><!-- /col-lg-12 -->
    </div><!-- /row -->


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
        users: [],
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
    created: function () {
      var url = '/api/admin/users'
      axios.get(url).then(res => {
        console.log(res)
        this.users = res.data.users
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      submit: function () {
        var url = '/api/admin/users'
        var body = {username: this.username, password: this.password, email: this.email}
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
