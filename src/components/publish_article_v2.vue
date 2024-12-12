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
import 'cherry-markdown/src/sass/themes/diy.scss'
import Cherry from 'cherry-markdown';
import api from "@/api/article.js";
import "@/assets/publish_article.css";
import {TAG_OPTIONS} from "@/constant/tags.js";
import {getCherryInstance} from "@/utils/cherryMarkdown.js";

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
  created() {
    this.cherryInstance = getCherryInstance(); // 初始化 Cherry 编辑器
    if (this.cherryInstance) {
      console.info("[publish created] this.cherryInstance: ", this.cherryInstance)
    }
  },
  mounted() {
    // this.cherryInstance = this.initCherryEditor(); // 初始化 Cherry 编辑器
    this.cherryInstance = getCherryInstance(); // 初始化 Cherry 编辑器
    if (this.cherryInstance) {
      console.info("[publish mounted] this.cherryInstance: ", this.cherryInstance)
    }
  },
  methods: {
    /**
     * APIs: https://tencent.github.io/cherry-markdown/examples/api.html
     * toolBars: https://github.com/Tencent/cherry-markdown/wiki/%E8%B0%83%E6%95%B4%E5%B7%A5%E5%85%B7%E6%A0%8F
     */
    initCherryEditor() {
      if (this.cherryInstance) {
        console.warn("cherryInstance exist");
        return this.cherryInstance;
      }
      let cherryInstance = new Cherry({
        id: "markdown-container",
        value: `# 公式测试

行内公式：$a^2 + b^2 = c^2$

块级公式：
$$
E = mc^2
$$
`,
        // externals: {
        //   echarts: window.echarts,
        //   katex: window.katex || null,
        //   MathJax: window.MathJax,
        // },
        nameSpace: 'cherry',
        themeSettings: {
          // 主题列表，用于切换主题
          themeList: [
            {className: 'div', label: 'div'},
            {className: 'default', label: 'default'},
            {className: 'dark', label: 'dark'},
            {className: 'light', label: 'light'},
            {className: 'green', label: 'green'},
            {className: 'red', label: 'red'},
            {className: 'violet', label: 'violet'},
            {className: 'blue', label: 'blue'},
            {className: 'orange', label: 'orange'},
          ],
          // 目前应用的主题
          mainTheme: 'div',
          // 目前应用的代码块主题
          codeBlockTheme: 'default',
        },
        engine: {
          syntax: {
            mathBlock: {
              plugins: true, // 默认加载插件
              engine: 'MathJax', // katex或MathJax
              src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js', // 如果使用MathJax plugins，则需要使用该url通过script标签引入
            },
            inlineMath: {
              engine: 'MathJax', // katex或MathJax
              src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
            },
            header: {
              anchorStyle: "autonumber",
              strict: false,
            },
          },
        },
        toolbars: {
          // 定义顶部工具栏
          toolbar: ['bold', 'italic', 'strikethrough', '|',
            'color', 'ruby', '|',
            'list', 'panel', 'detail', '|',
            'theme', {insert: ['image', 'audio', 'video', 'link', 'code', 'formula', 'toc', 'table', 'drawIo']},
            'togglePreview', 'switchModel',
          ],
          // 定义侧边栏，默认为空
          sidebar: [],
          // 定义顶部右侧工具栏，默认为空
          toolbarRight: [],
          // 定义选中文字时弹出的“悬浮工具栏”，默认为 ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'quote', '|', 'size', 'color']
          bubble: false,
          // 定义光标出现在行首位置时出现的“提示工具栏”，默认为 ['h1', 'h2', 'h3', '|', 'checklist', 'quote', 'table', 'code']
          float: false,
        },
      });
      // cherryInstance.switchModel('previewOnly');
      // this.cherryInstance.switchModel('editOnly');
      // this.cherryInstance.switchModel('edit&preview');
      return cherryInstance;
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
      const payload = {
        title: this.title,
        markdown: this.cherryInstance.getMarkdown(), // 提交原始 Markdown 内容
        html: this.cherryInstance.getHtml(), // 提交解析后的 HTML
        tags: this.tags,
      };
      this.cherryInstance = getCherryInstance();
      if (this.cherryInstance) {
        console.info("[publish] this.cherryInstance: ", this.cherryInstance)
      }
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