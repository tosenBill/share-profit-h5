<template>
  <div class="changePassword fixed-bg" id="changePassword">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item">
          <input v-model.trim="passwords.oldPassword" type="password" placeholder="请输入旧密码" @blur="input_blur">
        </div>
        <div class="form-item">
          <input v-model.trim="passwords.newPassword" type="password" placeholder="请输入新密码" @blur="input_blur">
        </div>
        <div class="form-item">
          <input v-model.trim="passwords.confirmPassword" type="password" placeholder="请确认新密码" @blur="input_blur">
        </div>
      </div>
    </section>
    <footer>
      <div class="operate-btn" @click="complete_handle">完成</div>
    </footer>
  </div>
</template>
<script>

import {
  Toast
} from 'vant'
import HeaderNav from '@/components/HeaderNav.vue'

const pattern = /^[^\u4e00-\u9fa5]{0,}$/ // 不允许有中文
export default {
  data () {
    return {
      canSubmit: true,
      passwords: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  components: {
    HeaderNav,
    Toast
  },
  computed: {
  },
  mounted () {
    this.showList = true
  },
  methods: {
    validateForm (data) {
      if (!data.oldPassword) {
        this.$toast('请输入旧密码')
        return 0
      } else if (!data.newPassword) {
        this.$toast('请输入新密码')
        return 0
      } else if (!data.confirmPassword) {
        this.$toast('请确认新密码')
        return 0
      } else if (data.newPassword !== data.confirmPassword) {
        this.$toast('两次密码输入不一致')
        return 0
      } else if (!pattern.test(data.oldPassword) || !pattern.test(data.newPassword) || !pattern.test(data.confirmPassword)) {
        this.$toast('密码不能有中文')
        return 0
      } else {
        return 1
      }
    },
    async complete_handle () {
      if (this.validateForm(this.passwords) && this.canSubmit) {
        this.canSubmit = false
        this.loadingToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中...'
        })

        const params = {
          password: this.passwords.oldPassword,
          newPass: this.passwords.newPassword
        }
        const modifyPassword = await this.$http.modifyPassword(params).catch(err => {
          this.loadingToast.clear()
          console.log(err)
        })
        this.loadingToast.clear()

        if (modifyPassword && modifyPassword.code === '00000-00000') {
          Toast.success({
            message: '修改成功',
            duration: 1000
          })

          setTimeout(() => {
            this.$go_back()
          }, 1000)
        } else {
          this.$toast(modifyPassword.errMsg)
        }
        this.canSubmit = true
      }
    },
    input_blur () {
      // document.body.scrollTop = document.documentElement.scrollTop - 1
      setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight, 0))
      }, 100)
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
