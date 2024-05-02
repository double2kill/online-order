<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' // 导入 useRouter 来使用编程式导航

const users = ref([])
const router = useRouter() // 使用 useRouter

const refresh = async () => {
  const { data } = await axios.get('/api/users')
  users.value = data
}

onMounted(() => {
  refresh()
})

const deleteUser = async (id) => {
  await axios.post(`/api/users/delete?id=${id}`)
  refresh()
  alert('删除成功')
}

// 添加编辑用户的方法
const editUser = (id) => {
  router.push({ name: 'editUser', params: { id } })
}
</script>

<template>
  <table class="layui-table" lay-filter="mylist" lay-size="lg">
    <thead>
    <tr>
      <th>序号</th>
      <th>用户名</th>
      <th>密码</th>
      <th>手机号</th>
      <th>地址</th>
      <th>性别</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(o, index) in users" :key="index">
      <td>{{ o.id }}</td>
      <td>{{ o.name }}</td>
      <td>{{ o.password }}</td>
      <td>{{ o.mobilePhone }}</td>
      <td>{{ o.address }}</td>
      <td>{{ o.sex }}</td>
      <td>
        <!-- 添加编辑按钮 -->
        <a-button type="primary" @click="editUser(o.id)">编辑</a-button>
        <!-- 保持删除按钮 -->
        <a-button type="danger" @click="deleteUser(o.id)">删除</a-button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

