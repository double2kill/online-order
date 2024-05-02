<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])

const loginUser = localStorage.getItem('loginUser')
onMounted(async () => {
  const { data } = await axios.get('/api/orders')
  orders.value = data
    .map((item) => {
      return {
        ...item,
        details: item.details && JSON.parse(item.details)
      }
    })
    .filter((o) => o.userName === loginUser)
})
</script>

<template>
  <table class="layui-table" lay-filter="mylist" lay-size="lg">
    <thead>
      <tr>
        <th lay-data="{field:'xh', align:'center',width:160}">序号</th>
        <th lay-data="{field:'pd',align:'center', minWidth:100}">商品详情</th>
        <th lay-data="{field:'www',align:'center',minWidth:100}">总价</th>
        <th lay-data="{field:'www',align:'center',minWidth:100}">用户名</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(o, index) in orders" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          <template v-if="o.details">
            <div v-for="(d, index) in o.details" :key="index">{{ d.goodName }} {{ d.price }}$</div>
          </template>
        </td>
        <td>{{ o.price }}$</td>
        <td>{{ o.userName }}</td>
      </tr>
    </tbody>
  </table>
</template>
