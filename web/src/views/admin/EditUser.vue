<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { Form as AForm, FormItem as AFormItem, Input as AInput, Button as AButton } from 'ant-design-vue';

const route = useRoute();
const router = useRouter();
const user = ref({});

const fetchUser = async () => {
  try {
    const { data } = await axios.get(`/api/users/${route.params.id}`);
    console.log(data);
    user.value = data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    // 处理错误，例如显示错误信息或重定向
  }
}

const handleSubmit = async () => {
  try {
    await axios.put(`/api/users/${user.value.id}`, user.value);
    alert('用户信息已更新');
    router.push('/admin/user');
  } catch (error) {
    console.error('Failed to update user:', error);
    // 处理错误，例如显示错误信息
  }
}

onMounted(() => {
  console.log(route.params.id);
  fetchUser();
});
</script>

<template>
  <div>
    <h1>编辑用户信息</h1>
    <a-form
      :model="user"
      @submit.prevent="handleSubmit"
    >
      <a-form-item label="用户名">
        <a-input v-model="user.name" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model="user.email" />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input v-model="user.phone" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
