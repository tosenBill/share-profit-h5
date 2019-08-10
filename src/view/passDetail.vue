<template>
  <div class="passDetail fixed-bg" id="passDetail">
    <header-nav/>
    <section class="padding-10">
      <div class="form-list">
        <div class="form-item status">
          <div class="label">当前状态</div>
          <input readonly="readonly" v-model="personInfo.status" type="text" placeholder="" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">姓名</div>
          <input readonly="readonly" v-model.trim="personInfo.name" type="text" placeholder="" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">联系电话</div>
          <input readonly="readonly" v-model="personInfo.contactNumber" type="number" placeholder="" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">新入网号码</div>
          <input readonly="readonly" v-model.trim="personInfo.cellPhone" type="number" placeholder="" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">办理套餐</div>
          <input readonly="readonly" v-model.trim="personInfo.setMeal" type="text" placeholder="" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">收货地址</div>
          <input readonly="readonly" v-model.trim="personInfo.address" type="text" placeholder="" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">权益礼包发放</div>
          <input readonly="readonly" v-model.trim="personInfo.deliveryType" type="text" placeholder="" @blur="input_blur">
        </div>
      </div>
    </section>
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
      },
      id: ''
    }
  },
  components: {
    HeaderNav,
    Toast
  },
  computed: {
  },
  activated () {
    this.cellPhone = this.$route.params.cellPhone
    console.log(this.cellPhone)
    this.getHandleCardDetailByPhone({ cellPhone: this.cellPhone })
  },
  mounted () {

  },
  methods: {
    async getHandleCardDetailByPhone (params) {
      const getHandleCardDetailByPhone = await this.$http.getHandleCardDetailByPhone(params).catch(err => console.log(err))

      if (getHandleCardDetailByPhone && getHandleCardDetailByPhone.code === '00000-00000') {
        console.log(getHandleCardDetailByPhone.data)
        const status = getHandleCardDetailByPhone.data.status === '1' ? '已完成' : '未完成'

        this.personInfo = {
          ...this.personInfo,
          ...getHandleCardDetailByPhone.data,
          status
        }

        this.personInfo.isMx = !!this.personInfo.isMx

        console.log(this.personInfo)
      } else if (getHandleCardDetailByPhone && getHandleCardDetailByPhone.code === '00001-00004') {
        this.$toast('您没有权限执行此操作')
      } else {
        this.$toast(getHandleCardDetailByPhone.errMsg)
      }
    },
    async complete () {

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
  #passDetail{
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    input{
      color:rgba(157,157,157,1);
    }
    .form-item.status{
      input{
        color #06E315
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
