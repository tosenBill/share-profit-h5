<template>
  <div class="userInfo fixed-bg" id="handlePersonInfo">
    <header-nav v-if="!queryId"/>
    <header-title :headerTitle="headerTitle" v-else/>
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
        <!-- <div class="form-item">
          <div class="label">身份证号码</div>
          <input v-model.trim="personInfo.idCard" type="text" placeholder="请输入办卡人身份证号码" @blur="input_blur">
        </div>
        <div class="form-item">
          <div class="label">支付宝账号</div>
          <input v-model.trim="personInfo.aliPay" type="text" placeholder="请输入办卡人支付宝账号" @blur="input_blur">
        </div> -->
        <div class="form-item">
          <div class="label">新入网号码</div>
          <input v-model.trim="personInfo.cellPhone" type="number" placeholder="请输入办卡人所办号码" @blur="input_blur">
        </div>
        <div class="drowndown-box">
          <div class="label">办理套餐</div>
          <van-dropdown-menu class="adolf-dropdown-menue" :z-index='999'>
            <van-dropdown-item :title="titlePlaceholder" @change="dropdownChange" v-model="personInfo.setMeal" :options="option1" class="adolf-dropdown-item" />
          </van-dropdown-menu>
        </div>
        <!-- <div class="form-item">
          <div class="label">办卡时间</div>
          <input @click="showDateTime = true" readonly="readonly" v-model.trim="personInfo.cardTime" type="text" placeholder="请输入办卡时间" @blur="input_blur">
        </div> -->
        <div class="form-item">
          <div class="label">收货地址</div>
          <input v-model.trim="personInfo.address" type="text" placeholder="请填写办卡人收货地址" @blur="input_blur">
        </div>
        <div class="drowndown-box">
          <div class="label">权益礼包发放</div>
          <van-dropdown-menu class="adolf-dropdown-menue">
            <van-dropdown-item :title="deliveryTypePlaceholder" @change="giftDropdownChange" v-model="personInfo.deliveryType" :options="option2" class="adolf-dropdown-item" />
          </van-dropdown-menu>
        </div>
        <!-- <div class="form-item registerToggle">
          <div class="label">是否注册每选</div>
          <van-switch v-model="personInfo.isMx" active-color="#07c160"/>
        </div> -->
      </div>
    </section>
    <footer>
      <div class="operate-btn" @click="complete">完成</div>
    </footer>
    <!-- <div class="showTime" v-if="showDateTime">
      <van-datetime-picker
        class="adolf-dateTime-picker"
        v-model="currentDate"
        type="datetime"
        @confirm="datetime_confirm"
        @cancel="showDateTime = false"
      />
    </div> -->
  </div>
</template>
<script>

import {
  Toast,
  // Switch,
  DropdownMenu,
  DropdownItem
  // DatetimePicker
} from 'vant'

// import validateRule from '@/utils/index'
import HeaderTitle from '@/components/HeaderTitle.vue'
import HeaderNav from '@/components/HeaderNav.vue'
export default {
  data () {
    return {
      canSubmit: true,
      personInfo: {
        name: '',
        contactNumber: '',
        cellPhone: '',
        setMeal: '',
        deliveryType: '',
        address: ''
      },
      titlePlaceholder: '请选择办理套餐档位',
      deliveryTypePlaceholder: '请选择发放方式',
      option1: [
        // { text: '办理套餐档位', value: 0 },
        { text: '108套餐', value: 1 },
        { text: '198套餐', value: 2 }
      ],
      option2: [
        { text: '总部发放', value: 1 },
        { text: '推广人自行发放', value: 2 }
      ],
      currentDate: new Date(),
      showDateTime: false,
      headerTitle: { title: '添加办卡人信息' },
      queryId: ''
    }
  },
  components: {
    HeaderTitle,
    HeaderNav,
    Toast,
    // Switch,
    DropdownMenu,
    DropdownItem
    // DatetimePicker
  },
  computed: {
  },
  mounted () {

  },
  activated () {
    const query = this.$route.query

    if (query.parentId) {
      this.queryId = query.parentId
    }
  },
  methods: {
    formatGMT (gmt, long) {
      // long = !long ? false : true
      let date = new Date(gmt)

      let m = (date.getMonth() + 1)
      let mm = '-' + (m < 10 ? '0' + m : m)
      let d = date.getDate()
      let dd = '-' + (d < 10 ? '0' + d : d)
      let h = date.getHours()
      let hh = ' ' + (h < 10 ? '0' + h : h)
      let i = date.getMinutes()
      let ii = ':' + (i < 10 ? '0' + i : i)

      return date.getFullYear() + mm + dd + (long ? (hh + ii) : '')
    },
    datetime_confirm (val) {
      this.personInfo.cardTime = this.formatGMT(val, true)
      this.showDateTime = false
    },
    dropdownChange (val) {
      this.option1.forEach(item => {
        if (val === item.value) {
          this.titlePlaceholder = item.text
          this.personInfo.setMeal = item.text
        }
      })
    },
    giftDropdownChange (val) {
      this.option2.forEach(item => {
        if (val === item.value) {
          this.deliveryTypePlaceholder = item.text
          this.personInfo.deliveryType = item.text
        }
      })
    },
    validateForm (data) {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/

      if (!data.name) {
        this.$toast('请输入办卡人姓名')
        return 0
      } else if (!data.contactNumber) {
        this.$toast('请输入办卡人联系电话')
        return 0
      } else if (!reg.test(data.contactNumber)) {
        this.$toast('请输入正确的联系电话')
        return 0
      } else if (!data.cellPhone) {
        this.$toast('请输入办卡人所办号码')
        return 0
      } else if (!reg.test(data.cellPhone)) {
        this.$toast('请输入正确的所办号码')
        return 0
      } else if (!data.setMeal) {
        this.$toast('请选择办卡人办理套餐档位')
        return 0
      } else if (!data.address) {
        this.$toast('请输入办卡人收货地址')
        return 0
      } else if (!data.deliveryType) {
        this.$toast('请选择发放方式')
        return 0
      } else if (!data.address) {
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
        this.loadingToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中...'
        })

        const params = {
          ...this.personInfo
        }
        this.queryId && (params.parentId = this.queryId)
        // params.isMx = (!this.personInfo.isMx ? '0' : '1')

        const addCardHandleInfo = await this.$http.addCardHandleInfo(params).catch(err => console.log(err))
        this.loadingToast.clear()

        if (addCardHandleInfo && addCardHandleInfo.code === '00000-00000') {
          //
          Toast.success({
            message: '添加成功',
            duration: 1000
          })
          if (!this.queryId) {
            setTimeout(() => {
              this.$go_back()
            }, 1000)
          }
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
      setMeal: '',
      deliveryType: '',
      cardTime: '',
      address: ''
    }
    this.titlePlaceholder = '请选择办理套餐档位'
    this.deliveryTypePlaceholder = '请选择发放方式'
  }
}
</script>
<style lang="stylus" scoped>
  #handlePersonInfo{
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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
