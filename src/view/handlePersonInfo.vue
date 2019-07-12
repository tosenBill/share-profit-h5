<template>
  <div class="userInfo fixed-bg" id="handlePersonInfo">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item">
          <div class="label">姓名</div>
          <input v-model.trim="personInfo.name" type="text" placeholder="请输入办卡人姓名" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">联系电话</div>
          <input v-model="personInfo.contactNumber" type="number" placeholder="请输入办卡人联系电话" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">身份证号码</div>
          <input v-model.trim="personInfo.idCard" type="number" placeholder="请输入办卡人身份证号码" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">支付宝账号</div>
          <input v-model.trim="personInfo.aliPay" type="text" placeholder="请输入办卡人支付宝账号" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">办卡号码</div>
          <input v-model.trim="personInfo.cellPhone" type="number" placeholder="请输入办卡人所办号码" @blur="input_blur">
        </div>
        <!-- <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu> -->
        <div class="form-item">
          <div class="label">套餐档位</div>
          <input v-model.trim="personInfo.setMeal" type="text" placeholder="请输入办卡人办理套餐档位" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">办卡时间</div>
          <input v-model.trim="personInfo.cardTime" type="text" placeholder="请输入办卡时间" @blur="input_blur">
        </div>
        <div class="form-item registerToggle">
          <div class="label">是否注册每选</div>
          <!-- <input type="text" placeholder="请输入办卡人是否注册每选"> -->
          <van-switch v-model="personInfo.isMx" active-color="#07c160"/>
        </div>
      </div>
    </section>
    <footer>
      <div class="operate-btn" @click="complete">完成</div>
    </footer>
  </div>
</template>
<script>

import {
  Toast,
  Switch,
  DropdownMenu,
  DropdownItem
} from 'vant'

import validateRule from '@/utils/index'
import HeaderNav from '@/components/HeaderNav.vue'
export default {
  data () {
    return {
      canSubmit: true,
      personInfo: {
        name: '',
        contactNumber: '',
        cellPhone: '',
        aliPay: '',
        idCard: '',
        setMeal: '',
        cardTime: '',
        isMx: false
      }
    }
  },
  components: {
    HeaderNav,
    Toast,
    Switch,
    DropdownMenu,
    DropdownItem
  },
  computed: {
  },
  mounted () {

  },
  methods: {
    validateForm (data) {
      if (!data.name) {
        this.$toast('请输入办卡人姓名')
        return 0
      } else if (!data.contactNumber) {
        this.$toast('请输入办卡人联系电话')
        return 0
      } else if (!validateRule.isPhoneNum(data.contactNumber)) {
        this.$toast('请输入正确的联系电话')
        return 0
      } else if (!data.idCard) {
        this.$toast('请输入办卡人身份证号码')
        return 0
      } else if (!validateRule.isIdCard(data.idCard)) {
        this.$toast('请输入正确的身份证号码')
        return 0
      } else if (!data.aliPay) {
        this.$toast('请输入办卡人支付宝账号')
        return 0
      } else if (!data.cellPhone) {
        this.$toast('请输入办卡人所办号码')
        return 0
      } else if (!validateRule.isPhoneNum(data.cellPhone)) {
        this.$toast('请输入正确的所办号码')
        return 0
      } else if (!data.setMeal) {
        this.$toast('请输入办卡人办理套餐档位')
        return 0
      } else if (!data.cardTime) {
        this.$toast('请输入办卡时间')
        return 0
      } else {
        return 1
      }
    },
    async complete () {
      if (this.validateForm(this.personInfo) && this.canSubmit) {
        this.loadingToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中...'
        })

        const params = {
          ...this.personInfo
        }
        params.isMx = (!this.personInfo.isMx ? '0' : '1')

        const addCardHandleInfo = await this.$http.addCardHandleInfo(params).catch(err => console.log(err))
        this.loadingToast.clear()

        if (addCardHandleInfo && addCardHandleInfo.code === '00000-00000') {
          //
          Toast.success({
            message: '添加成功',
            duration: 1000
          })
          setTimeout(() => {
            this.$go_back()
          }, 1000)
        } else {
          this.$toast(addCardHandleInfo.errMsg)
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
    this.personInfo = {
      name: '',
      contactNumber: '',
      cellPhone: '',
      aliPay: '',
      idCard: '',
      setMeal: '',
      cardTime: '',
      isMx: false
    }
  }
}
</script>
<style lang="stylus" scoped>
  #handlePersonInfo{
    .van-dropdown-menu{
      // border-radius: 10px 10px 0 0;
      margin-bottom: 10px;
      height: 44px;
    }
    .registerToggle{
      display flex
      justify-content space-between
    }
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
