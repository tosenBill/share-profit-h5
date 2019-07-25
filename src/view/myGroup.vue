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
              <div class="name">{{item.name || ''}}</div>
              <div class="phone">{{item.cellPhone || ''}}</div>
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
      // if (!this.query.cellPhone) {
      //   return
      // }
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
          display: flex;
          align-items: center;
          padding-left 10px
          height 45px
          border-bottom 1px solid #F2F2F2
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
