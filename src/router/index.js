import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
import Announcements from '../views/Announcements.vue'
import Login from "@/views/Login";
//import AnnouncementNewPage from '../views/AnnouncementsNewPage.vue'
import AnnouncementsEdit from '@/components/Announcements/AnnouncementEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Announcements,
    meta: {requiresAuth: true},
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true,
    meta: { guest: true },
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
