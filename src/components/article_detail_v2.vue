<template>
  <div class="article-container">
    <!-- 文章标题 -->
    <div class="article-header">
      <h1 v-if="article">{{ article.title }}</h1>
      <p v-if="loading" class="loading">加载中...</p>
      <p v-if="error" class="error">加载失败，请稍后再试。</p>
    </div>

    <!-- 文章内容 (Markdown 渲染) -->
    <div id="markdown-container"></div>
  </div>
</template>

<script>
import api from "@/api/article.js"
import "@/assets/article_detail.css";
import 'cherry-markdown/src/sass/themes/diy.scss'
import 'cherry-markdown/dist/cherry-markdown.css';
import {getCherryInstance} from "@/utils/cherryMarkdown.js";

export default {
  data() {
    return {
      article: null, // 存储文章数据
      loading: true, // 加载状态
      error: false, // 错误状态
      cherryInstancePreviewer: null, // Cherry 实例
    };
  },
  async created() {
    this.cherryInstancePreviewer = getCherryInstance();
    if (this.cherryInstance) {
      console.info("[detail create] this.cherryInstance: ", this.cherryInstance)
    }
  },
  async mounted() {
    // this.cherryInstancePreviewer = getCherryInstance();
    if (this.cherryInstance) {
      console.info("[detail mounted] this.cherryInstance: ", this.cherryInstance)
    } else {
      console.info("[detail mounted] this.cherryInstance failed.")
    }
    const articleID = this.$route.query.articleID;
    if (articleID) {
      await this.fetchArticle(articleID);
      console.info("created() -> fetchArticle(articleID =", articleID, ")");
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
        if (!this.cherryInstancePreviewer) console.info("this.cherryInstancePreviewer failed.")
        if (this.cherryInstancePreviewer && this.article.content) {
          this.cherryInstancePreviewer.setMarkdown(this.article.content, true);
          this.cherryInstancePreviewer.editor.editor.refresh();
          this.cherryInstancePreviewer.editor.editor.setCursor(this.cherryInstancePreviewer.getMarkdown().length)
          this.cherryInstancePreviewer.switchModel('edit&preview');
          // this.cherryInstancePreviewer.switchModel('previewOnly');
          // this.cherryInstancePreviewer.switchModel('editOnly');
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