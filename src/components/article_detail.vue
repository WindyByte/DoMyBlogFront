<template>
  <div class="article-detail">
    <h1 v-if="article">文章标题: {{ article.title }}</h1>
    <p v-if="loading">加载中...</p>
    <p v-if="error" class="error">加载失败，请稍后再试。</p>
    <div v-if="!loading && !error" v-html="article.content"></div>
  </div>
</template>

<script>
import api from "@/api/article.js"
export default {
  data() {
    return {
      article: null, // 存储文章数据
      loading: true, // 加载状态
      error: false, // 错误状态
    };
  },
  async created() {
    // 获取查询参数中的 id
    const articleID = this.$route.query.articleID;
    if (articleID) {
      await this.fetchArticle(articleID);
    } else {
      this.error = true;
    }
  },
  methods: {
    async fetchArticle(articleID) {
      this.loading = true;
      try {
        const response = await fetch(api.articleDetails + `?articleID=${articleID}`);
        if (!response.ok) throw new Error('Failed to fetch article.');
        const result = JSON.parse(await response.text()); // 解析 JSON
        console.log("Parsed JSON:", result);
        this.article = result.data
        console.log(this.result);
      } catch (error) {
        console.error('Error fetching article:', error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>