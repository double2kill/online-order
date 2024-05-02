<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()

const formState = reactive({
  username: '',
  password: ''
})
const onFinish = async (values) => {
  const { username, password } = formState
  const { data } = await axios.get(`/api/findUser?name=${username}`)
  const currentUser = data
  if (!currentUser) {
    alert('用户不存在或密码错误')
    return
  }
  if (password !== currentUser.password) {
    alert('用户不存在或密码错误')
    return
  }
  localStorage.setItem('loginUser', username)
  router.push(username === 'admin' ? 'admin/user' : '/')
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const handleRegister = () => {
  router.push('/register')
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
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请输入用户名!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <a-space>
        <a-button type="primary" html-type="submit">登录</a-button>
        <a-button @click="handleRegister">注册</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
