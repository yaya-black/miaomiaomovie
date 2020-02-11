// 主路由
import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import CinemaRouter from './Cinema'
import  MineRouter from './Mine'
import  MovieRouter from './Movie'

Vue.use(Router)

export default new Router({
  mode: 'history',
   base: process.env.BASE_URL,
  routes: [   
     CinemaRouter, //写的组件，这种方式不适用于大项目
     MineRouter,
     MovieRouter,
     {//重定向（遇到找不到的路由，重定向到Movie）
      path : '/*',
      redirect : '/Movie'
    }
  ]
})
 