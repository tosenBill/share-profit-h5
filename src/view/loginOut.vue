<template>
  <div class="loginOut fixed-bg" id="loginOut">
    <header-nav/>
    <section class="padding-10">
      <div class="list">
        <div class="item-info" @click="go_userInfo">
          <span class="label">个人信息</span>
          <span class="arrow arrow-right"></span>
        </div>
        <div class="item-info" @click="changePassword">
          <span class="label">修改密码</span>
          <span class="arrow arrow-right"></span>
        </div>
      </div>
    </section>
    <footer>
      <div class="operate-btn" @click="loginOut">注销</div>
    </footer>
  </div>
</template>
<script>
import {
  Toast
} from 'vant'

import HeaderNav from '@/components/HeaderNav.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    HeaderNav,
    Toast
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    loginOut () {
      this.loadingToast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在注销...'
      })
      this.$http.loginOut().catch(err => {
        console.log(err)
        this.loadingToast.clear()
      })
        .then(res => {
          this.loadingToast.clear()

          sessionStorage.removeItem('token')
          this.$router.replace({ path: '/' })
        })
    },
    go_userInfo () {
      this.$router.push({
        path: `/userInfo`
      })
    },
    changePassword () {
      this.$router.push({
        path: `/changePassword`
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  #loginOut{
    header{
      width 355px
      min-height 88px
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 5px 0px rgba(231,231,231,1);
      border-radius:5px;
      padding-right 22px
      // display flex
      .user-info{
        display: flex;
        align-items: center;
        height 88px
        >div{
          flex: 1;
          display: flex;
          align-items: center;
          img{
            width:40px;
            height:40px;
            background:rgba(216,216,216,1);
            border-radius 50%
            margin-left 10px
          }
          span{
            font-size:18px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            margin-left 24px
          }
        }
      }
    }
    section{
      margin-top 10px
      .list{}
    }
    footer{
      display flex
      justify-content center
      margin-top 291px
    }
  }
</style>
