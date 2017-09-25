<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Delete User</h3>
    <div class="row mt">
      <div class="col-lg-12">

        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Name</label>
          <div class="col-sm-6">
            <p>{{user.name}}</p>
          </div>
        </div>

        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Username</label>
          <div class="col-sm-6">
            <p>{{user.username}}</p>
          </div>
        </div>
        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">User Email</label>
          <div class="col-sm-6">
            <p>{{user.email}}</p>
          </div>
        </div>
        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Permissions</label>
          <div class="col-sm-6">
            <label class="checkbox-inline">
              <input type="checkbox" id="maths" disabled="disabled" name="maths" v-model="user.permissions.maths"> Maths
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" id="physics" disabled="disabled" name="physics" v-model="user.permissions.physics"> Physics
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" id="chemistry" disabled="disabled" name="chemistry" v-model="user.permissions.chemistry"> Chemistry
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" id="biology" disabled="disabled" name="biology" v-model="user.permissions.biology"> Biology
            </label>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    name: 'User-Delete',
    data: function () {
      return {
        user: ''
      }
    },
    created: function () {
      var url = '/api/admin/user/' + this.$route.query.sid
      axios.get(url).then(res => {
        this.user = res.data.user
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style></style>
