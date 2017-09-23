<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Current Papers</h3>
    <a href="#/admin/papers/add">Add Paper</a>
    <div v-if="papers.length > 0" class="row mt">
      <div class="col-lg-12">
        <div class="content-panel">
          <section id="no-more-tables">
            <table class="table table-bordered table-striped table-condensed cf">
              <thead class="cf">
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Active</th>
                <th>Maths</th>
                <th>Physics</th>
                <th>Chemistry</th>
                <th>Biology</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in users">
                <td data-title="name">{{user.name}}</td>
                <td data-title="username">{{user.username}}</td>
                <td data-title="active">{{user.active}}</td>
                <td data-title="maths">{{user.permissions.maths}}</td>
                <td data-title="physics">{{user.permissions.physics}}</td>
                <td data-title="chemistry">{{user.permissions.chemistry}}</td>
                <td data-title="biology">{{user.permissions.biology}}</td>
              </tr>

              </tbody>
            </table>
          </section>
        </div><!-- /content-panel -->
      </div><!-- /col-lg-12 -->
    </div><!-- /row -->
  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Papers',
    data: function () {
      return {
        papers: []
      }
    },
    created: function () {
      var url = '/api/admin/papers'
      axios.get(url).then(res => {
        this.papers = res.data.papers
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style></style>
