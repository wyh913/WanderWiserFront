<template>
  <view>
    <!-- 显示获取的路线数据 -->
    <view v-if="pathData" v-html="pathData"></view>
  </view>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      planId: null,  // plan_id
      userId: getApp().globalData.userId, // 假设的user_id
      pathData: '', // 存储接口8返回的HTML内容
    };
  },
  created() {
    // 获取传递的plan_id
    this.planId = this.$route.query.plan_id;

    // 调用接口8获取路线数据
    this.fetchPathData();
  },
  methods: {
    // 调用接口8获取路线数据
    fetchPathData() {
      axios.get('http://127.0.0.1:3000/map/path', {
        params: {
          plan_id: this.planId,
          user_id: this.userId,
        }
      })
      .then(response => {
        // 假设接口8返回的是HTML内容
        this.pathData = response.data; // 直接赋值给pathData，假设为HTML字符串
        
        // 在HTML内容插入完成后，加载高德地图
        this.loadMap();
      })
      .catch(error => {
        console.error('接口8请求失败', error);
      });
    },
    
    // 加载地图的函数
    loadMap() {
      // 检查地图脚本是否已加载，如果未加载则动态插入
      if (typeof AMap === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://webapi.amap.com/maps?v=2.0&key=91a96e972c2dcbf897c2b6fdb662aa27';
        script.onload = () => {
          this.initializeMap(); // 脚本加载完成后初始化地图
        };
        document.body.appendChild(script);
      } else {
        // 如果已加载，直接初始化地图
        this.initializeMap();
      }
    },

    // 初始化地图
    initializeMap() {
      // 确保地图容器的大小有效
      const container = document.getElementById('container');
      container.style.width = '100%'; // 设置容器宽度
      container.style.height = '400px'; // 设置容器高度

      // 初始化地图
      const map = new AMap.Map('container', {
        viewMode: '2D',
        zoom: 10,  // 初始化地图层级
        center: [104.06, 30.67], // 初始化地图中心点
      });

      const startLngLat = [104.001882, 30.553254]; // 起始点坐标
      const endLngLat = [103.956527, 30.569214]; // 终点坐标

      // 引入并创建驾车规划插件
      AMap.plugin(['AMap.Driving'], () => {
        const driving = new AMap.Driving({
          map: map,
          panel: 'panel', // 参数值为你页面定义容器的 id 值
        });
        
        // 获取起终点规划线路
        driving.search(startLngLat, endLngLat, (status, result) => {
          if (status === 'complete') {
            console.log(result);  // 查询成功时，result 即为对应的驾车导航信息
          } else {
            console.log('获取驾车数据失败：', result);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
view {
  padding: 20px;
}

#container {
  width: 100%; /* 确保容器宽度正确 */
  height: 400px; /* 确保容器高度正确 */
}

#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
</style>
