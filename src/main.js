// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Vuex from 'vuex'
import router from './router'
import axios from 'axios'//引入axios库，用来获取数据
import store from './stores'
require('./mock'); //引入mock数据，关闭则注释该行


// Vue.use(Vuex)
Vue.prototype.axios=axios;//制作反向代理
// Vue.prototype.HOST='/api'
// 制作全局过滤器
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
});
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);  //将Scroller做成全局组件

import Loading from '@/components/Loading'
Vue.component('Loading',Loading);

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store, //在配置vuex时一定要把这个写进来，否则有错误
})
