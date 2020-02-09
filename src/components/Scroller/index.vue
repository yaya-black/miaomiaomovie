<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: "Scroller",
  props:{
      //这两个都是对象
      handleToScroll:{
          type:Function,
          default:function(){}
      },
      handleToToucheEnd:{
          type:Function,
          default:function(){}
      }
  },
  mounted() {
    var scroll = new BScroll(this.$refs.wrapper, {
      //增加tap事件，即点击事件
      tap: true,
      probeType: 1
    });
    this.scroll=scroll;
    scroll.on('scroll',(pos)=>{
        this.handleToScroll(pos);

    });
    scroll.on('touchEnd',(pos)=>{
        this.handleToToucheEnd(pos);
    });
  },
  methods: {
     ToScrollTop(y) {
         this.scroll.scrollTo(0,y);

     }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
