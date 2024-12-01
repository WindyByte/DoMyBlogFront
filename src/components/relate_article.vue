<template>
  <div class="sidebar">
    <h3>最近博客</h3>
    <ul>
      <li v-for="article in articles" :key="article.articleID">
        <!-- 每个博客标题是一个链接，点击跳转详情页 -->
        <a :href="`/article/${article.articleID}`">{{ article.title }}</a>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="error" class="error">加载失败，请稍后再试。</p>
  </div>
</template>

<script>
import api from "@/api/article.js"

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
        const response = await fetch(api.relatedArticleList);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const result = await response.json(); // 解析 JSON
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
    // 格式化日期
    // formatDate(dateStr) {
    //   const options = { year: "numeric", month: "short", day: "numeric" };
    //   return new Date(dateStr).toLocaleDateString("zh-CN", options);
    // },
  },
};
</script>

<style scoped>
.sidebar {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.sidebar h3 {
  font-size: 18px;
  margin-bottom: 12px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  margin-bottom: 8px;
  font-size: 14px;
}
.sidebar li a {
  text-decoration: none;
  color: #007bff;
}
.sidebar li a:hover {
  text-decoration: underline;
}
.sidebar .date {
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>