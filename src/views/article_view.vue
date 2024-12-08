<template>
  <div class="main-pages">
    <div class="content">
      <transition name="popup">
        <div v-if="Object.keys(groupedArticles).length > 0">
          <div v-for="(articles, tag) in groupedArticles" :key="tag" class="tag-group">
            <h3 class="tag-title">{{ tag }}</h3>
            <div class="article-grid">
              <div v-for="article in articles" :key="article.articleID" class="article-card">
                <router-link :to="{ path: '/article', query: { articleID: article.articleID } }">
                  <div class="article-card-content">
                    <h3>{{ article.title }}</h3>
                    <p>{{ article.content ? article.content.slice(0, 100) + '...' : '无数据' }}</p>
                    <div class="article-footer">
                      <p class="views-count">Views: {{ article.views }}</p>
                    </div>
                  </div>
                </router-link>

              </div>
            </div>
          </div>
        </div>
      </transition>
      <button @click="toggleEditor" class="write-blog-btn">
        <p v-if="!showEditor">写文章</p>
      </button>
      <!-- 写博客弹出窗 -->
      <transition name="popup">
        <div v-if="showEditor" class="overlay" @click.self="toggleEditor">
          <div class="popup">
            <publishArticle_v2 @closeEditor="toggleEditor"/>
          </div>
        </div>
      </transition>
    </div>
    <!-- 侧边栏 -->
<!--    <aside class="sidebar">-->
<!--      <relatedArticles/>-->
<!--    </aside>-->
  </div>
</template>

<script>
import relatedArticles from '@/components/relate_article.vue';
import publishArticle from '@/components/publish_article.vue';
import publishArticle_v2 from '@/components/publish_article_v2.vue';
import "@/assets/article_view.css"
import {TAG_OPTIONS} from "@/constant/tags.js";
import api from "@/api/article.js";
// import Cherry from "cherry-markdown";

export default {
  components: {
    relatedArticles,
    publishArticle,
    publishArticle_v2,
  },
  data() {
    return {
      showEditor: false, // 控制写博客区域的显示
      groupedArticles: {}, // 存储按标签分类的文章
    };
  },
  created() {
    this.showAllArticlesByTags();
    if (Object.keys(this.groupedArticles || {}).length === 0) {
      this.groupedArticles = TAG_OPTIONS.reduce((acc, tag) => {
        acc[tag] = []; // 将默认值设置为空数组
        return acc;
      }, {});
    }
  },
  methods: {
    toggleEditor() {
      this.showEditor = !this.showEditor; // 切换显示状态
    },
    async showAllArticlesByTags() {
      try {
        const response = await fetch(api.allArticle);
        if (!response.ok) {
          console.warn(`HTTP error!`)
          // return {};
          return;
        }
        const result = JSON.parse(await response.text()); // 解析 JSON
        const articles = result.data
        console.log("Parsed JSON:", articles);
        this.groupedArticles = {};
        // 按标签拆分并归类
        articles.forEach((article) => {
          const tags = article.tags ? article.tags.split(",") : []; // 拆分标签
          tags.forEach((tag) => {
            if (!this.groupedArticles[tag]) {
              this.groupedArticles[tag] = [];
            }
            this.groupedArticles[tag].push(article); // 根据标签归类
          });
        });
        console.log("Grouped Articles by Tags:", this.groupedArticles);
        // return groupedArticles; // 返回分组后的对象
      } catch (error) {
        console.error(error);
        return {}
      }
    },
  }
};
</script>
