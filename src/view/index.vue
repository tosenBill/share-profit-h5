<template>
<div class="page-view">
  <transition :name="transitionName">
    <keep-alive>
      <router-view class="child-view"/>
    </keep-alive>
  </transition>
</div>
</template>
<script>
export default {
  name: 'PageView',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    $route: function (to, from) {
      const isBack = this.$router.isBack
      // console.log(isBack)
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  }
}
</script>
<style lang="stylus" scoped>
  .child-view {
    position: absolute;
    width: 100%;
    height 100%;
    transition: all .2s cubic-bezier(.55, 0, .1, 1)
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(375px, 0);
    transform: translate(375px, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-375px, 0);
    transform: translate(-375px, 0);
}
</style>
