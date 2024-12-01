<template>
  <div class="main-pages">
    <h2>Response Details</h2>
    <div class="content">
      <strong>Article Content: </strong> {{post}}
    </div>
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <relatedArticles />
    </aside>
<!--    <button @click="postArticle">ssss</button>-->
  </div>
</template>

<script>
import relatedArticles from '@/components/relate_article.vue';

export default {
  components: {
    relatedArticles,
  },
  data() {
    return {
      post: {}, // 存储文章内容
    };
  },
  methods: {
    async postArticle() {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/article/ping');
        this.post = await response.json();
      } catch (error) {
        console.error("Fetch error:", error);
        this.post = { code: -1, message: "Error occurred", data: "xxx" };
      }
    }
  }
};
</script>

<style>
.main-pages {
  display: flex;
  gap: 20px;
}
.main-pages .content {
  flex: 3; /* 主内容占比 3 */
  padding: 1em;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.sidebar {
  flex: 1; /* 侧边栏占比 1 */
}
</style>W