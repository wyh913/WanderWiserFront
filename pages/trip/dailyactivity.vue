<template>
  <view class="container">
    <!-- 上半部分：展示Markdown内容 -->
    <view class="md-content">
      <!-- 渲染Markdown文件 -->
      <view v-if="mdContent" v-html="mdContent"></view>
    </view>
    
    <!-- 下半部分：按钮区域 -->
    <view class="button-container">
      <button class="map-button" @click="goToMapPage">获取地点</button>
      <button class="path-button" @click="goToTripPage">获取路线</button>
    </view>
  </view>
</template>

<script>
import axios from 'axios';
import marked from 'marked'; // 使用marked解析Markdown

export default {
  data() {
    return {
      planId: null,  // plan_id
      day: null,     // day
      userId: getApp().globalData.userId, // 假设的user_id
      mdContent: '', // 用来存储解析后的Markdown内容
      baseUrl: 'http://47.108.162.90:3000' // 假设后端的图片路径基准URL
    };
  },
  created() {
    // 获取传递的plan_id和day
    this.planId = this.$route.query.plan_id; // 注意使用正确的query参数名
    this.day = this.$route.query.day;
    
    // 调用接口5获取Markdown文件
    this.fetchMarkdown();
  },
  methods: {
    // 调用接口5获取Markdown文件
    fetchMarkdown() {
      axios.post('http://47.108.162.90:3000/tripManage/getDailyMD', {
        plan_id: this.planId,
        //user_id: this.userId,
        day: this.day,
      })
      .then(response => {
        // 假设返回的Markdown文件内容在response.data中
        const mdText = response.data; // 这里根据后端返回的结构进行调整
        this.mdContent = this.formatMarkdown(mdText); // 格式化并渲染Markdown
      })
      .catch(error => {
        console.error('接口5请求失败', error);
      });
    },

    // 格式化Markdown，分块展示
    formatMarkdown(mdText) {
      // 使用 marked 解析Markdown
      let htmlContent = marked(mdText);

      // 处理图片标签，给图片加上阴影效果，并修正图片链接
      htmlContent = htmlContent.replace(
        /<img[^>]*src="([^"]+)"[^>]*>/g,
        (match, src) => {
          // 如果图片链接是相对路径，则拼接到基础URL前
          const imgSrc = src.startsWith('http') ? src : `${this.baseUrl}${src}`;
          return `<img src="${imgSrc}" class="md-image">`;
        }
      );

      // 使用正则将解析后的HTML按一级标题分块展示
      htmlContent = htmlContent.replace(
        /<h1>(.*?)<\/h1>/g,
        (match, title) => `<div class="section-title"><h1>${title}</h1></div>`
      );

      // 按二级标题分块展示
      htmlContent = htmlContent.replace(
        /<h2>(.*?)<\/h2>/g,
        (match, title) => `<div class="subsection-title"><h2>${title}</h2></div>`
      );

      return htmlContent;
    },

    // 跳转到map2.html页面
    goToMapPage() {
      // 使用window.location.href跳转到map2.html
      window.location.href = '/static/map2.html';
    },

    // 跳转到path.html页面
    goToTripPage() {
      // 使用window.location.href跳转到path.html
      window.location.href = '/static/path.html';
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url('static/background.jpg'); /* 设置背景图片 */
  background-size: cover; /* 背景图片完全覆盖 */
  background-position: center; /* 背景图片居中显示 */
  height: 100vh; /* 页面高度占满屏幕 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.md-content {
  flex: 1; /* 上半部分占据剩余空间 */
  overflow-y: auto; /* 使Markdown内容可滚动 */
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景色 */
  border-radius: 8px;
  border: 1px solid #ddd; /* 边框 */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* 阴影 */
  margin: 20px 0;
}

.section-title {
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ff6600;
  text-align: center;
}

.section-title h1 {
  color: #ff6600; /* 一级标题的颜色 */
  font-size: 24px;
}

.subsection-title {
  margin-top: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ff6600;
}

.subsection-title h2 {
  color: #e65c00; /* 二级标题的颜色 */
  font-size: 20px;
}

/* 图片样式 */
.md-image {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 给图片添加阴影效果 */
  margin: 10px 0;
  display: block; /* 保证图片块级显示 */
  height: auto;
  max-width: 100%; /* 确保图片宽度不超过容器 */
}

.button-container {
  display: flex;
  justify-content: space-around; /* 按钮水平排列 */
  padding: 20px;
  background-color: #ffffff; /* 按钮区域背景 */
  border-top: 1px solid #ccc; /* 上边框 */
}

.map-button,
.path-button {
  background-color: #ff6600; /* 红橙色 */
  color: #ffffff;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.map-button:hover,
.path-button:hover {
  background-color: #e65c00; /* 悬停颜色 */
}
</style>
