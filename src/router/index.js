import { createRouter, createWebHashHistory } from 'vue-router'
import RollCall from "@/components/RollCall";

const routes = [
  {path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')},
  {path: '/',name: 'rollcall', component: RollCall}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
