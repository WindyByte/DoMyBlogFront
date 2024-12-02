<template>
  <div class="markdown-editor">
    <h2>写博客（支持 Markdown）</h2>
    <!-- 标题输入区域 -->
    <div class="title-container">
      <label for="title">标题：</label>
      <input
          id="title"
          type="text"
          v-model="title"
          placeholder="请输入文章标题"
          class="title-input"
      />
    </div>
    <!-- Markdown 编辑与预览 -->
    <div class="editor-container">
      <!-- Markdown 编辑区域 -->
      <div class="editor">
        <h3>编辑</h3>
        <textarea
            v-model="markdownContent"
            placeholder="在这里输入 Markdown 内容"
        ></textarea>
      </div>
      <!-- Markdown 预览区域 -->
      <div class="preview">
        <h3>预览</h3>
        <div v-html="htmlContent"></div>
      </div>
    </div>
    <button @click="publishArticle" class="submit-btn">提交</button>
  </div>
</template>

<script>
import { marked } from "marked";
import api from "@/api/article.js";
import "@/assets/markdown_editor.css";

export default {
  data() {
    return {
      title: "",
      markdownContent: "", // 用户输入的 Markdown 内容
    };
  },
  computed: {
    // 实时解析 Markdown 内容为 HTML
    htmlContent() {
      return marked(this.markdownContent);
    },
  },
  methods: {
    async publishArticle() {
      if (!this.title.trim()) {
        alert("标题不能为空！");
        return;
      }
      if (!this.markdownContent.trim()) {
        alert("内容不能为空！");
        return;
      }
      const payload = {
        title: this.title, // 提交的标题
        markdown: this.markdownContent, // 原始 Markdown 内容
        html: this.htmlContent, // 解析后的 HTML
      };

      try {
        const response = await fetch(api.publishArticle, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = JSON.parse(await response.text()); // 解析 JSON
        if (response.ok && result.code === 0) {
          alert("博客提交成功！");
          this.markdownContent = ""; // 清空输入框
        } else {
          throw new Error(result.message || "提交失败！");
        }
      } catch (error) {
        console.error("提交失败：", error);
        alert("提交失败，请稍后再试！");
      }
    },
  },
};
</script>