//状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
 

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      
    },
    mutations:{

    },
    actions:{

    },
    modules:{
      city  //index与值都为city,引入子模块，即子组件
    }
})