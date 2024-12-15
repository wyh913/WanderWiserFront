<template>
  <view class="container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">←</button>

    <h1 class="page-title">一起开始新的旅程吧~</h1>
    
    <!-- 聊天记录 -->
    <div class="chat-box">
      <div v-for="(message, index) in chatHistory" :key="index" :class="['chat-message', message.isUser ? 'user-message' : 'output-message']">
        <p>{{ message.text }}</p>
      </div>
    </div>

    <!-- 用户输入框 -->
    <input v-model="userInput" placeholder="请输入文本" class="chat-input" @keyup.enter="sendRequest"/>

    <!-- 发送按钮 -->
    <button @click="sendRequest" class="send-button">发送</button>

    <!-- 渲染的MD内容 -->
    <div v-if="sections && sections.length" class="md-content">
      <div v-for="(section, index) in sections" :key="index" class="md-section">
        <h2>{{ section.title }}</h2>
        <div v-html="section.content"></div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div v-if="fileUrl" class="save-button-container">
      <button @click="savePlan" class="save-button">保存计划</button>
    </div>
  </view>
</template>

<script>
import axios from 'axios';
import marked from 'marked'; // 使用marked解析Markdown

export default {
  data() {
    return {
      userInput: '', // 用户输入的文本
      userId: getApp().globalData.userId, // 用户ID
      chatHistory: [], // 聊天历史记录
      fileUrl: '', // MD文件的下载URL
      mdContent: '', // 渲染的MD内容
      sections: [], // 用于存储分块后的内容
    };
  },
  methods: {
    // 返回按钮，跳转到home.vue
    goBack() {
      uni.navigateTo({
        url: '/pages/home', // 跳转到 home 页面
      });
    },

    // 发送请求的函数
    sendRequest() {
      if (this.userInput.trim() === '') return; // 防止发送空消息

      // 保存用户输入到聊天记录
      this.chatHistory.push({ text: this.userInput, isUser: true });

      // 调用接口1，传递user_id和userInput
      axios.post('http://47.108.162.90:5000/agent/query/stage1', {
        query: this.userInput,
        user_id: this.userId,
      })
      .then(response => {
        this.userInput = ''; // 清空输入框
        console.log('接口1响应:', response);
        
        // 根据返回的情况处理不同的显示逻辑
        if (response.data.file_url) {
          // 情况①：返回MD文件和output
          this.chatHistory.push({ text: response.data.output, isUser: false });
          this.fileUrl = response.data.file_url;
          console.log(response.data.file_url);
          // 调用接口2获取完整的文件下载地址
          this.getCompleteFileUrl(this.fileUrl);
        } else {
          // 情况②：没有MD文件，只返回output
          this.chatHistory.push({ text: response.data.output, isUser: false });
          this.fileUrl = null;
          this.mdContent = ''; // 清空MD内容
        }
      })
      .catch(error => {
        console.error('接口1请求失败', error);
      });
    },

    // 调用接口2获取完整的文件下载地址
    getCompleteFileUrl(fileUrl) {
      // 调用接口2，获取完整的文件下载链接
      console.log("获取文件URL", fileUrl);
      axios.post('http://47.108.162.90:5000/agent/download/main_plan', {
        file_url: fileUrl,
      })
        .then(response => {
          this.mdContent = response.data.file_content;
          this.parseMarkdown(this.mdContent); // 渲染并分块
        })
        .catch(error => {
          console.error('接口2请求失败', error);
        });
    },

    // 格式化Markdown文件，使用marked解析
    parseMarkdown(mdContent) {
      const rawContent = marked(mdContent); // 使用marked解析Markdown
    
      // 获取一级标题
      const mainTitleMatch = /<h1[^>]*>(.*?)<\/h1>/.exec(rawContent);
      this.mainTitle = mainTitleMatch ? mainTitleMatch[1] : '';

      // 获取二级标题和对应的内容
      let sections = [];
      let contentLeft = rawContent.replace(/<h1[^>]*>.*?<\/h1>/, ''); // 移除一级标题的部分

      // 匹配所有的二级标题
      const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g;
      let h2Matches = [...contentLeft.matchAll(h2Regex)];
    
      h2Matches.forEach((match, index) => {
        let sectionContent = '';
        const nextH2Index = h2Matches[index + 1] ? h2Matches[index + 1].index : contentLeft.length;
        sectionContent = contentLeft.substring(match.index + match[0].length, nextH2Index);

        sections.push({
          title: match[1], // 提取标题文本
          content: marked(sectionContent), // 渲染该部分md内容
        });
      });
    
      this.sections = sections; // 保存分块后的数据
    },

    // 保存计划
    savePlan() {
      // 调用接口3，保存计划 
      axios.post('http://47.108.162.90:5000/saveDB/main_plan', { 
        user_id: this.userId,
      })
      .then(response => {
        console.log('保存成功:', response);
        alert('计划已保存！');
      })
      .catch(error => {
        console.error('保存计划失败', error);
      });
    }
  }
};
</script>

<style scoped>
.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-image: url('/static/background.jpg');
  background-size: cover;
  background-position: center;
  font-family: 'Arial', sans-serif;
  color: lemonchiffon;
  padding: 20px;
}

.chat-box {
  width: 100%;
  height: 180px;
  max-width: 600px;
  margin-bottom: 20px;
  padding: 10px;
  overflow-y: auto;
}

.chat-message {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  max-width: 80%;
  word-wrap: break-word;
}

.user-message {
  background-color: #ff6f61;
  color: white;
  margin-left: auto;
}

.output-message {
  background-color: #f1f1f1;
  color: #333;
}

.chat-input {
  width: 80%;
  max-width: 500px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.send-button {
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.send-button:hover {
  background-color: #e65c50;
}

.md-content {
  margin-top: 20px;
  width: 80%;
  max-width: 500px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid #ddd;
  overflow-y: auto;
  max-height: 300px;
}

.md-section {
  margin-bottom: 20px;
}

.save-button-container {
  margin-top: 20px;
  width: 80%;
  max-width: 500px;
}

.save-button {
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #e65c50;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: #ff6f61;
  cursor: pointer;
}
</style>
