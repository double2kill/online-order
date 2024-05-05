<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { Form as AForm, FormItem as AFormItem, Input as AInput, InputNumber as AInputNumber, Button as AButton } from 'ant-design-vue';
const { TextArea } = AInput;


const route = useRoute();
const router = useRouter();
const good = ref({});

const fetchGood = async () => {
  const { data } = await axios.get(`/api/goods/${route.params.id}`);
  good.value = data;
}

const handleSubmit = async () => {
  await axios.put(`/api/goods/${good.value.id}`, good.value);
  alert('美食信息已更新');
  router.push('/admin/good');
}

onMounted(() => {
  fetchGood();
});
</script>

<template>
  <div>
    <h1>编辑美食信息</h1>
    <a-form
      :model="good"
      @submit="handleSubmit"
    >
      <a-form-item label="名称">
        <a-input v-model="good.name" />
      </a-form-item>
      <a-form-item label="人气">
        <a-input v-model="good.hot" />
      </a-form-item>
      <a-form-item label="价格">
        <a-input-number v-model="good.price" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>


