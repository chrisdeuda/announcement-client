import Vue from 'vue'
import VueRouter from 'vue-router'
import Announcements from '../views/Announcements.vue'
//import AnnouncementNewPage from '../views/AnnouncementsNewPage.vue'
import AnnouncementsEdit from '@/components/Announcements/AnnouncementEdit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Announcements
  },
  {
    path: '/announcement/new',
    name: 'AnnouncementNewPage',
    component: AnnouncementsEdit,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AnnouncementsNewPage.vue')
  },
  {
    path: '/announcement/edit/:id',
    name: 'AnnouncementEdit',
    component: AnnouncementsEdit,
    props: true,

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
