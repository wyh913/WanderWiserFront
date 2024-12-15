<template>
  <view>
    <!-- 显示获取的地点数据 -->
    <view v-if="mapData" v-html="mapData"></view>
  </view>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      planId: null,  // plan_id
      userId: getApp().globalData.userId, // 假设的user_id
      mapData: '', // 存储接口返回的HTML内容
    };
  },
  created() {
    // 获取传递的plan_id
    //this.planId = this.$route.query.plan_id;

    // 调用接口7获取地点数据
    this.fetchMapData();
  },
  methods: {
    // 调用接口7获取地点数据
    fetchMapData() {
      axios.get('http://47.108.162.90:3000/map/map2', {
        params: {
          //plan_id: this.planId,
          //user_id: this.userId,
        }
      })
      .then(response => {
        // 假设接口7返回的是HTML内容
        this.mapData = response.data; // 直接赋值给mapData，假设为HTML字符串
        
        // 在HTML内容插入完成后，加载高德地图
        this.loadMap();
      })
      .catch(error => {
        console.error('接口7请求失败', error);
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
        zoom: 11,  // 初始化地图层级
        center: [104.06, 30.67], // 初始化地图中心点 成都
      });

      // 输入提示
      const autoOptions = { input: 'tipinput' };

      AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], () => {
        const auto = new AMap.AutoComplete(autoOptions);
        const placeSearch = new AMap.PlaceSearch({ map: map });

        auto.on('select', (e) => {
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name); // 执行关键字查询
        });
      });
    },
  }
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

#tipinput {
  width: 100%;
  padding: 5px;
  margin-top: 10px;
}
</style>
