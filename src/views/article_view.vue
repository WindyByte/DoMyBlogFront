<template>
  <div class="main-pages">
    <div class="content">
      <button @click="toggleEditor" class="write-blog-btn">
        <p v-if="!showEditor">写文章</p>
      </button>
      <!-- 写博客弹出窗 -->
      <div v-if="showEditor" class="overlay" @click.self="toggleEditor">
        <div class="popup">
          <h2>写文章</h2>
          <submitArticle />
          <button @click="toggleEditor" class="close-btn">关闭</button>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <relatedArticles/>
    </aside>
  </div>
</template>

<script>
import relatedArticles from '@/components/relate_article.vue';
import submitArticle from '@/components/publish_article.vue';
import "@/assets/article_page.css"

export default {
  components: {
    relatedArticles,
    submitArticle,
  },
  data() {
    return {
      showEditor: false, // 控制写博客区域的显示
      post: {}, // 存储文章内容
    };
  },
  methods: {
    toggleEditor() {
      this.showEditor = !this.showEditor; // 切换显示状态
    },
  }
};
</script>
