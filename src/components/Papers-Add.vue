<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Add a New Paper</h3>
    <div class="row mt">
      <div class="col-lg-12">
        <div class="form-panel">
          <form class="form-horizontal style-form" novalidate>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Name</label>
              <div class="col-sm-6">
                <input name="name" v-model="name" type="text" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Description</label>
              <div class="col-sm-6">
                <input name="description" v-model="description" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Subject</label>
              <div class="col-sm-6">
                <label class="checkbox-inline">
                  <input type="radio" id="maths" name="subject" v-model="subject" value="maths"> Maths
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="physics" name="subject" v-model="subject" value="physics"> Physics
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="chemistry" name="subject" v-model="subject" value="chemistry"> Chemistry
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="biology" name="subject" v-model="subject" value="biology"> Biology
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Upload File</label>
              <div class="col-sm-6">
                <input type="file" name="paperFile" >
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button v-bind:disabled="!isValid" v-on:click.prevent="submit()" class="btn btn-theme">Save
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
  // import axios from 'axios'
  export default {
    name: 'AddPaper',
    data: function () {
      return {
        name: '',
        description: '',
        subject: ''
      }
    },
    computed: {
      isValid: function () {
        return !this.errors.any() &&
          this.name !== ''
      }
    },
    methods: {
      submit: function () {
        var url = '/api/admin/users'
        var body = {
          name: this.name,
          subject: this.subject,
          description: this.description
        }

        console.log(url, body)

//        axios.post(url, body).then(res => {
//          console.log('Response', res)
//          this.$router.push('/admin/papers')
//        }).catch(err => {
//          console.log('Error', err)
//        })
      }
    }
  }
</script>
<style></style>
