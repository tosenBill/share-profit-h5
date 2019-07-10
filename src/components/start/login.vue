<template>
  <div id="login">
    <div>{{text}}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      text: '这是登录页面'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'userInfo'])
  },
  mounted () {
    console.log(this.userInfo)
  }
}
</script>
<style lang="stylus" scoped>

</style>
