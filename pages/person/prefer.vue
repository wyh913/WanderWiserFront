<template>
  <view class="container">
    <div class="form-container">
      <h2>用户偏好设置</h2>
      <form @submit.prevent="submitForm">
        <!-- 性别选择 -->
        <div class="form-group">
          <label for="gender">性别</label>
          <select v-model="form.gender" id="gender" required>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>

        <!-- 年龄选择 -->
        <div class="form-group">
          <label for="age">年龄</label>
          <input type="number" v-model="form.age" id="age" min="1" max="100" required />
        </div>

        <!-- 生日输入 -->
        <div class="form-group">
          <label for="birthday">生日</label>
          <input type="date" v-model="form.birthday" id="birthday" required />
        </div>

        <!-- 季节偏好选择 -->
        <div class="form-group">
          <label for="season">季节偏好</label>
          <select v-model="form.season" id="season" required>
            <option value="spring">春</option>
            <option value="summer">夏</option>
            <option value="autumn">秋</option>
            <option value="winter">冬</option>
          </select>
        </div>

        <!-- 交通偏好输入 -->
        <div class="form-group">
          <label for="transport">出行交通偏好</label>
          <input type="text" v-model="form.transport" id="transport" placeholder="例如：火车、飞机、汽车" required />
        </div>

        <!-- 住宿偏好输入 -->
        <div class="form-group">
          <label for="accommodation">住宿偏好</label>
          <input type="text" v-model="form.accommodation" id="accommodation" placeholder="例如：酒店、民宿、青年旅社" required />
        </div>

        <!-- 饮食偏好输入 -->
        <div class="form-group">
          <label for="diet">饮食偏好</label>
          <input type="text" v-model="form.diet" id="diet" placeholder="例如：素食、荤食、无辣" required />
        </div>

        <!-- 提交按钮 -->
        <div class="form-group">
          <button type="submit">提交</button>
        </div>
      </form>
    </div>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// 表单数据模型
const form = ref({
  gender: 'male',          // 性别（默认：男）
  age: '',                 // 年龄
  birthday: '',            // 生日
  season: 'spring',        // 季节偏好（默认：春季）
  transport: '',           // 出行交通偏好
  accommodation: '',       // 住宿偏好
  diet: '',                // 饮食偏好
});

// 提交表单的函数
const submitForm = async () => {
  try {
    // 请求数据准备
    const response = await axios.post('/api/user-preference', form.value);

    if (response.status === 200) {
      alert('数据提交成功！');
    } else {
      alert('提交失败，请稍后重试。');
    }
  } catch (error) {
    console.error('提交失败:', error);
    alert('发生错误，请稍后重试。');
  }
};
</script>

<style scoped>
/* 确保背景图片固定并铺满屏幕 */
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-image: url('/static/background.jpg'); /* 设置背景图片 */
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* 背景固定 */
  padding: 20px;
  overflow: auto; /* 允许页面内容滚动 */
}

/* 表单容器样式 */
.form-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.85); /* 半透明背景色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 允许表单部分滚动 */
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #ff6f61; /* 橙红色标题 */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
}

input, select {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}

input:focus, select:focus {
  border-color: #ff6f61; /* 聚焦时边框变色 */
  outline: none;
}

button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #ff6f61, #ff9800); /* 橙红色到橙色的渐变 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: linear-gradient(90deg, #e65c50, #ff8c00); /* 鼠标悬停时的渐变效果 */
}
</style>
