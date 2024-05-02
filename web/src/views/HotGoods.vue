<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const goods = ref([])

onMounted(async () => {
  const { data } = await axios.get('/api/goods/byHot')
  goods.value = data
})
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
      </tr>
    </thead>
    <tbody>
      <tr v-for="(o, index) in goods" :key="index">
        <td>{{ o.id }}</td>
        <td>{{ o.hot || 0 }}</td>
        <td>{{ o.name }}</td>
        <td>{{ o.price }}$</td>
        <td><img style="width: 200px" :src="`/upload/${o.img}`" alt="hero image" /></td>
      </tr>
    </tbody>
  </table>
</template>
