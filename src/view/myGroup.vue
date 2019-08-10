<template>
  <div class="myGroup" id="myGroup">
    <header-nav :headerNav = 'headerNav' @addHasClick="add_handle">
      <!-- <div slot="addBtn"></div> -->
    </header-nav>
    <!-- <header-title :headerTitle = 'headerTitle' @addHasClick="add_handle">
    </header-title> -->
    <header>
      <div class="tabs">
        <div
          class="tab"
          :class="{'active': query.type == index && type != 2}"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="tab_index_handle(index)"
        >
          <span>{{tab.name || ''}}</span>
        </div>
      </div>
      <form action="" onsubmit="return false;" @submit.prevent >
        <input
          v-model.trim="query.cellPhone"
          ref="search_input"
          type="search"
          placeholder="搜索"
          @keyup.13="search_handle"
          @blur="input_blur"
        >
      </form>
    </header>
    <section class="">
      <van-loading v-if="showLoading" color="#1989fa" size="20px">加载中...</van-loading>
      <div class="group-list">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            :immediate-check="true"
          >
            <!-- <van-cell> -->
            <div v-for="(item, index) in list" :key="index" class="item-box">
              <div class="myDate" v-if="item.myDate"><span>{{item.myDate}}</span></div>
              <div class="item">
                <div class="list-item-info"
                  :class="{active: item.cellPhone == flag, noActive: item.cellPhone !== flag}"
                  @touchstart="touchS"
                  @touchmove="touchM($event,item)"
                  @click="handle_card_item(item, index)">
                  <div class="count">{{item.count}}</div>
                  <div class="name">{{item.name || ''}}</div>
                  <div class="phone">{{item.cellPhone || ''}}</div>
                  <div class="user-type">{{item.userType || ''}}</div>
                  <div class="img-box">
                    <img v-if="item.status == '1'" src="static/images/pass.png" alt="">
                    <img v-else src="static/images/not-pass.png" alt="">
                  </div>
                </div>
                <div class="list-swiper-operate-btn">
                  <div class="del" @click="operate_handle('del', item)">删除</div>
                </div>
              </div>
            </div>
            <!-- </van-cell> -->
          </van-list>
        </van-pull-refresh>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import HeaderNav from '@/components/HeaderNav.vue'
import HeaderTitle from '@/components/HeaderTitle.vue'
import { List, PullRefresh, Loading } from 'vant'

