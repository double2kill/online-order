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
    },
    {
      path: '/admin/user/edit/:id', // 新增的编辑用户信息的路由
      name: 'editUser',
      component: () => import('../views/admin/EditUser.vue'),
      props: true
    },
    {
      path: '/admin/good/edit/:id', // 新增的编辑美食信息的路由
      name: 'editGood',
      component: () => import('../views/admin/EditGood.vue'),
      props: true
    }
  ]
})

export default router
