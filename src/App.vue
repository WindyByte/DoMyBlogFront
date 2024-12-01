<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/header.vue';
import Footer from './components/footer.vue';

export default {
  components: { Header, Footer },
};
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: Monaco, sans-serif;
}
</style>
