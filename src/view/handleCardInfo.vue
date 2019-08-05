<template>
  <div class="handleCardInfo" id="handleCardInfo">
    <header-nav :headerNav = 'headerNav' @addHasClick="add_handle">
    </header-nav>
    <header>
      <div class="tabs">
        <div
          class="tab"
          :class="{'active': query.type == index && userInfo.type != -1}"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="tab_index_handle(index)"
        >
          <span>{{tab.name || ''}}</span>
        </div>
      </div>
      <div class="classify">
        <div
          class="classify-name"
          v-for="(classify, status) in classifies"
          :class="{'active': query.status == status }"
          @click="classify_handle(status)"
          :key="status"
          >
          <span>{{classify || ''}}</span>
        </div>
      </div>
    </header>
    <section class="">
      <form action="" onsubmit="return false;" @submit.prevent >
        <input
          v-model.trim="query.cellPhone"
          ref="search_input"
          type="search"
          placeholder="搜索"
          @keyup.13="search_handle"
          class="search-input"
          @blur="input_blur"
        >
      </form>
      <div class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @check="check_scroll"
          :offset="50"
        >
          <van-cell>
            <div class="item" v-for="(item, index) in list" :key="index">
              <div class="list-item-info"
              :class="{active: item.cellPhone == flag, noActive: item.cellPhone !== flag}"
              @touchstart="touchS"
              @touchmove="touchM($event,item)"
              @click="handle_card_item(item, index)"
              >
                <div class="name">{{item.name || ''}}</div>
                <div class="phone">{{item.cellPhone || ''}}</div>
                <img v-if="index<5" src="static/images/pass.png" alt="">
                <img v-else src="static/images/not-pass.png" alt="">
              </div>
              <div class="list-swiper-operate-btn">
                <div class="del" @click="operate_handle('edit', item)">编辑</div>
              </div>
            </div>
          </van-cell>
        </van-list>

        <!-- <div class="item">
          <span>石荣成</span>
          <span>15175916591749</span>
          <img src="static/images/pass.png" alt="">
        </div>
        <div class="item">
          <span>沈小童</span>
          <span>15175916591749</span>
          <img src="static/images/notpass.png" alt="">
        </div> -->
      </div>
    </section>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import HeaderNav from '@/components/HeaderNav.vue'

