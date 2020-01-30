<template>
    <div id="main" >
       <Header title="我的喵喵"/>
        <div id="content">
        <Login/>
        </div>
       <TabBar/>
    </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';  //引入Header和TabBar
import Login from '@/components/Login';
export default {
  name:'Mine',
  components: {
        Header,
        TabBar,
        Login
    }  //使用局部组件使其生效
}
</script>

<style>

</style>