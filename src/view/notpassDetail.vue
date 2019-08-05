<template>
  <div class="passDetail fixed-bg" id="passDetail">
    <header-nav/>
    <section class="padding-10">
      <div class="status-outer">
        <div class="status-list">
          <p class="tip">还剩下5项任务未完成</p>
          <div class="status-content clear">
            <div class="item">
              <span class="status-judge"
                :class="{'pass': personInfo.auditStatus == 1, 'failed': personInfo.auditStatus == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">资料审核</span>
            </div>
            <div class="item">
              <span class="status-judge"
                :class="{'pass': personInfo.isFreeze == 1, 'failed': personInfo.isFreeze == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">充值缴费</span>
            </div>
            <div class="item">
              <span class="status-judge"
                :class="{'pass': personInfo.isPay == 1, 'failed': personInfo.isPay == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">余额宝冻结</span>
            </div>
            <div class="item">
              <span class="status-judge"
                :class="{'pass': personInfo.logisticsStatus == 1, 'failed': personInfo.logisticsStatus == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">号卡邮寄</span>
            </div>
            <div class="item">
              <span class="status-judge"
                :class="{'pass': personInfo.activateStatus == 1, 'failed': personInfo.activateStatus == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">激活号卡</span>
            </div>
          </div>
        </div>
        <div class="detail-tip">{{personInfo.errorMsg}}</div>
        <!-- <div class="next-tip">正在审核、余额宝未冻结。</div> -->
        <div class="tip-content"></div>
      </div>
      <div class="form-list">
        <div class="form-item">
          <div class="label">姓名</div>
          <input readonly="readonly" v-model.trim="personInfo.name" type="text" placeholder="">
        </div>
        <div class="form-item">
          <div class="label">联系电话</div>
          <input readonly="readonly" v-model="personInfo.contactNumber" type="number" placeholder="">
        </div>
        <div class="form-item">
          <div class="label">新入网号码</div>
          <input readonly="readonly" v-model.trim="personInfo.cellPhone" type="number" placeholder="">
        </div>
        <div class="form-item">
          <div class="label">办理套餐</div>
          <input readonly="readonly" v-model.trim="personInfo.setMeal" type="text" placeholder="">
        </div>
        <div class="form-item">
          <div class="label">收货地址</div>
          <input style="color:#333;" v-model.trim="personInfo.address" type="text" placeholder="">
        </div>
        <div class="form-item">
          <div class="label">权益礼包发放</div>
          <input readonly="readonly" v-model.trim="personInfo.deliveryType" type="text" placeholder="">
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
      unCompleteCount: 0,
      personInfo: {
        name: '',
        contactNumber: '',
        cellPhone: '',
        setMeal: '',
        deliveryType: '',
        address: '',
        auditStatus: 0, // 审核状态 --- 0：没操作；1，已操作；2：异常
        activateStatus: 1, // 激活状态
        logisticsStatus: 2, // 物流状态
        isFreeze: 0, // 是否冻结
        isPay: 1, // 是否缴费
        status: 0, // 全局状态
        errorMsg: ''
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
    this.id = this.$route.params.id
    console.log(this.id)
    this.getHandleCardDetailById({ id: this.id })
  },
  mounted () {

  },
  methods: {
    async getHandleCardDetailById (params) {
      const getHandleCardDetailById = await this.$http.getHandleCardDetailById(params).catch(err => console.log(err))

      if (getHandleCardDetailById && getHandleCardDetailById.code === '00000-00000') {
        console.log(getHandleCardDetailById.data)
        this.personInfo = {
          ...this.personInfo,
          ...getHandleCardDetailById.data
        }

        this.personInfo.auditStatus === '0' && this.auditStatus++
        this.personInfo.activateStatus === '0' && this.activateStatus++
        this.personInfo.logisticsStatus === '0' && this.logisticsStatus++
        this.personInfo.isFreeze === '0' && this.isFreeze++
        this.personInfo.isPay === '0' && this.isPay++
      } else {
        this.$toast(getHandleCardDetailById.errMsg)
      }
    }
  },
  deactivated () {
    this.personInfo = {
      name: '',
      contactNumber: '',
      cellPhone: '',
      setMeal: '',
      deliveryType: '',
      address: '',
      auditStatus: 0, // 审核状态 --- 0：没操作；1，已操作；2：异常
      activateStatus: 0, // 激活状态
      logisticsStatus: 0, // 物流状态
      isFreeze: 0, // 是否冻结
      isPay: 0, // 是否缴费
      status: 0, // 全局状态
      errorMsg: ''
    }
    this.id = ''
  }
}
</script>
<style lang="stylus" scoped>
  #passDetail{
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    section {
      .form-list{
        padding-bottom: 30px;
        input{
          color:rgba(157,157,157,1);
        }
        .form-item.status{
          input{
            color #06E315
          }
        }
      }
      .status-outer{
        .status-list{
          padding: 10px;
          border-radius 5px;
          background #fff
          .tip{
            font-size:15px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:21px;
            text-align left
            margin-bottom 12px
          }
          .status-content{
            .item{
              height 22px
              display flex
              align-items: center;
              float left
              margin-right 40px
              margin-bottom 15px
              &.item:nth-child(3n+0) {
                margin-right 0
              }
              .status-judge{
                width 22px
                height 22px
                border-radius 50%
                background #D8D8D8
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                  display none
                }
                &.pass{
                  color: #fff;
                  background-color: #1989fa;
                  border-color: #1989fa;
                  i.fa-check{
                    display inline-block
                    font-size 14px
                  }
                }
                &.failed{
                  color #fff
                  background: #e4393c;
                  i.fa-exclamation{
                    display inline-block
                    font-size 14px
                  }
                }
              }
              .word{
                font-size:12px;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(142,142,147,1);
                margin-left 5px
              }
            }
          }
        }
        .detail-tip{
          font-size:12px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          margin 10px 0 23px 0
          text-align left
        }
        .next-tip{
          font-size:14px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          text-align left
        }
        .tip-content{
          min-height 30px
        }
      }
    }
  }
</style>
