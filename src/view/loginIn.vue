<template>
  <div class="loginIn">
    <header>
      <img src="static/images/header-img.jpg" alt="">
    </header>
    <section>
      <!-- <img src="static/images/header-gradient.jpg" alt="" class="bg-gradient"> -->
      <div class="content-box">
        <div class="form-info login" v-if="showLoginForm">
          <h3>登录</h3>
          <div class="form-input">
            <div class="input-box">
              <div class="label">
                <img class="icon-header" src="static/images/icon-header.png" alt="">
              </div>
              <input v-model.trim="loginForm.cellPhone" type="number" pattern="[0-9]*" placeholder="请输入手机号码" @blur="input_blur" class="">
            </div>
            <div class="input-box">
              <div class="label">
                <img class="icon-local" src="static/images/icon-local.png" alt="">
              </div>
              <input v-model.trim="loginForm.password" type="password" placeholder="请输入密码" @blur="input_blur" class="">
            </div>
          </div>
          <p class="forget-password-btn" @click="showLoginForm = !showLoginForm">忘记密码</p>
          <div class="btn login-btn" @click="login_in_handle">登录</div>
        </div>
        <div class="form-info forgot" v-if="!showLoginForm">
          <h3>忘记密码</h3>
          <div class="form-input">
            <div class="input-box">
              <div class="label">
                <img class="icon-header" src="static/images/icon-header.png" alt="">
              </div>
              <input v-model.trim="forgotForm.cellPhone" type="number" placeholder="请输入手机号码" @blur="input_blur" class="">
            </div>
            <div class="input-box code">
              <input v-model="forgotForm.code" oninput="if(value.length>6)value=value.slice(0,6)" type="number" @blur="input_blur" placeholder="验证码">
              <div class="getcode">
                <span v-if="cutDown == 60" @click="get_code_handle" class="get">获取验证码</span>
                <span v-else class="timedown">{{cutDown}}s</span>
              </div>
            </div>
            <div class="input-box">
              <div class="label">
                <img class="icon-local" src="static/images/icon-local.png" alt="">
              </div>
              <input v-model.trim="forgotForm.password" type="password" @blur="input_blur" placeholder="请输入新密码" class="">
            </div>
          </div>
          <p class="forget-password-btn now-loginIn" @click="showLoginForm = !showLoginForm">立即登录</p>
          <div class="btn forgot-btn" @click="confirm_set_newPassword">设置完成</div>
        </div>
        <div class="footer-bg"></div>
      </div>
    </section>
    <div v-show="showTip" class="toast">{{toastTitle}}</div>
  </div>
</template>
<script>
import * as types from '@/store/type'

