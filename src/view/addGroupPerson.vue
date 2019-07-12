<template>
  <div class="addGroupPerson fixed-bg" id="addGroupPerson">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item">
          <input type="number" v-model.trim="person.cellPhone" placeholder="请设置登录手机号" @blur="input_blur">
        </div>
        <div class="form-item">
          <input type="password" v-model.trim="person.password" placeholder="请设置登录密码" @blur="input_blur">
        </div>
      </div>
      <p class="tip">注：登录账号请设置权益卡手机号</p>
    </section>
    <footer>
      <div class="operate-btn" @click="complete">完成</div>
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
      canSubmit: true,
      person: {
        cellPhone: '',
        password: ''
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
  },
  methods: {
    validateForm (data) {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      const pattern = /^[^\u4e00-\u9fa5]{0,}$/ // 不允许有中文

      if (!data.cellPhone) {
        this.$toast('请输入手机号码')
        return 0
      } else if (!reg.test(data.cellPhone)) {
        this.$toast('请输入正确的手机号')
        return 0
      } else if (!data.password) {
        this.$toast('请输入密码')
        return 0
      } else if (!pattern.test(data.password)) {
        this.$toast('密码不能有中文')
        return 0
      } else {
        return 1
      }
    },
    async complete () {
      if (this.validateForm(this.person) && this.canSubmit) {
        this.canSubmit = false

        this.loadingToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中...'
        })
        // 掉接口
        const params = {
          cellPhone: this.person.cellPhone,
          password: this.person.password
        }
        const confirm = await this.$http.addGroupPerson(params).catch(err => console.log(err))

        this.loadingToast.clear()

        if (confirm && confirm.code === '00000-00000') {
          // ...
          Toast.success({
            message: '添加成功',
            duration: 1000
          })
          setTimeout(() => {
            this.$go_back()
          }, 1000)
        } else {
          this.$toast(confirm.errMsg)
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
  },
  deactivated () {
    this.person = {
      cellPhone: '',
      password: ''
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
