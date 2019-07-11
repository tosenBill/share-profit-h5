<template>
  <div class="changePassword fixed-bg" id="changePassword">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item">
          <input type="password" placeholder="请输入旧密码">
        </div>
        <div class="form-item">
          <input type="password" placeholder="请输入新密码">
        </div>
        <div class="form-item">
          <input type="password" placeholder="请确认新密码">
        </div>
      </div>
    </section>
    <footer>
      <div class="operate-btn">完成</div>
    </footer>
  </div>
</template>
<script>
import HeaderNav from '@/components/HeaderNav.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    HeaderNav
  },
  computed: {
  },
  mounted () {
    this.showList = true
  },
  methods: {
    go_userInfo () {
      this.$router.push({
        path: `/userInfo`
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  #changePassword{
    section{
      margin-top 10px
      .input-item{
        height 44px

      }
    }
    footer{
      display flex
      justify-content center
      margin-top 118px
    }
  }
</style>
