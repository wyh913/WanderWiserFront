<template>
  <view class="container">
    <!-- 上半部分：展示md内容 -->
    <view class="md-content">
      <!-- 显示一级标题 -->
      <view v-if="mainTitle" class="main-title">
        <h1>{{ mainTitle }}</h1>
      </view>
      
      <!-- 分块展示二级标题及其对应内容 -->
      <view v-for="(section, index) in sections" :key="index" class="section">
        <h2>{{ section.title }}</h2>
        <div v-html="section.content"></div> <!-- 渲染二级标题下的md内容 -->
      </view>
    </view>

    <!-- 下半部分：根据days数量生成按钮 -->
    <view class="days-buttons">
      <button 
        v-for="n in days" 
        :key="n" 
        @click="goToDailyActivityPage(n)"
      >
        DAY {{ n }}
      </button>
    </view>
  </view>
</template>

<script>
import axios from 'axios';
import marked from 'marked'; // 用于渲染Markdown

export default {
  data() {
    return {
      planId: '', // 从history.vue传来的plan_id
      userId: getApp().globalData.userId, // 假设用户ID
      mdContent: '', // 存储解析后的md文件内容
      mainTitle: '', // 存储一级标题
      sections: [], // 存储根据二级标题分块的数据
      days: 0, // 存储days的数量
    };
  },
  onLoad(options) {
    this.planId = options.plan_id; // 获取plan_id
    this.fetchData();  // 获取数据
  },
  methods: {
    // 调用接口3和接口4
    fetchData() {
      // 调用接口3获取md文件
      axios.post('http://47.108.162.90:3000/tripManage/getTripMD', {
        plan_id: this.planId,
      })
      .then(response => {
        this.mdContent = response.data;
        this.parseMarkdown(); // 渲染并分块
      })
      .catch(error => {
        console.error('接口3请求失败', error);
      });

      // 调用接口4获取days数量
      axios.post('http://47.108.162.90:3000/tripManage/getByUid_Pid', {
        plan_id: this.planId,
        user_id: this.userId,
      })
      .then(response => {
        // 获取days字段并赋值
        this.days = response.data.results[0].days;  // 取出results数组的第一个元素并获取days
      })
      .catch(error => {
        console.error('接口4请求失败', error);
      });
    },

    // 解析Markdown，分块展示
    parseMarkdown() {
      const rawContent = marked(this.mdContent); // 使用marked解析Markdown

      // 使用正则匹配h1（一级标题）和h2（一级标题后跟的内容）
      const h1Regex = /<h1[^>]*>(.*?)<\/h1>/;
      const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g;
      const h2ContentRegex = /<h2[^>]*>(.*?)<\/h2>(.*?)$/g;

      // 获取一级标题
      const mainTitleMatch = h1Regex.exec(rawContent);
      this.mainTitle = mainTitleMatch ? mainTitleMatch[1] : '';

      // 获取二级标题和对应的内容
      let sections = [];
      let contentLeft = rawContent.replace(h1Regex, ''); // 移除一级标题的部分

      let h2Matches = contentLeft.match(h2Regex); // 匹配所有的二级标题

      h2Matches && h2Matches.forEach((match, index) => {
        let sectionContent = '';
        if (index < h2Matches.length - 1) {
          sectionContent = contentLeft.split(h2Matches[index + 1])[0]; // 获取当前二级标题后的内容
        } else {
          sectionContent = contentLeft.split(h2Matches[index])[1]; // 获取最后一部分内容
        }

        sections.push({
          title: match.replace(/<[^>]*>/g, ''), // 提取标题文本
          content: marked(sectionContent), // 渲染该部分md内容
        });
        contentLeft = contentLeft.replace(match, ''); // 移除当前匹配的二级标题部分
      });

      this.sections = sections; // 保存分块后的数据
    },

    // 跳转到dailyactivity.vue并传递plan_id和day
    goToDailyActivityPage(day) {
      uni.navigateTo({
        url: `/pages/trip/dailyactivity?plan_id=${this.planId}&day=${day}`,
      });
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url('static/background.jpg'); /* 设置背景图片 */
  background-size: cover; /* 背景图片完全覆盖 */
  background-position: center; /* 背景图片居中显示 */
  height: 100vh; /* 让容器高度占满屏幕 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.md-content {
  max-height: 50vh;  /* 上半部分md内容的最大高度 */
  overflow-y: auto;  /* 使内容可滚动 */
  border: 1px solid #ccc;  /* 给上半部分内容加边框 */
  margin-bottom: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* 给md内容区域添加半透明背景 */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 为md内容区域添加阴影 */
}

.main-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #FF4D4F;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  color: #204c67;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section div {
  line-height: 1.8;
  color: #333;
}

.days-buttons {
  display: flex;
  flex-direction: column; /* 垂直排列按钮 */
  padding: 20px;
}

.days-buttons button {
  margin: 10px 0;
  padding: 12px;
  background-color: #FF4D4F; /* 红色按钮 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.days-buttons button:hover {
  background-color: #FF7875; /* 按钮悬停颜色 */
  transform: scale(1.05); /* 按钮悬停时有放大的效果 */
}
</style>
