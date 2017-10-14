<template>
  <div class="row h100">
    <div class="col-lg-9 main-chart">
      <div class="row mt">
        <div class="col-md-4 col-sm-4 mb">
          <a href="#/upload">
            <div class="darkblue-panel pn">
              <div class="darkblue-header">
                <h5>UPLOAD ANSWER SHEET</h5>
              </div>
              <div class="mt mb text-center">
                <img src="/static/img/answer-sheet.png">
              </div>
              <footer>
                <div class="centered">
                  <h5><i class="fa fa-file-text-o"></i> {{counts.maths}} Papers</h5>
                </div>
              </footer>
            </div>
          </a>
        </div>


        <div class="col-md-4 col-sm-4 mb">
          <a href="#/results">
            <div class="darkblue-panel pn">
              <div class="darkblue-header">
                <h5>VIEW RESULTS</h5>
              </div>
              <div class="mt mb text-center">
                <img src="/static/img/results.png">
              </div>
              <footer>
                <div class="centered">
                  <h5><i class="fa fa-file-text-o"></i> {{counts.maths}} Papers</h5>
                </div>
              </footer>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="col-lg-3 ds h100">
      <div class="desc">
        <div class="thumb">
          <img class="img-circle" src="/static/img/owl_48_48.png" width="45px" height="45px" align="">
        </div>
        <div class="details">
          <p>
            <muted>18 Hours Ago</muted><br/>
            <a href="#">DIVYA MANIAN</a>
            answered Maths Numbers 1 paper
          </p>
        </div>
      </div>

    </div><!-- /col-lg-3 -->
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    name: 'NewDashboard',
    data: function () {
      return {
        counts: {
          maths: 0,
          physics: 0,
          chemistry: 0,
          biology: 0
        }
      }
    },
    created: function () {
      var url = '/api/admin/papers/count'
      axios.get(url).then(res => {
        this.counts = res.data.count
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      hasMathsPerm: function () {
        return Vue.hasMathsPerm()
      },
      hasPhysicsPerm: function () {
        return Vue.hasPhysicsPerm()
      },
      hasChemistryPerm: function () {
        return Vue.hasChemistryPerm()
      },
      hasBiologyPerm: function () {
        return Vue.hasBiologyPerm()
      }
    }
  }
</script>
<style>
  .ds .thumb {
    width: 50px;
    margin: 0 10px 0 10px;
    display: block;
    float: left;
  }
</style>