import { List } from 'vant'
export default {
  data () {
    return {
      flag: null,
      startX: 0,
      delBtnWidth: 50,
      headerNav: {
        hasAddBtn: true
      },
      tabs: [],
      classifies: [],
      query: {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        status: 0, // 全部0，通过1，未通过2
        type: 0 // 直推信息代表’1‘，间推 ’0‘
      },
      list: [],
      loading: false,
      finished: false,
      directCount: '',
      indirectCount: '',
      allCount: 0,
      failCount: 0,
      successCount: 0
    }
  },
  components: {
    HeaderNav,
    List
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
  },
  activated () {
    this.clearData()
    window.scrollTo(0, 1)

    const type = this.userInfo.type

    if (type === 1 || type === 2) {
      this.tabs.push({
        name: '直推办卡信息'
      }, {
        name: '团队办卡信息'
      })
    } else {
      this.tabs.push({ name: '直推办卡信息' })
    }

    this.classifies = [
      '全部(' + this.allCount + ')',
      '通过(' + this.failCount + ')',
      '未通过(' + this.successCount + ')'
    ]
    /*
      const token = localStorage.getItem('token')
      const permiseCardCount = this.getCardCount({ token })
      permiseCardCount.then(val => {
        this.directCount = val.directCount || '0'
        this.indirectCount = val.indirectCount || '0'
        if (type === 1 || type === 2) {
          this.tabs.push({
            name: '直推办卡信息(' + this.directCount + ')'
          },
          {
            name: '团队办卡信息(' + this.indirectCount + ')'
          })
        } else {
          this.tabs.push({
            name: '直推办卡信息(' + this.directCount + ')'
          })
        }
      })
    */
  },
  methods: {
    clearData () {
      this.query = {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        status: 0,
        type: 0
      }
      this.list = []
      this.loading = false
      this.finished = false
    },
    async getCardCount (params) {
      const getCardCount = await this.$http.getCardCount(params).catch(err => console.log(err))

      if (getCardCount && getCardCount.code === '00000-00000') {
        return Promise.resolve(getCardCount.data)
      }
    },
    async getCardItemInfo (params) {
      const getCardItemInfo = await this.$http.getCardItemInfo(params).catch(err => console.log(err))

      if (getCardItemInfo && getCardItemInfo.code) {
        return Promise.resolve(getCardItemInfo.code)
      }
    },
    operate_handle (type, item) {
      const permission = this.getCardItemInfo({cellPhone: item.cellPhone})

      permission.then((value) => {
        if (value === '00000-00000') {
          this.$router.push({
            path: `/editHandleCardInfo/${item.cellPhone}`
          })
        } else if (value === '00001-00004') {
          this.$toast('您没有权限执行此操作')
        } else {
          this.$toast('服务器错误')
        }
      })
    },
    add_handle () {
      this.$router.push({
        path: `/handlePersonInfo`
      })
    },
    check_scroll (arg) {
      console.log('arg', arg)
    },
    onLoad () {
      console.log('触底刷新 is invoked, index:')
      const type = (this.query.type === 1 ? 0 : 1)

      this.handleCardList({
        ...this.query,
        type
      })
    },
    async handleCardList (params) {
      const handleCardList = await this.$http.handleCardList(params).catch(err => console.log(err))

      this.loading = false
      if (handleCardList && handleCardList.code === '00000-00000') {
        const _data = handleCardList.data
        this.list.push(
          ..._data.records
        )

        if (_data.lastPage) {
          this.finished = true
        }

        !this.finished && this.query.pageNom++

        console.log(_data.lastPage)
      //
      } else {
        this.$toast(handleCardList.errMsg)
      }
    },
    search_handle () {
      event.preventDefault() // 默认是换行
      this.$refs.search_input.blur()

      const keywords = this.query.cellPhone

      this.clearData()
      this.query.cellPhone = keywords

      window.scrollTo(0, 1)
    },
    handle_card_item (item, index) {
      const { status = '', id } = item
      let path

      if (status) {
        path = `/passDetail/${id}`
      } else {
        path = `/notpassDetail/${id}`
      }
      // const path = `/passDetail/${item.id}`
      this.$router.push({ path })
    },
    tab_index_handle (type) {
      // this.query.type = type
      this.loading = false
      this.finished = false
      this.list = []

      this.query = {
        ...this.query,
        pageNom: 1,
        size: 20,
        cellPhone: '',
        type
      }
      window.scrollTo(0, 1)
    },
    classify_handle (status) {
      this.loading = false
      this.finished = false
      this.list = []

      this.query = {
        ...this.query,
        pageNom: 1,
        size: 20,
        cellPhone: '',
        status
      }
      window.scrollTo(0, 1)
    },
    input_blur () {
      // document.body.scrollTop = document.documentElement.scrollTop - 1
      setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight, 0))
      }, 100)
    },
    touchS (e) {
      if (e.touches.length === 1) {
        this.startX = e.touches[0].clientX
      }
    },
    touchM (e, item) {
      if (e.touches.length === 1) {
        // var index = e.currentTarget.dataset.index
        // 手指移动时水平方向位置
        var moveX = e.touches[0].clientX
        // 手指起始点位置与移动期间的差值
        var disX = this.startX - moveX
        var delBtnWidth = this.delBtnWidth
        // let txtStyle = ''
        if (disX === 0 || disX < 0) { // 如果移动距离小于等于0，说明向右滑动，文本层位置不变
          // txtStyle = 'left:0px'
          this.flag === item.cellPhone && (this.flag = null)
        } else if (disX > 50) { // 移动距离大于0，文本层left值等于手指移动距离
          // txtStyle = 'left:-' + disX + 'px'
          // console.log(txtStyle)
          if (disX >= delBtnWidth / 2) {
            // 控制手指移动距离最大值为删除按钮的宽度
            // txtStyle = 'left:-' + delBtnWidth + 'px'
            this.flag = item.cellPhone
          }
        }
      }
    }
  },
  deactivated () {
    this.tabs = []
    this.flag = null
    this.startX = 0
  }
}
</script>
<style lang="stylus" scoped>
  #handleCardInfo{
    .van-cell{
      padding-left 0
      padding-right 0
      padding-top 0
    }
    header{
      background: #fff;
      .tabs{
        height 44px
        display flex
        .tab{
          flex: 1
          display flex
          justify-content center
          align-items center
          font-size:18px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(102,102,102,1);
          position relative
          &.active{
            color #333
            span:before{
              content: '';
              position: absolute;
              width: 0.8rem;
              height: 0.05333rem;
              bottom: 0;
              left: 50%;
              background: #333;
              transform: translateX(-50%);
            }
          }
        }
      }
      .classify{
        display: flex;
        padding: 10px;
        justify-content: space-around;
        .classify-name{
          position relative
          font-size:14px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          &.active{
            color #333
            span:before{
              content: '';
              position: absolute;
              width: 0.5rem;
              height: 0.05333rem;
              bottom: -2px;
              left: 50%;
              background: #333;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
    section{
      form{
        padding 10px
        background: #fff;
        .search-input{
          width 100%
          padding: 12px 0;
          border-radius 6px
          text-align center
          background: #EFEFF4;
          border: none;
        }
      }
      .list{
        // margin-top 3px
        .item{
          background: #fff;
          height 44px
          position relative
          // margin 0 20px
          border-bottom 1px solid #EFEFF4
          &:last-child{
            border-bottom none
          }
          span{
            flex: 1;
            &:last-child{
              text-align center
              // height 40px
              // width: 40px
              // flex: inherit;
            }
          }
          .list-item-info{
            display flex
            justify-content space-around
            align-items center
            font-size:15px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            height 100%
            width 100%
            position absolute;
            left 0px;
            z-index:5;
            background #fff;
            transition:left 200ms;
            img{
              width: 40px;
              height:40px;
            }
            &.active{
              left: -44px;
            }
          }
          .list-swiper-operate-btn{
            position absolute;
            right:0px;
            display:flex;
            height:100%;
            div{
              width:44px;
              font-size:14px;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              height: 100%;
              color:#fff;
              display flex;
              justify-content center;
              align-items center;
              &.del{
                background:#c7c7cc;
              }
            }
          }
          // margin-bottom 3px

        }
      }
    }
  }
</style>
