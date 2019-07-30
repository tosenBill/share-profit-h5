<template>
  <div class="myGroup" id="myGroup">
    <header-nav :headerNav = 'headerNav' @addHasClick="add_handle">
      <!-- <div slot="addBtn"></div> -->
    </header-nav>
    <header>
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

      <div class="group-list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="10"
          :immediate-check="true"
        >
          <van-cell>
            <div class="item" v-for="(item, index) in list" :key="index">
              <div class="list-item-info" :class="{active: item.cellPhone == flag, noActive: item.cellPhone !== flag}" @touchstart="touchS" @touchmove="touchM($event,item)">
                <div class="name">{{item.name || ''}}</div>
                <div class="phone">{{item.cellPhone || ''}}</div>
              </div>
              <div class="list-swiper-operate-btn">
                <div class="del" @click="operate_handle('del', item)">删除</div>
              </div>
            </div>
          </van-cell>
        </van-list>
        <!-- <div class="item" v-for="item in list" :key="item" :title="item">
          <div class="name">石荣成</div>
          <div class="phone">15753033195</div>
        </div>
        <div class="item">
          <div class="name">沈小童</div>
          <div class="phone">15753033195</div>
        </div> -->
      </div>
    </section>
  </div>
</template>
<script>
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
      keywords: '',
      query: {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        key: ''
      },
      list: [],
      loading: false,
      finished: false
    }
  },
  components: {
    HeaderNav,
    List
  },
  computed: {
  },
  activated () {
    // this.getMyGroupList(this.query)
    this.clearData()

    window.scrollTo(0, 1)
    // this.onLoad()
  },
  mounted () {

  },
  methods: {
    clearData () {
      this.flag = null
      this.query = {
        pageNom: 1,
        size: 20,
        cellPhone: ''
      }
      this.list = []
      this.loading = false
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
        } else if (disX > 0) { // 移动距离大于0，文本层left值等于手指移动距离
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
    onLoad (index) {
      console.log('触底刷新 is invoked, index:', index)
      this.getMyGroupList(this.query)
    },
    async getMyGroupList (params) {
      const getMyGroupList = await this.$http.myGroupList(params).catch(err => console.log(err))

      this.loading = false
      if (getMyGroupList && getMyGroupList.code === '00000-00000') {
        const _data = getMyGroupList.data
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
        this.$toast(getMyGroupList.errMsg)
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
  }
}
</script>
<style lang="stylus" scoped>
  #myGroup{
    .van-cell:not(:last-child)::after{
      border-bottom: none;
    }
    header{
      height 44px
      padding: 5px 10px;
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
            .name,
            .phone{
              flex: 1;
              font-size:15px;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color:rgba(51,51,51,1);
            }
            .phone{
              // margin-left 95px
              text-align center
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
