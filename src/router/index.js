import Vue from 'vue'
import VueRouter from 'vue-router'
import Announcements from '../views/Announcements.vue'
import AnnouncementNewPage from '../views/AnnouncementsNewPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Announcements
  },
  {
    path: '/new',
    name: 'AnnouncementNewPage',
    component: AnnouncementNewPage,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AnnouncementsNewPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
