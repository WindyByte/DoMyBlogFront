<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/articleView">Article</router-link>
      <router-link to="/animation">Animation</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<style>
header {
  font-size: 20px;
  background-color: #d19d5d;
  color: bisque;
  padding: 1em 0; /* 上下 1em，左右 0 */
  text-align: center;
  width: 100%; /* 宽度占满 */
}
nav a {
  color: #3e3e3e;
  margin: 0 1em;
  text-decoration: none;
}
</style>
<script setup lang="ts">
</script>