<template>
  <div class="home-container">
    <h1 class="page-title">欢迎来到W.W</h1>
    <div class="button-container">
      <button class="navigate-button" @click="goToPage('page1')">获取行程</button>
      <button class="navigate-button" @click="goToPage('page2')">个人中心</button>
      <button class="navigate-button" @click="goToPage('page3')">历史行程</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  methods: {
    // 页面跳转方法
    goToPage(page) {
      switch(page) {
        case 'page1':
          // 跳转到页面 1
          uni.navigateTo({
            url: '/pages/trip/gettrip'  // 这里的路径根据你的项目结构调整
          });
          break;
        case 'page2':
          // 跳转到页面 2
          uni.navigateTo({
            url: '/pages/person/index'
          });
          break;
        case 'page3':
          // 跳转到页面 3
          uni.navigateTo({
            url: '/pages/userdata/history'
          });
          break;
        default:
          console.warn('未知页面');
      }
    }
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-image: url('/static/background.jpg'); /* 替换为实际背景图片路径 */
  background-size: cover;
  background-position: center;
  font-family: 'Arial', sans-serif;
  color: #fff;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  padding-top: 60px; /* 让标题位于界面顶端 */
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px; /* 调整按钮距离顶部的距离 */
}

.navigate-button {
  background: linear-gradient(45deg, #ff6f00, #ff8f00);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 220px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.navigate-button:hover {
  background: linear-gradient(45deg, #e65c00, #e67300);
}

.navigate-button:active {
  transform: scale(0.98);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
