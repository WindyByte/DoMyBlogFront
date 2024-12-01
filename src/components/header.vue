<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/post">Blog</router-link>
      <router-link to="/animation">Animation</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<style>
header {
  background-color: #333;
  color: bisque;
  padding: 1em;
  text-align: center;
}
nav a {
  color: bisque;
  margin: 0 1em;
  text-decoration: none;
}
</style>
<script setup lang="ts">
</script>