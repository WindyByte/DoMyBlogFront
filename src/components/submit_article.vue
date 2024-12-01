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

<style scoped>
.markdown-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.editor-container {
  display: flex;
  gap: 20px; /* 设置左右区域之间的间距 */
}
.editor, .preview {
  flex: 1; /* 两部分平分宽度 */
  display: flex;
  flex-direction: column;
}
textarea {
  width: 100%;
  height: 300px;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  resize: none;
}
.preview {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  overflow-y: auto; /* 当预览内容过长时，允许滚动 */
}
h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}
.submit-btn {
  display: inline-flex; /* 让按钮中的内容水平垂直居中 */
  align-items: center;
  justify-content: center;
  font-size: 18px; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  padding: 12px 24px; /* 内边距 */
  color: white; /* 文字颜色 */
  background: linear-gradient(45deg, #ff7e5f, #feb47b); /* 渐变背景 */
  border: none; /* 去掉边框 */
  border-radius: 50px; /* 圆角按钮 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  cursor: pointer; /* 鼠标指针 */
  transition: all 0.3s ease-in-out; /* 动画过渡 */
}
.submit-btn:hover {
  background: linear-gradient(45deg, #feb47b, #ff7e5f); /* 渐变方向反转 */
  transform: scale(1.1); /* 放大按钮 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* 加深阴影 */
}

/* 标题容器样式 */
.title-container {
  display: flex;
  flex-direction: column; /* 垂直排列：标题标签在输入框上方 */
  margin-bottom: 20px;
}

/* 标题标签样式 */
.title-label {
  font-size: 18px;
  font-weight: bold;
  color: #333; /* 深灰色 */
  margin-bottom: 10px; /* 与输入框的间距 */
}

/* 标题输入框样式 */
.title-input {
  width: 100%; /* 占满父容器 */
  padding: 12px 16px; /* 内边距 */
  font-size: 16px;
  border: 1px solid #ccc; /* 浅灰色边框 */
  border-radius: 8px; /* 圆角 */
  background-color: #f9f9f9; /* 淡灰色背景 */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); /* 内部阴影 */
  transition: all 0.3s ease-in-out; /* 动画过渡 */
}

/* 输入框聚焦时的样式 */
.title-input:focus {
  outline: none; /* 去掉默认的聚焦样式 */
  border-color: #007bff; /* 蓝色边框 */
  background-color: #ffffff; /* 白色背景 */
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); /* 蓝色外阴影 */
}

/* 输入框占位符样式 */
.title-input::placeholder {
  color: #aaa; /* 占位符颜色 */
  font-style: italic; /* 斜体 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title-input {
    font-size: 14px; /* 缩小字体 */
    padding: 10px 14px; /* 调整内边距 */
  }
}
</style>