<template>
  <div class="handleCardInfo" id="handleCardInfo">
    <header-nav :headerNav = 'headerNav' @addHasClick="add_handle">
    </header-nav>
    <header>
      <div class="tabs">
        <div
          class="tab"
          :class="{'active': query.type == index}"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="tab_index_handle(index)"
        >
          <span>{{tab.name || ''}}</span>
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
          :offset="10"
          :immediate-check="true"
        >
          <van-cell>
            <div class="item" v-for="(item, index) in list" :key="index">
              <span>{{item.name || ''}}</span>
              <span>{{item.cellPhone || ''}}</span>
              <!-- <img src="static/images/pass.png" alt=""> -->
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
import HeaderNav from '@/components/HeaderNav.vue'

import { List } from 'vant'
export default {
  data () {
    return {
      headerNav: {
        hasAddBtn: true
      },
      tabs: [
        {
          name: '直推信息'
        },
        {
          name: '间接信息'
        }
      ],
      query: {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        type: 0 // 直推信息代表’1‘，简推 ’0‘
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
  mounted () {
    this.showList = true
  },
  activated () {
    // this.getMyGroupList(this.query)
    this.clearData()

    // this.onLoad()
  },
  methods: {
    clearData () {
      this.query = {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        type: 0
      }
      this.list = []
      this.loading = false
      this.finished = false
    },
    add_handle () {
      this.$router.push({
        path: `/handlePersonInfo`
      })
    },
    onLoad () {
      console.log('触底刷新 is invoked, index:')
      console.log(this.query.type)
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
    },
    tab_index_handle (type) {
      this.query.type = type

      this.query = {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        type: type
      }
      this.list = []
      this.loading = false
      this.finished = false
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
          display flex
          justify-content space-around
          align-items center
          font-size:15px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          // margin-bottom 3px
          padding 0 20px
          border-bottom 3px solid #EFEFF4
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
        }
      }
    }
  }
</style>
