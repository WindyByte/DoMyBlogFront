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
  background-color: #d19d5d;
  color: bisque;
  padding: 1em;
  text-align: center;
}
nav a {
  color: #0b0808;
  margin: 0 1em;
  text-decoration: none;
}
</style>
<script setup lang="ts">
</script>