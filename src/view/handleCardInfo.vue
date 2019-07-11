<template>
  <div class="handleCardInfo fixed-bg" id="handleCardInfo">
    <header-nav :headerNav = 'headerNav' @addHasClick="add_handle">
    </header-nav>
    <header>
      <div class="tabs">
        <div
          class="tab"
          :class="{'active': tabIndex == index}"
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
          v-model.trim="keywords"
          ref="search_input"
          type="search"
          placeholder="搜索"
          @keyup.13="search_handle"
          class="search-input"
        >
      </form>
      <div class="list">
        <div class="item">
          <span>石荣成</span>
          <span>15175916591749</span>
          <img src="static/images/pass.png" alt="">
        </div>
        <div class="item">
          <span>沈小童</span>
          <span>15175916591749</span>
          <img src="static/images/notpass.png" alt="">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import HeaderNav from '@/components/HeaderNav.vue'
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
      keywords: '',
      tabIndex: 0
    }
  },
  components: {
    HeaderNav
  },
  computed: {
  },
  mounted () {
    this.showList = true
  },
  methods: {
    go_userInfo () {
      this.$router.push({
        path: `/userInfo`
      })
    },
    add_handle () {
      console.log(222)
    },
    search_handle () {
      if (!this.keywords) {
        return
      }
      event.preventDefault() // 默认是换行
      this.$refs.search_input.blur()
    },
    tab_index_handle (tabIndex) {
      this.tabIndex = tabIndex
    }
  }
}
</script>
<style lang="stylus" scoped>
  #handleCardInfo{
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
          margin-bottom 3px
        }
      }
    }
  }
</style>
