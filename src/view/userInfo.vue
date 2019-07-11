<template>
  <div class="userInfo fixed-bg" id="userInfo">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item">
          <div class="label">姓名</div>
          <input type="text" placeholder="请输入您的姓名" name="username">
        </div>
        <div class="form-item">
          <div class="label">联系电话</div>
          <input type="text" placeholder="请输入您的联系电话" name="username">
        </div>
        <div class="form-item">
          <div class="label">身份证号码</div>
          <input type="text" placeholder="请输入您身份证号码" name="username">
        </div>
        <div class="form-item">
          <div class="label">银行卡号</div>
          <input type="text" placeholder="请输入您的银行卡" name="username">
        </div>
        <div class="form-item">
          <div class="label">银行卡开户行</div>
          <input type="text" placeholder="请输入您的开户行信息" name="username">
        </div>
        <div class="form-item">
          <div class="label">支付宝账号</div>
          <input type="text" placeholder="请输入您的支付宝账号" name="username">
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
  #userInfo{
    footer{
      display flex
      justify-content center
      margin-top 50px
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
      font-size:15px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:#8E8E93;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      font-size:15px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:#8E8E93;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
      font-size:15px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:#8E8E93;
    }
  }
</style>
