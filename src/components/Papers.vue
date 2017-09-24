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
                <th>Subject</th>
                <th>Description</th>
                <th>Download Link</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="paper in papers">
                <td data-title="name">{{paper.name}}</td>
                <td data-title="subject">{{paper.subject}}</td>
                <td data-title="description">{{paper.description}}</td>
                <td data-title="link">{{paper.key}}</td>
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