export default {
  data () {
    return {
      flag: null,
      startX: 0,
      delBtnWidth: 50,
      headerNav: {
        hasAddBtn: true
      },
      keywords: '',
      tabs: [],
      query: {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        type: 0
      },
      list: [],
      showLoading: false,
      isLoading: false, // 下拉刷新
      loading: false,
      finished: false,
      directCount: '',
      indirectCount: '',
      scroll: 1,
      index: 1,
      type: '' // 用户类型
    }
  },
  components: {
    HeaderTitle,
    HeaderNav,
    List,
    PullRefresh,
    Loading
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  activated () {
    // this.clearData()

    setTimeout(() => {
      window.scroll(0, this.scroll)
    }, 0)

    // const type = this.userInfo.type
    this.type = this.$route.params.type
    console.log(this.type)

    if (this.type === '1') {
      const token = localStorage.getItem('token')

      const permiseGroupCount = this.getGroupCount({ token })
      permiseGroupCount.then(val => {
        // console.log(val)
        this.directCount = val.directCount || ''
        this.indirectCount = val.indirectCount || ''

        this.tabs.push({
          name: '直推工号(' + this.directCount + ')'
        },
        {
          name: '间推工号(' + this.indirectCount + ')'
        })
      })
    } else {
      // this.tabs.push({
      //   name: '我的团队'
      // })
    }

    window.scrollTo(0, 1)
    // this.onLoad()
  },
  mounted () {

  },
  beforeRouteEnter (to, from, next) {
    if (from.fullPath === '/home') {
      next(vm => {
        vm.scroll = 1
        vm.clearData()
      })
    } else {
      next()
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      this.list = []
      this.isLoading = false
      this.showLoading = true

      const type = (this.query.type === 1 ? 0 : 1)
      this.getMyGroupList({
        ...this.query,
        pageNom: 1,
        type
      })
      // this.query.pageNom = 1
      // this.onLoad()
      // window.scroll(0, 1)
    },
    operate_handle (type, item) {
      console.log(item)
      // 掉接口 myGroupListDel
      this.$http.myGroupListDel({ cellPhone: item.cellPhone }).catch(err => console.log(err))
        .then(res => {
          console.log(res)
          if (res.code === '00000-0000') {
            this.$toast('删除成功')
          } else if (res.code === '00001-00004') {
            this.$toast('您没有权限执行此操作')
          } else {
            this.$toast(res.errMsg)
          }
        })
    },
    handle_card_item (item, index) {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 1

      const { status, cellPhone } = item
      let path

      if (status === '1') { // '1、通过；0、未通过
        path = `/passDetail/${cellPhone}`
      } else {
        path = `/notpassDetail/${cellPhone}`
      }
      // const path = `/passDetail/${item.id}`
      this.$router.push({ path })
    },
    tab_index_handle (type) {
      this.query.type = type
      this.flag = null
      this.loading = false
      this.finished = false
      this.list = []

      this.query = {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        type: type
      }
      window.scrollTo(0, 1)
      // this.onLoad()
    },
    onLoad (index) {
      console.log('触底刷新 is invoked, index:', index)

      const type = (this.query.type === 1 ? 0 : 1)
      this.getMyGroupList({
        ...this.query,
        type
      })
    },
    async getGroupCount (params) {
      const getGroupCount = await this.$http.getGroupCount(params).catch(err => console.log(err))

      if (getGroupCount && getGroupCount.code === '00000-00000') {
        return Promise.resolve(getGroupCount.data)
      }
    },
    async getMyGroupList (params) {
      this.index = 1
      const getMyGroupList = await this.$http.myGroupList(params).catch(err => console.log(err))

      this.loading = false
      if (getMyGroupList && getMyGroupList.code === '00000-00000') {
        const _data = getMyGroupList.data
        this.list.push(
          ..._data.records
        )

        if (this.list.length === 1) {
          this.list[0].count = 1
          this.list[0].myDate = this.list[0].createDate
        }

        for (let i = 0; i < this.list.length - 1; i++) {
          this.list[i].count = this.index

          this.list[0].myDate = this.list[0].createDate
          if (this.list[i + 1].createDate !== this.list[i].createDate) {
            this.list[i + 1].myDate = this.list[i + 1].createDate
            this.index = 1
          } else {
            this.index++
          }
          this.list[i + 1].count = this.index
        }

        if (_data.lastPage) {
          this.finished = true
        }

        !this.finished && this.query.pageNom++

        this.isLoading = false
        this.showLoading = false
      //
      } else {
        this.isLoading = false
        this.showLoading = false
        if (getMyGroupList && getMyGroupList.errMsg) {
          this.$toast(getMyGroupList.errMsg)
        }
      }
    },
    add_handle () {
      this.$router.push({
        path: `/addGroupPerson`
      })
    },
    search_handle () {
      event.preventDefault() // 默认是换行
      this.$refs.search_input.blur()
      const keywords = this.query.cellPhone

      this.clearData()

      this.query.cellPhone = keywords

      window.scrollTo(0, 1)
      // this.getMyGroupList(this.query)
    },
    clearData () {
      this.flag = null
      this.query = {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        type: 0
      }
      this.list = []
      this.loading = false
      this.isLoading = false
      this.finished = false
      this.keywords = ''
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
    console.log('deactiveted')
    this.tabs = []
  }
}
</script>
<style lang="stylus" scoped>
  #myGroup{
    .van-cell:not(:last-child)::after{
      border-bottom: none;
    }
    header{
      // height 44px
      padding: 5px 10px;
      .tabs{
        display flex
        margin-bottom: 10px;
        .tab{
          height 44px
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
      input{
        width 100%
        padding: 12px 0;
        border-radius 8px
        text-align center
        background: #EFEFF4;
        border: none;
      }
    }
    section{
      margin-top 10px
      .group-list{
        .item-box{
          .myDate{
            height 30px
            display: flex;
            font-size: 14px;
            padding: 0 30px;
            align-items: center;
            justify-content center;
            // border-bottom: 2px solid #eee;
            background: #f9f7f7;
            color: #6f00ff;
            font-weight: 500;
            span{
              display flex;
              // width 30%;
            }
          }
        }
        .item{
          position relative
          padding-left 10px
          height 45px
          border-bottom 1px solid #F2F2F2
          .list-item-info{
            position absolute;
            left 0;
            display: flex;
            align-items: center;
            width:100%;
            height: 100%;
            z-index:5;
            background #fff;
            transition:left 200ms;
            padding-left 10px
            padding-right 10px
            .user-type{
              width 40px
              // margin-right 5px
            }
            .name,
            .phone{
              flex: 1;
              font-size:15px;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color:rgba(51,51,51,1);
            }
            .count{
              width: 20px
              text-align left
            }
            .phone{
              // margin-left 95px
              text-align center
            }
            .img-box{
              // flex: 1;
              display flex;
              justify-content center;
              width: 44px;
              img{
                width: 40px;
                height:40px;
              }
            }
            &.active{
              left: -44px;
            }
          }
          .list-swiper-operate-btn{
            position absolute;
            right:0;
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
                background:#FF6666;
              }
            }
          }
        }
      }
    }
    footer{
      display flex
      justify-content center
      margin-top 118px
    }
  }
</style>
