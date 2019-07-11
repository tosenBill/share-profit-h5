<template>
  <div class="addGroupPerson fixed-bg" id="addGroupPerson">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item">
          <input type="number" placeholder="请设置登录手机号">
        </div>
        <div class="form-item">
          <input type="password" placeholder="请设置登录密码">
        </div>
      </div>
      <p class="tip">注：登录账号请设置权益卡手机号</p>
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
  #addGroupPerson{
    section{
      margin-top 10px
      .input-item{
        height 44px
      }
      p.tip{
        margin-top 27px
        text-align: left;
        font-size:15px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,71,71,1);
      }
    }
    footer{
      display flex
      justify-content center
      margin-top 118px
    }
  }
</style>
