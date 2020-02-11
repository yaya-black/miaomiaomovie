// 正在热映部分
<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading" />
    <Scroller  v-else :handleToScroll ="handleToScroll" :handleToToucheEnd="handleToToucheEnd">
      <ul>
        <li class="pullDown">{{pullDownMsg}}</li>
        <li v-for="item in movieList" :key="item.id">
          <!-- <div class="pic_show"><img src="/static/images/movie_1.jpg"></div>
						<div class="info_list">
							<h2>无名之辈</h2>
							<p>观众评 <span class="grade">9.2</span></p>
							<p>主演: 陈建斌,任素汐,潘斌龙</p>
							<p>今天55家影院放映607场</p>
						</div>
						<div class="btn_mall">
							购票
          </div>-->
          <!-- 图片是动态变化的（其大小是动态变化的） -->

          <div class="pic_show" @tap="handeleToDetail(item.id)">
            <img :src="item.img | setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2 @tap="handeleToDetail(item.id)">
              {{item.nm}}
              <img v-if="item.version" src="@/assets/maxs.png" alt />
            </h2>
            <p>
              观众评
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>主演：{{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "MoviePlaying",
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
      isLoading:true,
      prevCityId:-1  //上一次城市的id
    };
  },
  activated() {  //activated在keep-alive组件激活时调用
   
    var cityId=this.$store.state.city.id; //获得id
    if(this.prevCityId===cityId) {return;}  //没有切换城市，切换了城市执行下面的链接
    this.isLoading=true;
    //console.log(123);
    this.axios.get("/api/movieOnInfoList").then(res => {
      // console.log(res);
      var msg = res.data.msg;
      if (msg === "ok") {
        this.isLoading=false;
        var data = res.data.data.movieList;
        var  {movieList}=this.handleToFlag(data);
        this.movieList=movieList;
         this.prevCityId=cityId;//请求成功后再进行赋值
       // console.log(this.ComingList);
        //   this.$nextTick();//保证数据赋完值后，页面渲染完毕
        //  var scroll = new BScroll(this.$refs.movie_body,{   //增加tap事件，即点击事件
        //         tap:true,
        //         probeType:1
        //   });//使得下划上划更加流畅，增加点击事件
        //   scroll.on('scroll',(pos)=>{  //向下拖拽有刷新功能
        //     // console.log('scroll');
        //     if(pos.y>30){
        //      this.pullDownMsg='正在更新中';
        //     }

        //   });
        //   scroll.on('touchEnd',(pos)=>{
        //     //console.log('touchend');
        //     if(pos.y>30){
        //       this.axios.get("/api/movieOnInfoList?cityId=11").then(res => {
        //         var msg = res.data.msg;
        //     if (msg == "ok") {
        //       this.pullDownMsg='更新成功';
        //       setTimeout(()=>{
        //         this.movieList = res.data.data.movieList;
        //         this.pullDownMsg='';
        //       },1000);
        //   }
        //       });
        //    }
        //   }) //拖拽结束后
      }
    });
  },
  methods: {
    handeleToDetail(movieId) {
      this.$router.push('/movie/detail/1/'+movieId);//用动态路由跳转到详情页
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    handleToFlag(datas){
       var cityId=this.$store.state.city.id;
       // console.log(cityId);
       var  movieList=[];
        for(var i=0;i<datas.length;i++){ 
           if(datas[i].flag==cityId)
            {
              movieList.push(datas[i]);
            }   
        }
        return{
             movieList
            };     
    },
   handleToToucheEnd(pos){
           if(pos.y>30){
              this.axios.get("/api/movieOnInfoList").then(res => {
                var msg = res.data.msg;
            if (msg == "ok") {
              this.pullDownMsg='更新成功';
              setTimeout(()=>{
                this.movieList = res.data.data.movieList;
                this.pullDownMsg='';
              },1000);
          }
              });
           }  
      }
    }  
  };
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
