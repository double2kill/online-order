<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'

const loginUser = localStorage.getItem('loginUser')
const formState = reactive({
  name: '',
  address: '',
  mobilePhone: '',
  sex: ''
})

onMounted(async () => {
  const { data } = await axios.get(`/api/findUser?name=${loginUser}`)
  const currentUser = data
  if (!currentUser) {
    return
  }

  formState.name = currentUser.name
  formState.address = currentUser.address
  formState.mobilePhone = currentUser.mobilePhone
  formState.sex = currentUser.sex
})

const onFinish = async (values) => {
  await axios.post(
    `/api/users/edit?userName=${loginUser}&name=${values.name}&address=${values.address}&mobilePhone=${values.mobilePhone}&sex=${values.sex}`
  )
  alert('修改成功')
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入用户名!' }]">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="地址" name="address" :rules="[{ required: true, message: '请输入地址!' }]">
      <a-input v-model:value="formState.address" />
    </a-form-item>
    <a-form-item
      label="手机号"
      name="mobilePhone"
      :rules="[{ required: true, message: '请输入手机号!' }]"
    >
      <a-input v-model:value="formState.mobilePhone" />
    </a-form-item>
    <a-form-item label="性别" name="sex" :rules="[{ required: true, message: '请输入性别!' }]">
      <a-radio-group v-model:value="formState.sex">
        <a-radio value="男">男</a-radio>
        <a-radio value="女">女</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
