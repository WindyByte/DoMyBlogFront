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
import submitArticle from '@/components/submit_article.vue';

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

<style>
.main-pages {
  display: flex;
  gap: 20px; /* 子元素间距 */
  flex-direction: row; /* 横向排列 */
  padding: 20px; /* 整体内边距 */
  /*background-color: #f8f9fa; /* 淡灰背景色 */
  /*border-radius: 10px; /* 圆角边框 */
  /*box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 整体阴影 */
}

.main-pages .content {
  flex: 5; /* 主内容占 5 份宽度 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  padding: 3em;
  background-color: #ffffff; /* 白色背景 */
  border: 1px solid #e3e3e3; /* 浅灰色边框 */
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  transition: all 0.3s ease-in-out; /* 动画过渡 */
}

.main-pages .content:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* 悬停时阴影加深 */
}

.sidebar {
  flex: 0 0 20%; /* 固定宽度为页面的 20% */
  transition: all 0.3s ease-in-out; /* 动画过渡 */
}

/* 标题样式 */
.sidebar h3,
.main-pages .content h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333; /* 深灰色字体 */
  margin-bottom: 20px;
}

/* 文本内容样式 */
.sidebar p,
.main-pages .content p {
  font-size: 14px;
  color: #555; /* 浅灰色字体 */
  line-height: 1.6; /* 增加行高 */
}

/* 背景遮罩 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 保证浮窗在最上层 */
}

/* 弹出窗样式 */
.popup {
  width: 90%;
  height: 90%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  animation: popup-fade-in 0.4s ease-in-out;
}

/* 弹出动画 */
@keyframes popup-fade-in {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 关闭按钮 */
.close-btn {
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

.close-btn:hover {
  background: linear-gradient(45deg, #feb47b, #ff7e5f); /* 渐变方向反转 */
  transform: scale(1.2); /* 放大按钮 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* 加深阴影 */
}

/* 写博客按钮样式 */


/* 写博客按钮样式 */
.write-blog-btn {
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

/* 鼠标悬停效果 */
.write-blog-btn:hover {
  background: linear-gradient(45deg, #feb47b, #ff7e5f); /* 渐变方向反转 */
  transform: scale(1.1); /* 放大按钮 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* 加深阴影 */
}

/* 按下效果 */
.write-blog-btn:active {
  transform: scale(0.95); /* 按下时缩小按钮 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影变小 */
}

/* 按钮内部的文字样式 */
.write-blog-btn p {
  margin: 0; /* 去除段落默认的外边距 */
  font-family: 'Arial', sans-serif; /* 设置字体 */
}
</style>