import {
  Toast
} from 'vant'
const pattern = /^[^\u4e00-\u9fa5]{0,}$/ // 不允许有中文
export default {
  data () {
    return {
      showLoginForm: true,
      loginForm: {
        cellPhone: '',
        password: ''
      },
      forgotForm: {
        cellPhone: '',
        code: '',
        password: ''
      },
      cutDown: 60,
      canSubmit: true,
      showTip: false,
      toastTitle: null,
      timer: null
    }
  },
  methods: {
    input_blur () {
      // document.body.scrollTop = document.documentElement.scrollTop - 1
      setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight, 0))
      }, 100)
    },
    get_code_handle () {
      console.log(111)
      if (this.validatePhone(this.forgotForm.cellPhone)) {
        // 掉接口
        this.$http.sendCode({cellPhone: this.forgotForm.cellPhone})
          .then(res => {
            // console.log(res)
            if (res.code === '00000-00000') {
              this.showToast('验证码已发送')
              this.startInterval()
            } else {
              this.showToast(res.errMsg)
            }
          })
      }
    },
    validatePhone (phone) {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!phone) {
        this.showToast('请输入手机号码')
        return 0
      } else if (!reg.test(phone)) {
        this.showToast('请输入正确的手机号')
        return 0
      } else {
        return 1
      }
    },
    validateForm (data) {
      // else if (data.password.length < 6) {
      //   this.showToast('密码必须大于6位字符')
      //   return 0
      // }
      if (!this.validatePhone(data.cellPhone)) {
        return 0
      } else if (!data.code) {
        this.showToast('请输入验证码')
        return 0
      } else if (!data.password) {
        this.showToast('请输入新密码')
        return 0
      } else if (!pattern.test(data.password)) {
        this.showToast('密码不能有中文')
        return 0
      } else {
        return 1
      }
    },
    validateLoginForm (data) {
      if (!this.validatePhone(data.cellPhone)) {
        return 0
      } else if (!data.password) {
        this.showToast('请输入密码')
        return 0
      } else if (!pattern.test(data.password)) {
        this.showToast('密码不能有中文')
        return 0
      } else {
        return 1
      }
    },
    startInterval () {
      this.timer = setInterval(() => {
        if (this.cutDown > 0) {
          this.cutDown--
        } else {
          clearInterval(this.timer)
          this.timer = null
          this.cutDown = 60
        }
      }, 1000)
    },
    async confirm_set_newPassword () {
      if (this.validateForm(this.forgotForm) && this.canSubmit) {
        this.canSubmit = false

        this.loadingToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中...'
        })
        // 掉接口
        const params = {
          cellPhone: this.forgotForm.cellPhone,
          pwdCode: this.forgotForm.code,
          newPass: this.forgotForm.password
        }
        const confirm = await this.$http.setPassword(params).catch(err => console.log(err))
        if (confirm && confirm.code === '00000-00000') {
          // ...
          this.showToast('设置成功')
          setTimeout(() => {
            this.showLoginForm = true
          }, 1000)
        } else {
          this.showToast(confirm.errMsg)
        }
        this.loadingToast.clear()
        this.canSubmit = true
        /*
        this.$http.register(params).then(res => {
          this.loadingToast.clear()
          if (res.code !== 0) {
            this.showToast(res.msg)
          } else {
            // ...
            this.showToast('获取用户信息失败！')
          }

          this.canSubmit = true
        })
          .catch(() => {
            this.showToast('失败，请重新注册！')
            this.loadingToast.clear()

            this.canSubmit = true
          })
        */
      }
    },
    // 登录
    async login_in_handle () {
      // this.$router.replace({
      //   path: `/home`
      // })

      if (this.validateLoginForm(this.loginForm) && this.canSubmit) {
        this.canSubmit = false

        this.loadingToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在登录...'
        })
        // 掉接口
        const params = {
          cellPhone: this.loginForm.cellPhone,
          password: this.loginForm.password
        }
        // console.log(params)
        // localStorage.setItem('token', 'fhlafhpdafhpda111')

        const loginIn = await this.$http.loginIn(params).catch(err => console.log(err))
        console.log(loginIn)
        if (loginIn && loginIn.code === '00000-00000') {
          // ...
          localStorage.setItem('token', loginIn.data.token)

          this.$store.commit(types.USER_TYPE, 1)

          this.$router.replace({
            path: `/home`
          })
        } else {
          loginIn && loginIn.errMsg && this.showToast(loginIn.errMsg)
        }
        this.loadingToast.clear()
        this.canSubmit = true
        /*
        this.$http.register(params).then(res => {
          this.loadingToast.clear()
          if (res.code !== 0) {
            this.showToast(res.msg)
          } else {
            // ...
            this.showToast('获取用户信息失败！')
          }

          this.canSubmit = true
        })
          .catch(() => {
            this.showToast('失败，请重新注册！')
            this.loadingToast.clear()

            this.canSubmit = true
          })
        */
      }
    },
    showToast (title) {
      this.showTip = true
      this.toastTitle = title
      setTimeout(() => {
        this.showTip = false
      }, 1500)
    }
  },
  deactivated () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style lang="stylus" scoped>
  .loginIn{
    display: flex;
    flex-direction: column;
    img{
      vertical-align middle
    }
    header{
      height 220px
      >img{
        height 100%
        width 100%
      }
    }
    section{
      flex 1
      background: linear-gradient(#ff7091 , #fe846d);
      position relative
      img{
        // display none
      }
      .content-box{
        padding 29px 0 21px
        box-sizing border-box
        height 333px
        width 353px
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 21px 0px rgba(255,24,92,0.18);
        border-radius:16px;
        .form-info{
          >h3{
            text-align: left;
            padding-left: 42px;
            line-height: 25px;
            font-size:28px;
            font-family:iekie-jianyuanti;
            font-weight:normal;
            color:rgba(255,136,144,1);
          }
          .form-input{
            width 293px
            margin: 24px auto 0;
            .input-box{
              border-radius:26px;
              height 52px
              width 100%
              background #F8F8F8
              display flex
              .label{
                width 67px
                display: flex;
                justify-content: center;
                align-items: center;
                img.icon-header{
                  width 18px
                  height 18px
                }
                img.icon-local{
                  width 16px
                  height 18px
                }
              }
              input{
                color #333
                background #F8F8F8
                height 100%
                border none
                font-size 16px
              }
              &:first-child{
                margin-bottom 20px
              }
              &.code{
                background #fff
                input{
                  width:143px;
                  border-radius:20px;
                  margin-right 13px
                  background:rgba(248,248,248,1);
                  text-align: center;
                }
                .getcode{
                  width:143px;
                  height:40px;
                  border:5px solid rgba(248,248,248,1);
                  border-radius:20px;
                  box-sizing border-box
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  span{
                    font-size:12.5px;
                    font-family:PingFang-SC-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                  }
                }
              }
            }
          }
          &.login{
            color #fff
          }
          &.forgot{
            .input-box{
              height 40px
              margin-bottom 12.5px
              &:last-child{
                // margin-bottom 35px
              }
            }
          }
        }
        .forget-password-btn{
          width 293px
          font-size:13px;
          font-family:inpinheiti;
          font-weight:400;
          color:rgba(206,206,206,1);
          margin 6px auto 26px
          text-align right
          padding-right 15px
          &.now-loginIn{
            margin-bottom 10px
            color #e4393c
          }
        }
        .btn{
          width:302px;
          height:45px;
          background:linear-gradient(to right,#FE9D6E, #FF49AC);
          border-radius:27.5px;
          font-size:15px;
          font-family:inpinheiti;
          font-weight:400;
          color:rgba(255,255,255,1);
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          &.forgot-btn{
            font-family:Adobe Heiti Std R;
            font-weight:normal;
            letter-spacing: 10px;
          }
        }
        .footer-bg{
          position: absolute;
          top: 333px;
          left: 50%;
          transform: translateX(-50%);
          width:309px;
          height:50px;
          background:rgba(255,255,255,1);
          opacity:0.89;
          border-radius:0 0 16px 16px;
        }
      }
    }
    .toast{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%);
      width:200px;
      height:35px;
      background:rgba(51,51,51,1);
      opacity:0.8;
      border-radius:10px;
      display flex
      justify-content center
      align-items center
      font-size:17px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#fff;
      z-index: 99;
    }
  }
</style>
