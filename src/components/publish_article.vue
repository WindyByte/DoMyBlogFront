<template>
  <div class="markdown-editor">
    <!-- 标题输入区域 -->
    <div class="title-container">
      <input
          id="title"
          type="text"
          v-model="title"
          placeholder="请输入文章标题"
          class="title-input"
      />
    </div>

    <!-- 标签输入 -->
    <div class="dropdown-container">
      <div class="dropdown-wrapper">
        <button class="dropdown-trigger" @click="toggleDropdown">
          {{ '选择标签' }}
          <span class="dropdown-arrow"></span>
        </button>
        <!-- 下拉菜单 -->
        <ul v-if="isOpen" class="dropdown-menu">
          <li
              v-for="(option, index) in tagOptions"
              :key="index"
              class="dropdown-item"
              @click="selectTag(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
      <!-- 已选标签显示 -->
      <div class="selected-tags">
        <span v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag }}
        <span class="tag-remove" @click="removeTag(index)">×</span>
    </span>
      </div>
    </div>

    <!-- 编辑器与预览区域 -->
    <div class="editor-container">
      <div class="editor">
<!--        <h3>编辑</h3>-->
        <textarea
            v-model="markdownContent"
            placeholder="在这里输入 Markdown 内容"
        ></textarea>
      </div>
      <div class="preview">
<!--        <h3>预览</h3>-->
        <div v-html="htmlContent"></div>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="submit-container">
      <button @click="publishArticle" class="submit-btn">提交</button>
      <button class="close-btn" @click="$emit('closeEditor')">关闭</button>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
import api from "@/api/article.js";
import "@/assets/publish_article.css";
import { TAG_OPTIONS } from "@/constant/tags.js";

export default {
  data() {
    return {
      title: "",
      markdownContent: "", // 用户输入的 Markdown 内容
      tags: [], // 用户选择的标签
      isOpen: false, // 控制下拉菜单显示
      tagOptions: TAG_OPTIONS, // 可选标签
    };
  },
  computed: {
    // 实时解析 Markdown 内容为 HTML
    htmlContent() {
      return marked(this.markdownContent);
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectTag(option) {
      // 选择标签后关闭下拉菜单，并添加到已选列表
      if (!this.tags.includes(option)) {
        this.tags.push(option);
      }
      // this.isOpen = false;
    },
    removeTag(index) {
      // 移除指定标签
      this.tags.splice(index, 1);
    },
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
        tags: this.tags, // 提交的标签
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