<template>
    <div class="city_body">
      <!-- <div class="city_list">
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <li>上海</li>
          </ul>
        </div>
        <div class="city_sort">
          <div>
            <h2>A</h2>
            <ul>
              <li>阿拉善盟</li>
              <li>鞍山</li>
              <li>安庆</li>
              <li>安阳</li>
            </ul>
          </div>
      </div>
      <div class="city_index">
        <ul>
          <li>A</li>
        </ul>
      </div>
      </div>-->
      <div class="city_list">
        <Loading v-if="isLoading"/>
        <Scroller ref="city_list" v-else>
          <div>
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <!-- v-for： 表示循环的意思 ,要带上key：这是唯一值-->
            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
          </ul>
        </div>
        <div class="city_sort" ref="city_sort">
          <div v-for="item in cityList" :key="item.index">
            <h2>{{item.index}}</h2>
            <ul>
              <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>
            </ul>
          </div>
        </div>
        </div>
         </Scroller>
      </div>
        <div class="city_index">
          <ul>
						<!-- 第一个index是下标，即传入到handleToIndex()中的index -->
            <li v-for="(item,index) in cityList" :key="item.index" @click="handleToIndex(index)">{{item.index}}</li>
          </ul>
         </div>
      </div> 
</template>

<script>
// import axios from 'axios'
export default {
  name: "City",
  data() {
    //将结果渲染到页面中
    return {
      cityList: [],
      hotList: [],
      isLoading:true,
    };
  },
  mounted() {
    
         //本地存储
    var cityList=window.localStorage.getItem('cityList');
    var hotList=window.localStorage.getItem('hotList');
    if(cityList && hotList){ //进行本地存储
      this.cityList=JSON.parse(cityList);
      this.hotList=JSON.parse(hotList);
       this.isLoading=false;
    }
    this.axios.get("/api/cityList").then(res => {
      //处理数据，1、首先进行判断，看是否请求成功。
      var msg = res.data.msg;
      if (msg == "ok") {
        this.isLoading=false;
        var data = res.data.data.cities;
        //2、给城市分组，分成这种形式：[{index:'A',list:[{nm:'安徽'，id:123}]}]
        var { cityList, hotList } = this.formatCityList(data); //调用下面的函数，存放的返回值（一个对象）
       // console.log(hotList);
        this.cityList = cityList;
        this.hotList = hotList;
        //console.log(hotList);
        //本地存储
        window.localStorage.setItem('cityList',JSON.stringify(cityList));
        window.localStorage.setItem('hotList',JSON.stringify(hotList));
      }
    });
  },
  methods: {
    formatCityList(cities) {
      var cityList = []; //存放城市分类结果
      var hotList = []; //存放热门城市结果
      for (var i = 0; i < cities.length; i++) {
        //热门城市处理，数据中ishot是1则表示热门城市
        if (cities[i].isHot == 1) {
          hotList.push(cities[i]);
        }
      }

      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase(); //截取数据中拼音的第一个字母
        if (toCom(firstLetter)) {
          //新添加index
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          //累加到已有index中
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
              
            }
          }
        }
      }
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      function toCom(firstLetter) {
        //index表示以哪个字母开头
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            //这个字母出现过，就累加到列表里
            return false;
          }
        }
        return true;
      }
      return {
        cityList,
        hotList
      };
		},
		//handleToIndex（）这个方法是实现点击右边的ABCDE等等进行跳转（跳转到相应的ABCDE等等的位置）
		handleToIndex(index){
		
			var h2=this.$refs.city_sort.getElementsByTagName('h2');
      // this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;
      //改变滚动条的位置
      this.$refs.city_list.ToScrollTop(-h2[index].offsetTop);
			//this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
    },
    handleToCity(nm,id) {  //对应的改变城市名的方法
       this.$store.commit('city/CITY_INFO',{nm,id}); //修改状态管理
       window.localStorage.setItem('nowNm',nm); //刷新后保持原有的记录（利用本地存储）
       window.localStorage.setItem('nowId',id);
       this.$router.push('/Movie/MoviePlaying'); //路由跳转
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
/* .city_body .city_hot ul{} */
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
/* .city_body .city_sort{} */
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
.city_body .city_index li {
	margin-top: -4px;
	cursor: pointer;
}
</style>
