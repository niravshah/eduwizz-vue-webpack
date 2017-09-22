<template>
  <div id="nns234">
    <header class="header black-bg">
      <div class="sidebar-toggle-box">
        <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
      </div>
      <a href="home.ejs" class="logo"><b>EDUWIZZ</b></a>
      <div class="top-menu">
        <ul class="nav pull-right top-menu">
          <li><a class="home" href="#/">Home</a></li>
          <li><a class="logout" href="login.html">Logout</a></li>
        </ul>
      </div>
    </header>
    <aside>
      <div id="sidebar" class="nav-collapse ">
        <ul class="sidebar-menu" id="nav-accordion">
          <p class="centered">
            <a href="profile.html">
              <img src="/static/img/owl2_128_128.png" class="img-circle" width="60">
            </a>
          </p>
          <h5 class="centered">Marcel Newman</h5>
          <li class="mt">
            <a class="active" href="#/">
              <i class="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li class="sub-menu">
            <a href="javascript:;">
              <i class="fa fa-desktop"></i>
              <span>Admin</span>
            </a>
            <ul class="sub">
              <li><a href="#/admin/users">Users</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
    <section id="main-content">
      <section class="wrapper">
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
