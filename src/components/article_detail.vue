<template>
  <div class="article-container">
    <!-- 文章标题 -->
    <div class="article-header">
      <h1 v-if="article">{{ article.title }}</h1>
      <p v-if="loading" class="loading">加载中...</p>
      <p v-if="error" class="error">加载失败，请稍后再试。</p>
    </div>

    <!-- 文章内容 (Markdown 渲染) -->
    <div
        v-if="!loading && !error && article"
        class="article-content"
        v-html="renderedMarkdown"
    ></div>
  </div>
</template>

<script>
import { marked } from "marked";
import api from "@/api/article.js"
import "@/assets/article_detail.css";
export default {
  data() {
    return {
      article: null, // 存储文章数据
      loading: true, // 加载状态
      error: false, // 错误状态
      renderedMarkdown: "", // 渲染后的 Markdown
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
        // 解析 Markdown
        if (this.article.content) {
          this.renderedMarkdown = marked(this.article.content);
        }
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