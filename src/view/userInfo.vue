<template>
  <div class="userInfo fixed-bg" id="userInfo">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item">
          <div class="label">姓名</div>
          <input type="text" v-model.trim="myUserInfo.name" placeholder="请输入您的姓名" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">联系电话</div>
          <input type="number" v-model.trim="myUserInfo.contactNumber" placeholder="请输入您的联系电话" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">身份证号码</div>
          <input type="text" v-model.trim="myUserInfo.idCard" placeholder="请输入您身份证号码" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">银行卡号</div>
          <input type="number" v-model.trim="myUserInfo.bankCard"  placeholder="请输入您的银行卡" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">银行卡开户行</div>
          <input type="text" v-model.trim="myUserInfo.openingBank" placeholder="请输入您的开户行信息" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">支付宝账号</div>
          <input type="text" v-model.trim="myUserInfo.aliPay" placeholder="请输入您的支付宝账号" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">收货地址</div>
          <input v-model.trim="myUserInfo.address" type="text" placeholder="请填写收货地址" @blur="input_blur">
        </div>
      </div>
    </section>
    <footer>
      <div class="operate-btn" @click="complete">完成</div>
    </footer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/type'

import HeaderNav from '@/components/HeaderNav.vue'
import validateRule from '@/utils/index'

import {
  Toast
} from 'vant'

export default {
  data () {
    return {
      myUserInfo: {
        name: '',
        contactNumber: '',
        idCard: '',
        bankCard: '',
        openingBank: '',
        aliPay: '',
        address: ''
      },
      canSubmit: true
    }
  },
  components: {
    HeaderNav,
    Toast
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  activated () {
    const userInfo = this.userInfo
    console.log(userInfo)
    this.myUserInfo = {
      ...this.myUserInfo,
      ...userInfo
    }
    console.log(this.myUserInfo)
  },
  mounted () {
    console.log('userInfo mounted invoked!')

    // const userInfo = this.userInfo
    // console.log(userInfo)
    // this.myUserInfo = {
    //   ...this.myUserInfo,
    //   ...userInfo
    // }
    // console.log(this.myUserInfo)
  },
  methods: {
    validateForm (data) {
      if (!data.name) {
        this.$toast('请输入您的姓名')
        return 0
      } else if (!data.contactNumber) {
        this.$toast('请输入您的联系电话')
        return 0
      } else if (!data.idCard) {
        this.$toast('请输入您身份证号码')
        return 0
      } else if (!data.bankCard) {
        this.$toast('请输入您的银行卡')
        return 0
      } else if (!data.openingBank) {
        this.$toast('请输入您的开户行信息')
        return 0
      } else if (!data.aliPay) {
        this.$toast('请输入您的支付宝账号')
        return 0
      } else if (!data.address) {
        this.$toast('请输入您的收货地址')
        return 0
      } else if (data.address.length > 80) {
        this.$toast('收货地址不能大于80个字符')
        return 0
      } else if (!validateRule.isPhoneNum(data.contactNumber)) {
        this.$toast('请输入正确的联系号码')
        return 0
      } else if (!validateRule.isIdCard(data.idCard)) {
        this.$toast('请输入正确的身份证号')
        return 0
      } else return 1
    },
    async complete () {
      if (this.validateForm(this.myUserInfo) && this.canSubmit) {
        this.loadingToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中...'
        })

        const updateUserInfo = await this.$http.updateUserInfo(this.myUserInfo).catch(err => console.log(err))
        this.loadingToast.clear()

        if (updateUserInfo && updateUserInfo.code === '00000-00000') {
          //
          this.$store.commit(types.SET_USER_INFO, this.myUserInfo)
          Toast.success({
            message: '修改成功',
            duration: 1000
          })

          setTimeout(() => {
            this.$go_back()
          }, 1000)
        } else {
          this.$toast(updateUserInfo.errMsg)
          // this.$toast('提交失败')
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
