<script setup>
import { ref, watch, h } from 'vue'

import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
const router = useRouter()

const current = ref(['home'])

watch(router.currentRoute, (value) => {
  current.value = [value.name]
  const loginUser = ref(localStorage.getItem('loginUser'))
  items.value =
    loginUser.value === 'admin'
      ? [
          {
            key: 'adminUser',
            label: h(RouterLink, { to: '/admin/user' }, '用户列表'),
            title: '用户列表'
          },
          {
            key: 'adminGood',
            label: h(RouterLink, { to: '/admin/good' }, '商品列表'),
            title: '商品列表'
          }
        ]
      : [
          {
            key: 'home',
            label: h(RouterLink, { to: '/' }, '首页'),
            title: '首页'
          },
          {
            key: 'hotGoods',
            label: h(RouterLink, { to: '/hotGoods' }, '排行榜'),
            title: '排行榜'
          },
          {
            key: 'myTempOrder',
            label: h(RouterLink, { to: '/myTempOrder' }, '购物车'),
            title: '购物车'
          },
          {
            key: 'myOrder',
            label: h(RouterLink, { to: '/myOrder' }, '我的订单'),
            title: '我的订单'
          },
          {
            key: 'myInfo',
            label: h(RouterLink, { to: '/myInfo' }, '我的信息'),
            title: '我的信息'
          }
        ]
})

const items = ref([])
const handleChange = (value) => {
  console.log(value)
}
const logout = () => {
  localStorage.removeItem('loginUser')
  router.push('/login')
}
</script>

<template>
  <div
    v-if="!['login', 'register'].includes(current[0])"
    style="display: flex; justify-content: space-between; border-bottom: 1px solid #eeeeee"
  >
    <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      :items="items"
      :openChange="handleChange"
    />
    <a-button style="float: right" type="link" size="large" @click="logout">登出</a-button>
  </div>
</template>
