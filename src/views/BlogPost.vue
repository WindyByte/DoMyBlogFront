<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  async created() {
    const id = this.$route.params.id;
    const response = await fetch(`http://127.0.0.1:8080/api/v1/login/ping`);
    this.post = await response.json();
  },
};
</script>
