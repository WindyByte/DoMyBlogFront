<template>
  <div>
    <h1>Welcome to My Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['posts']),
  },
  methods: {
    ...mapActions(['fetchPosts']),
  },
  created() {
    this.fetchPosts();
  },
};
</script>
