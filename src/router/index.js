import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Math from '@/components/Math'
import Download from '@/components/Download'
import Users from '@/components/Users'
import AddUser from '@/components/User-Add'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {auth: true},
      children: [
        {path: '', name: 'Home', component: Dashboard, meta: {auth: true}},
        {path: '/maths', component: Math, meta: {auth: true}},
        {path: '/download', component: Download, metas: {auth: true}},
        {path: '/admin/users', component: Users, name: 'Users', metas: {auth: false, admin: true}},
        {path: '/admin/users/add', component: AddUser, name: 'AddUser', meta: {auth: false, admin: true}}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {auth: false}
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.meta.auth && !Vue.isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

export default router
