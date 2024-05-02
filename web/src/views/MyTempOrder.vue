<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const orders = ref([])
const loginUser = localStorage.getItem('loginUser')

onMounted(async () => {
  const { data } = await axios.get('/api/temp-orders')
  orders.value = data.filter((item) => item.userName === loginUser)
})

const totalPrice = computed(() => {
  return orders.value.reduce((total, o) => total + Number(o.price), 0)
})

const handleSubmit = async () => {
  const details = encodeURIComponent(JSON.stringify(orders.value))
  await axios.post(
    `api/orders/submit?details=${details}&price=${totalPrice.value}&userName=${loginUser}`
  )
  alert(`下单成功`)
  router.push('/myOrder')
}
</script>

<template>
  <table class="layui-table" lay-filter="mylist" lay-size="lg">
    <thead>
      <tr>
        <th lay-data="{field:'xh', align:'center',width:160}">序号</th>
        <th lay-data="{field:'pd',align:'center', minWidth:100}">商品名称</th>
        <th lay-data="{field:'www',align:'center',minWidth:100}">价格</th>
        <th lay-data="{field:'www',align:'center',minWidth:100}">用户名</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(o, index) in orders" :key="index">
        <td>{{ o.id }}</td>
        <td>{{ o.goodName }}</td>
        <td>{{ o.price }}$</td>
        <td>{{ o.userName }}</td>
      </tr>
    </tbody>
  </table>
  <div class="cf-column col-md-12 submit-column">
    总价：<span style="font-size: 18px"> {{ totalPrice }}$ </span>
    <button
      type="submit"
      id="btn submit-btn btn-primary"
      class="submit-button"
      style="float: right"
      @click="handleSubmit"
    >
      下单
    </button>
  </div>
</template>
