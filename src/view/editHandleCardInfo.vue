<template>
  <div class="userInfo fixed-bg" id="handlePersonInfo">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item">
          <div class="label">姓名</div>
          <input readonly="readonly" v-model.trim="personInfo.name" type="text" placeholder="请输入办卡人姓名" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">联系电话</div>
          <input readonly="readonly" v-model="personInfo.contactNumber" type="number" placeholder="请输入办卡人联系电话" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">身份证号码</div>
          <input readonly="readonly" v-model.trim="personInfo.idCard" type="text" placeholder="请输入办卡人身份证号码" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">支付宝账号</div>
          <input readonly="readonly" v-model.trim="personInfo.aliPay" type="text" placeholder="请输入办卡人支付宝账号" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">新入网号码</div>
          <input readonly="readonly" v-model.trim="personInfo.cellPhone" type="number" placeholder="请输入办卡人所办号码" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">办理套餐</div>
          <input readonly="readonly" v-model.trim="personInfo.setMeal" type="number" placeholder="办理套餐" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">办卡时间</div>
          <input readonly="readonly" v-model.trim="personInfo.cardTime" type="text" placeholder="请输入办卡时间" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">收货地址</div>
          <input style="color:#333;" v-model.trim="personInfo.address" type="text" placeholder="请填写办卡人收货地址" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">权益礼包发放</div>
          <input readonly="readonly" v-model.trim="personInfo.deliveryType" type="text" placeholder="权益礼包发放" @blur="input_blur">
        </div>
        <div class="form-item registerToggle">
          <div class="label">是否注册每选</div>
          <van-switch disabled v-model="personInfo.isMx" active-color="#07c160"/>
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
  Switch
} from 'vant'

// import validateRule from '@/utils/index'
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
        deliveryType: '',
        cardTime: '',
        isMx: false,
        address: ''
      }
    }
  },
  components: {
    HeaderNav,
    Toast,
    Switch
  },
  computed: {
  },
  activated () {
    this.cellPhone = this.$route.params.cellPhone
    this.getCardItemInfo({ cellPhone: this.cellPhone })
  },
  mounted () {

  },
  methods: {
    async getCardItemInfo (params) {
      const getCardItemInfo = await this.$http.getCardItemInfo(params).catch(err => console.log(err))

      if (getCardItemInfo && getCardItemInfo.code === '00000-00000') {
        console.log(getCardItemInfo.data)
        this.personInfo = {
          ...this.personInfo,
          ...getCardItemInfo.data
        }

        this.personInfo.isMx = !!this.personInfo.isMx
      } else if (getCardItemInfo && getCardItemInfo.code === '00001-00004') {
        this.$toast('您没有权限执行此操作')
      } else {
        this.$toast(getCardItemInfo.errMsg)
      }
    },
    validateForm (data) {
      if (!data.address) {
        this.$toast('请输入办卡人收货地址')
        return 0
      } else if (data.address.length > 80) {
        this.$toast('收货地址不能大于80个字符')
        return 0
      } else {
        return 1
      }
    },
    async complete () {
      if (this.validateForm(this.personInfo) && this.canSubmit) {
        this.canSubmit = false

        this.loadingToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中...'
        })

        const params = {
          address: this.personInfo.address,
          cellPhone: this.personInfo.cellPhone
        }

        const updateCardHandleInfo = await this.$http.editHandCardPersonAddress(params).catch(err => console.log(err))
        this.loadingToast.clear()

        if (updateCardHandleInfo && updateCardHandleInfo.code === '00000-00000') {
          //
          Toast.success({
            message: '添加成功',
            duration: 1000
          })
          setTimeout(() => {
            this.$go_back()
          }, 1000)
        } else {
          this.$toast(updateCardHandleInfo.errMsg)
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
      deliveryType: '',
      cardTime: '',
      address: '',
      isMx: false
    }
  }
}
</script>
<style lang="stylus" scoped>
  #handlePersonInfo{
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    input{
      color:rgba(157,157,157,1);
    }
    .van-dropdown-menu{
      // border-radius: 10px 10px 0 0;
      margin-bottom: 10px;
      height: 44px;
      text-align: left;
      span{
          position absolute
          left 0
      }
    }
    .van-dropdown-item{
      margin 0 10px
    }
    // .van-dropdown-menu__item{
    //   justify-content flex-start !important
    // }
    // .van-cell__title{
    //   text-align left
    // }
    .drowndown-box{
      position relative
      .label{
        position: absolute;
        left: 0;
        z-index: 99;
        min-width:120px;
        font-size:18px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        text-align: left;
        height:44px;
        padding: 8px 10px;
      }
    }
    .registerToggle{
      display flex
      justify-content space-between
    }
    footer{
      display flex
      justify-content center
      margin 50px 0 30px 0
    }
    .showTime{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      background: rgba(0,0,0,.6);
      z-index: 99;
      .adolf-dateTime-picker{
        position absolute
        width 100%
        bottom 0
      }
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
