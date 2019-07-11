<template>
  <div class="myGroup" id="myGroup">
    <header-nav :headerNav = 'headerNav' @addHasClick="add_handle">
      <!-- <div slot="addBtn"></div> -->
    </header-nav>
    <header>
      <form action="" onsubmit="return false;" @submit.prevent >
        <input
          v-model.trim="keywords"
          ref="search_input"
          type="search"
          placeholder="搜索"
          @keyup.13="search_handle"
        >
      </form>
    </header>
    <section class="">
      <div class="group-list">
        <div class="item">
          <div class="name">石荣成</div>
          <div class="phone">15753033195</div>
        </div>
        <div class="item">
          <div class="name">沈小童</div>
          <div class="phone">15753033195</div>
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
      keywords: ''
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
    }
  }
}
</script>
<style lang="stylus" scoped>
  #myGroup{
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
          padding-left 30px
          height 45px
          border-bottom 1px solid #F2F2F2
          .name,
          .phone{
            font-size:15px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .phone{
            margin-left 95px
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
