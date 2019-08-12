<template>
  <div class="passDetail fixed-bg" id="passDetail">
    <header-nav/>
    <section class="padding-10">
      <div class="status-outer">
        <div class="status-list">
          <p class="tip" v-if="unCompleteCount">距离佣金结算还有{{unCompleteCount}}项任务未完成</p>
          <div class="status-content clear">
            <div class="item">
              <span class="status-judge"
                :class="{'pass': personInfo.isPay == 1, 'failed': personInfo.isPay == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">充值缴费</span>
            </div>
            <div class="item">
              <span class="status-judge"
                :class="{'pass': personInfo.isFreeze == 1, 'failed': personInfo.isFreeze == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">余额宝冻结</span>
            </div>
            <div class="item">
              <span class="status-judge"
                :class="{'pass': personInfo.auditStatus == 1, 'failed': personInfo.auditStatus == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">资料审核</span>
            </div>
            <div class="item" v-if="personInfo.cardType == '0'">
              <span class="status-judge"
                :class="{'pass': personInfo.logisticsStatus == 1, 'failed': personInfo.logisticsStatus == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">权益卡邮寄</span>
            </div>
            <div class="item" v-if="personInfo.cardType == '0'">
              <span class="status-judge"
                :class="{'pass': personInfo.activateStatus == 1, 'failed': personInfo.activateStatus == 2}"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
              <span class="word">权益卡激活</span>
            </div>
          </div>
        </div>
        <p class="unCompleteCount" v-if="pageComplete && !unCompleteCount && showHQ">总部结算中</p>
        <div class="detail-tip" style="color:#e4393c" v-if="personInfo.errorMsg">{{personInfo.errorMsg || ''}}</div>
        <div class="logistics" v-if="personInfo.logisticsNum && personInfo.activateStatus != 1">
          <div class="logistics-item">
            <div>
              <span class="label">物流公司：</span>
              <span>{{personInfo.logisticsCompany || ''}}</span>
            </div>
            <div>
              <span class="label">物流单号：</span>
              <span>{{personInfo.logisticsNum || ''}}</span>
            </div>
          </div>
          <div class="logistics-item">
            <div>
              <span class="label">收 件 人：</span>
              <span>{{personInfo.receiverName || ''}}</span>
            </div>
            <div>
              <span class="label">联系电话：</span>
              <span>{{personInfo.receiverPhone || ''}}</span>
            </div>
          </div>
          <div class="logistics-item">
            <div>
              <span class="label">收货地址：</span>
              <span>{{personInfo.receiverAddress || ''}}</span>
            </div>
          </div>
        </div>

        <div class="next-tip" v-if="personInfo.nextStep">下一步操作提示：</div>
        <div class="tip-content">{{personInfo.nextStep || ''}}</div>
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
          <input readonly="readonly" v-model.trim="personInfo.address" type="text" placeholder="">
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
      showHQ: false,
      unCompleteCount: 0,
      pageComplete: false, // 数据是否加载完
      personInfo: {
        name: '',
        contactNumber: '',
        cellPhone: '',
        setMeal: '',
        deliveryType: '',
        address: '',
        cardType: 1, // 0：线上；1：熟卡
        auditStatus: 0, // 审核状态 --- 0：没操作；1，已操作；2：异常
        activateStatus: 0, // 激活状态
        logisticsStatus: 0, // 物流状态
        isFreeze: 0, // 是否冻结
        isPay: 0, // 是否缴费
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
    this.showHQ = false
    this.pageComplete = false
    this.cellPhone = this.$route.params.cellPhone

    console.log(this.cellPhone)
    this.loadingToast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '正在加载...'
    })

    this.getHandleCardDetailByPhone({ cellPhone: this.cellPhone })
  },
  mounted () {

  },
  methods: {
    async getHandleCardDetailByPhone (params) {
      const getHandleCardDetailByPhone = await this.$http.getHandleCardDetailByPhone(params).catch(err => console.log(err))
      if (getHandleCardDetailByPhone && getHandleCardDetailByPhone.code === '00000-00000') {
        console.log(getHandleCardDetailByPhone.data)
        this.personInfo = {
          ...this.personInfo,
          ...getHandleCardDetailByPhone.data
        }

        console.log(this.personInfo)
        this.personInfo.auditStatus !== '1' && this.unCompleteCount++
        this.personInfo.activateStatus !== '1' && this.unCompleteCount++
        this.personInfo.logisticsStatus !== '1' && this.unCompleteCount++
        this.personInfo.isFreeze !== '1' && this.unCompleteCount++
        this.personInfo.isPay !== '1' && this.unCompleteCount++

        this.showHQ = true
      } else {
        this.$toast(getHandleCardDetailByPhone.errMsg)
      }
      this.loadingToast.clear()
      this.pageComplete = true
    }
  },
  deactivated () {
    this.unCompleteCount = 0
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
        .unCompleteCount{
          text-align: left;
          margin: 5px 0;
          font-weight: bold;
        }
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
              // margin-right 40px
              margin-bottom 15px
              width: 33%;
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
        .logistics{
          text-align left
          margin-top: 10px;
          padding: 0 10px;
          .logistics-item{
            display flex;
            justify-content space-between
            margin-bottom: 3px;
            >div{
              flex:1
              display flex;
            }
            .label{
              width: 70px
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
          font-size:12px;
          font-family:PingFang-SC-Medium;
          color:rgba(51,51,51,1);
          text-align left
          margin 5px 0 10px 0
        }
        .tip-content{
          font-size:14px;
          font-weight:500;
          min-height 30px
          margin-bottom 10px
          text-align: left;
          // text-indent 2em
        }
      }
    }
  }
</style>
