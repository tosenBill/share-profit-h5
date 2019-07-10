<template>
  <div class="register">
    <header>
      <img src="static/images/header-img.jpg" alt="">
    </header>
    <section>
      <img src="static/images/header-gradient.jpg" alt="" class="bg-gradient">
      <div class="content-box">
        <div class="form-info login">
          <h3>登录</h3>
          <div class="form-input">
            <div class="input-box">
              <div class="label">

              </div>
              <input type="text" placeholder="请输入手机号码" class="">
            </div>
            <div class="input-box">
              <div class="label">

              </div>
              <input type="text" placeholder="请输入密码" class="">
            </div>
          </div>
          <p class="forget-password-btn">忘记密码</p>
          <div class="btn login-btn">登录</div>
        </div>
        <div class="footer-bg"></div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
::-webkit-input-placeholder { /* WebKit browsers */
  font-size:13px;
  font-family:inpinheiti;
  font-weight:400;
  color:rgba(157,157,157,1);
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  font-size:13px;
  font-family:inpinheiti;
  font-weight:400;
  color:rgba(157,157,157,1);
}

:-ms-input-placeholder { /* Internet Explorer 10+ */
  font-size:13px;
  font-family:inpinheiti;
  font-weight:400;
  color:rgba(157,157,157,1);
}
  .register{
    img{
      vertical-align middle
    }
    header{
      min-height 220px
      >img{
        height 100%
        width 100%
      }
    }
    section{
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
            margin: 34px auto 0;
            .input-box{
              border-radius:26px;
              height 52px
              width 100%
              background #F8F8F8
              display flex
              .label{
                width 67px
              }
              input{
                color #333
                background #F8F8F8
                height 100%
                border none
                font-size 20px
              }
              &:first-child{
                margin-bottom 20px
              }
            }
          }
          &.login{
            color #fff
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
  }
</style>
