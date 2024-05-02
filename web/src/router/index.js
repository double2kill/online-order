import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hotGoods',
      name: 'hotGoods',
      component: () => import('../views/HotGoods.vue')
    },
    {
      path: '/myTempOrder',
      name: 'myTempOrder',
      component: () => import('../views/MyTempOrder.vue')
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('../views/MyOrder.vue')
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: () => import('../views/MyInfo.vue')
    },
    {
      path: '/admin/user',
      name: 'adminUser',
      component: () => import('../views/admin/User.vue')
    },
    {
      path: '/admin/good',
      name: 'adminGood',
      component: () => import('../views/admin/Good.vue')
    }
  ]
})

export default router
