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
      <div class="editor" id="markdown-container"></div>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-container">
      <button @click="publishArticle" class="submit-btn">提交</button>
      <button class="close-btn" @click="$emit('closeEditor')">关闭</button>
    </div>
  </div>
</template>

<script>
import 'cherry-markdown/dist/cherry-markdown.css';
import Cherry from 'cherry-markdown';
import {marked} from "marked"; // 用于解析 Markdown
import api from "@/api/article.js";
import "@/assets/publish_article.css";
import {TAG_OPTIONS} from "@/constant/tags.js";

export default {
  data() {
    return {
      title: "",
      markdownContent: "", // 用户输入的 Markdown 内容
      tags: [], // 用户选择的标签
      isOpen: false, // 控制下拉菜单显示
      tagOptions: TAG_OPTIONS, // 可选标签
      cherryInstance: null, // Cherry 实例
    };
  },
  computed: {
    // 实时解析 Markdown 内容为 HTML
    htmlContent() {
      return marked(this.markdownContent);
    },
  },
  mounted() {
    this.initCherryEditor(); // 初始化 Cherry 编辑器
  },
  methods: {
    initCherryEditor() {
      this.cherryInstance = new Cherry({
        id: "markdown-container",
        value: "# yes yes", // 初始内容
        nameSpace: 'cherry',
        themeSettings: {
          // 主题列表，用于切换主题
          themeList: [
            { className: 'gray', label: 'gray' },
            { className: 'default', label: '默认' },
            { className: 'dark', label: '黑' },
            { className: 'light', label: '白' },
            { className: 'green', label: '绿' },
            { className: 'red', label: '粉' },
            { className: 'violet', label: '紫' },
            { className: 'blue', label: '蓝' },

          ],
          // 目前应用的主题
          mainTheme: 'light',
          // 目前应用的代码块主题
          codeBlockTheme: 'default',
        },
        toolbars: {
          // 定义顶部工具栏
          toolbar: ['bold','italic','strikethrough','|','color','header','ruby','|','list','panel','detail', '|', 'size','theme'],
          // 定义侧边栏，默认为空
          // sidebar: ['bold', 'italic', 'strike'],
          // 定义顶部右侧工具栏，默认为空
          toolbarRight: [],
          // 定义选中文字时弹出的“悬浮工具栏”，默认为 ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'quote', '|', 'size', 'color']
          bubble: false,
          // 定义光标出现在行首位置时出现的“提示工具栏”，默认为 ['h1', 'h2', 'h3', '|', 'checklist', 'quote', 'table', 'code']
          float: false,
        },
      });
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectTag(option) {
      if (!this.tags.includes(option)) {
        this.tags.push(option);
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    async publishArticle() {
      if (!this.title.trim()) {
        alert("标题不能为空！");
        return;
      }
      if (!this.tags.length > 0) {
        alert("标签为空");
        return;
      }
      this.markdownContent = this.cherryInstance.getMarkdown();
      // this.cherryInstance.getHtml(this.markdownContent);
      const payload = {
        title: this.title,
        markdown: this.markdownContent, // 提交原始 Markdown 内容
        // html: this.htmlContent, // 提交解析后的 HTML
        tags: this.tags,
      };

      try {
        const response = await fetch(api.publishArticle, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = JSON.parse(await response.text());
        if (response.ok && result.code === 0) {
          alert("博客提交成功！");
          this.markdownContent = ""; // 清空 Markdown 内容
          this.cherryInstance.setMarkdown(""); // 清空 Cherry 编辑器内容
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