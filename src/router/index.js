import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Math from '@/components/Math'
import Physics from '@/components/Physics'
import Biology from '@/components/Biology'
import Chemistry from '@/components/Chemistry'
import Download from '@/components/Download'
import Users from '@/components/Users'
import AddUser from '@/components/User-Add'
import Error from '@/components/Error'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {auth: true},
      children: [
        {path: '', name: 'Home', component: Dashboard, meta: {auth: true}},
        {
          path: '/maths',
          component: Math,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasMathsPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/physics',
          component: Physics,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasPhysicsPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/biology',
          component: Biology,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasBiologyPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/chemistry',
          component: Chemistry,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasChemistryPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {path: '/download', component: Download, metas: {auth: true}},
        {
          path: '/admin/users',
          component: Users,
          name: 'Users',
          metas: {auth: false},
          beforeEnter: (to, from, next) => {
            if (Vue.hasCAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/users/add',
          component: AddUser,
          name: 'AddUser',
          meta: {auth: false},
          beforeEnter: (to, from, next) => {
            if (Vue.hasCAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/error', component: Error, metas: {auth: false}
        }
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
