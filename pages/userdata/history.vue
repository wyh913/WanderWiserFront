<template>
  <view class="container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">←</button>

    <!-- 搜索框 -->
    <view class="search-box">
      <input v-model="searchQuery" placeholder="请输入计划名称" @input="filterPlans" />
    </view>

    <!-- 根据返回的数据生成按钮 -->
    <view v-for="(plan, index) in filteredPlans" :key="index" class="plan-button">
      <button @click="goToDailyPage(plan.plan_id, plan.days)">
        {{ plan.plan_name }} ({{ plan.days }} 天)
      </button>
    </view>
  </view>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: getApp().globalData.userId, // 假设用户ID
      plans: [], // 存储从接口6返回的所有计划数据
      filteredPlans: [], // 存储经过筛选后的计划数据
      searchQuery: '', // 搜索框的输入文本
    };
  },
  created() {
    this.fetchPlans(); // 在页面创建时调用接口6
  },
  methods: {
    // 返回按钮，跳转到home.vue
    goBack() {
      uni.navigateTo({
        url: '/pages/home', // 跳转到 home 页面
      });
    },

    // 调用接口6获取计划数据
    fetchPlans() {
      axios.post('http://127.0.0.1:3000/tripManage/getByUid', {
        user_id: this.userId,
      })
      .then(response => {
        console.log(response.data);
        this.plans = response.data.results; // 假设返回的数据是一个包含plan_id、plan_name、days的数组
        this.filteredPlans = this.plans; // 初始时，显示所有计划数据
      })
      .catch(error => {
        console.error('接口6请求失败', error);
      });
    },

    // 过滤计划数据，根据搜索框的输入进行模糊查询
    filterPlans() {
      if (this.searchQuery === '') {
        this.filteredPlans = this.plans; // 如果搜索框为空，显示所有计划
      } else {
        this.filteredPlans = this.plans.filter(plan => 
          plan.plan_name.toLowerCase().includes(this.searchQuery.toLowerCase()) // 模糊匹配plan_name
        );
      }
    },

    // 跳转到daily.vue并传递plan_id和days
    goToDailyPage(plan_id, days) {
      uni.navigateTo({
        url: `/pages/trip/daily?plan_id=${plan_id}&days=${days}`,
      });
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url('static/background.jpg'); /* 添加背景图片 */
  background-size: cover;
  background-position: center; /* 确保背景图片始终完全显示 */
  min-height: 100vh; /* 确保背景覆盖整个视口 */
  padding: 20px;
  position: relative; /* 使返回按钮定位在左上角 */
}

.search-box {
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.plan-button {
  margin-bottom: 10px;
}

.plan-button button {
  width: 100%;
  padding: 10px;
  background-color: #ff4d4f; /* 红色按钮 */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加按钮阴影 */
  transition: box-shadow 0.3s ease; /* 添加阴影过渡效果 */
}

.plan-button button:hover {
  background-color: #ff7875; /* 按钮悬停颜色 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* 悬停时阴影变化 */
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
