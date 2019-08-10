<template>
  <div id="app">
    <!-- <router-view v-if="$route.meta.keepAlive"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (localStorage.getItem('store')) { // 页面加载前读取localStorage里的状态信息
      this.$store.replaceState(Object.assign(
        {},
        this.$store.state,
        JSON.parse(decodeURIComponent(localStorage.getItem('store'))))
      )
    }

    window.addEventListener('beforeunload', () => { // 在页面刷新前将vuex里的信息保存到localStorage里
      localStorage.setItem('store', encodeURIComponent(JSON.stringify(this.$store.state)))
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
/* #app>header,
#app>footer{
  background: #eee;
} */
</style>
