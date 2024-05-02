<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue'
import Footer from './components/Footer.vue'
import Top from './components/Top.vue'
import axios from 'axios'

const goods = ref([])

onMounted(async () => {
  const { data } = await axios.get('/order/goods')
  goods.value = data
})
</script>

<template>
  <!-- <Top /> -->
  <div class="hero-area slider-navigation-1">
    <div
      v-for="(n, index) in goods"
      :key="index"
      class="single-hero-item bg-grey d-flex align-items-center"
    >
      <div class="container">
        <div class="hero-item-inner">
          <div class="row align-items-center justify-content-center">
            <div class="col-xl-6 col-lg-7 col-md-7 col-12 order-2 order-md-1">
              <div class="hero-content">
                <h1><span></span>{{ n.name }}</h1>
                <h1><span></span>${{ n.price }}</h1>

                <a :href="`showNews.do?id=${n.id}`" class="sf-button">
                  <span>下单</span>
                </a>
              </div>
            </div>
            <div class="col-xl-6 col-lg-5 col-md-5 col-sm-6 order-1 order-md-2 align-self-end">
              <div class="hero-image">
                <img :src="`/upload/${n.img}`" alt="hero image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <Footer /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
