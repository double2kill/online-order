<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const goods = ref([])

const refresh = async () => {
  const { data } = await axios.get('/api/goods')
  goods.value = data
}

onMounted(() => {
  refresh()
})

const deleteGood = async (id) => {
  await axios.post(`/api/goods/delete?id=${id}`)
  refresh()
  alert('删除成功')
}
</script>

<template>
  <table class="layui-table" lay-filter="mylist" lay-size="lg">
    <thead>
      <tr>
        <th>序号</th>
        <th>人气</th>
        <th>商品名称</th>
        <th>总价</th>
        <th>图片</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(o, index) in goods" :key="index">
        <td>{{ o.id }}</td>
        <td>{{ o.hot || 0 }}</td>
        <td>{{ o.name }}</td>
        <td>{{ o.price }}$</td>
        <td><img style="width: 200px" :src="`/upload/${o.img}`" alt="hero image" /></td>
        <td><a-button type="primary" danger @click="deleteGood(o.id)">删除</a-button></td>
      </tr>
    </tbody>
  </table>
</template>
