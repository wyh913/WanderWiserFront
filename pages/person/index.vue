<template>
  <view class="container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">←</button>

    <view class="button-container">
      <!-- 按钮1：个人资料 -->
      <button class="action-button" @click="goToPersonalData">
        个人资料
      </button>

      <!-- 按钮2：预设偏好 -->
      <button class="action-button" @click="goToPreferences">
        预设偏好
      </button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    // 返回按钮，跳转到home.vue
    goBack() {
      uni.navigateTo({
        url: '/pages/home', // 跳转到 home 页面
      });
    },
    // 跳转到个人资料页面
    goToPersonalData() {
      uni.navigateTo({
        url: '/pages/person/persondata' // 确保路径正确
      });
    },
    // 跳转到预设偏好页面
    goToPreferences() {
      uni.navigateTo({
        url: '/pages/person/prefer' // 确保路径正确
      });
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/static/background.jpg'); /* 设置背景图片 */
  background-size: cover;
  background-position: center;
  position: relative; /* 为了使返回按钮定位生效 */
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 按钮之间的间距 */
}

.action-button {
  background: linear-gradient(90deg, #ff6f61, #ff9800); /* 橙红色到橙色的渐变 */
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 80%; /* 按钮宽度 */
  max-width: 500px; /* 最大宽度 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.action-button:hover {
  background: linear-gradient(90deg, #e65c50, #ff8c00); /* 鼠标悬停时的渐变效果 */
}

/* 返回按钮的样式 */
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
