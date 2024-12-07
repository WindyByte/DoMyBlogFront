<template>
  <div class="sidebar">
    <h1>相关文章</h1>
    <ul>
      <li v-for="article in articles" :key="article.articleID">
        <router-link :to="{ path: '/article', query: { articleID: article.articleID } }">
          {{ article.title }}
        </router-link>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="error" class="error">加载失败，请稍后再试。</p>
  </div>
</template>

<script>
import api from "@/api/article.js"
import "@/assets/relate_article.css"

export default {
  data() {
    return {
      articles: [], // 存储博客数据
      loading: false, // 加载状态
      error: false, // 错误状态
    };
  },
  created() {
    this.fetchRelatedArticles();
  },
  methods: {
    // 获取最近的 10 条博客
    async fetchRelatedArticles() {
      this.loading = true;
      this.error = false;
      try {
        const limit = 20;
        const response = await fetch(api.relatedArticleList + `?limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = JSON.parse(await response.text()); // 解析 JSON
        console.log("Parsed JSON:", result);

        // 假设返回格式为 { code: 0, message: "success", data: [] }
        if (result.code === 0 && Array.isArray(result.data)) {
          this.articles = result.data; // 将数据存入 articles
        } else {
          throw new Error(result.message || "Unexpected API response");
        }
      } catch (error) {
        console.error("Failed to fetch recent articles:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>
