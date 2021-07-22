import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import HostDetection from '../views/HostDetection.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/host-detection',
    name: 'HostDetection',
    component: HostDetection
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
