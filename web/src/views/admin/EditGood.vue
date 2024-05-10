<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import {
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Button as AButton }
  from 'ant-design-vue'

const route = useRoute()
const router = useRouter()
const good = ref({})

const fetchGood = async () => {
  try {
    const { data } = await axios.get(`/api/goods/${route.params.id}`)
    console.log(data)
    good.value = data
  } catch (error) {
    console.error('Failed to fetch user:', error)
    // 处理错误，例如显示错误信息或重定向
  }
}

const handleSubmit = async () => {
  try {
    await axios.put(`/api/goods/${good.value.id}`, good.value)
    alert('美食信息已更新')
    router.push('/admin/good')
  } catch (error) {
    console.error('Failed to update good:', error)
    // 处理错误，例如显示错误信息
  }
}


onMounted(() => {
  console.log(route.params.id)
  fetchGood()
})
</script>

<template>
  <div>
    <h1>编辑美食信息</h1>
    <a-form :model="good" @submit.prevent="handleSubmit">
      <a-form-item label="商品名称">
        <a-input v-model:value="good.name" />
      </a-form-item>
      <a-form-item label="商品价格">
        <a-input v-model:value="good.price" />
      </a-form-item>
      <a-form-item label="人气值">
        <a-input v-model:value="good.hot" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>


