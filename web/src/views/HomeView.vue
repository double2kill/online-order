<script setup>
import { ref, onMounted, computed } from 'vue'

import axios from 'axios'

const loginUser = localStorage.getItem('loginUser')
const search = ref('')

const goods = ref([])

const filteredGoods = computed(() => {
  return goods.value.filter((n) => n.name.includes(search.value))
})

onMounted(async () => {
  const { data } = await axios.get('/api/goods')
  goods.value = data
})

const handleOrder = async (n) => {
  const response = await axios.post(
    `/api/orders/add?username=${loginUser}&goodName=${n.name}&price=${n.price}`
  )
  alert(`添加 ${n.name} 成功`)
  // router.push('/myTempOrder')
}
</script>

<template>
  <div class="hero-area slider-navigation-1">
    <input v-model="search" type="text" placeholder="搜索商品名称" />
    <p v-if="search">搜索: {{ search }}, 共 {{ filteredGoods.length }}个结果</p>
    <div
      v-for="(n, index) in filteredGoods"
      :key="index"
      class="single-hero-item bg-grey d-flex align-items-center"
    >
      <div class="container">
        <div class="hero-item-inner">
          <div class="row align-items-center justify-content-center">
            <div class="col-xl-6 col-lg-7 col-md-7 col-12 order-2 order-md-1">
              <div class="hero-content">
                <h1><span></span>{{ n.name }}</h1>
                <h1><span></span>{{ n.price }}$</h1>
                <a @click="handleOrder(n)" class="sf-button">
                  <span>添加</span>
                </a>
              </div>
            </div>
            <div class="col-xl-6 col-lg-5 col-md-5 col-sm-6 order-1 order-md-2 align-self-end">
              <div class="hero-image">
                <img style="width: 400px" :src="`/upload/${n.img}`" alt="hero image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
