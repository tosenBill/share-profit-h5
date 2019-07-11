<template>
  <div class="home" id="home">
    <header>
      <div class="user-info">
        <div>
          <img src="static/images/icon-header.png" alt="">
          <span>15591611037</span>
        </div>
        <span @click="go_loginout" class="arrow arrow-right"></span>
      </div>
    </header>
    <section>
      <div class="list">
        <div class="item-info" @click="item_handle(1)">
          <span class="label">我的团队</span>
          <span class="arrow arrow-right"></span>
        </div>
        <div class="item-info" @click="item_handle(2)">
          <span class="label">办卡信息</span>
          <span class="arrow arrow-right"></span>
        </div>
        <div class="item-info" @click="item_handle(3)">
          <span class="label">添加团队成员</span>
          <span class="arrow arrow-right"></span>
        </div>
        <div class="item-info" @click="item_handle(4)">
          <span class="label">添加办卡人信息</span>
          <span class="arrow arrow-right"></span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      copyData: 'copy data'
    }
  },
  components: {
  },
  computed: {
  },
  mounted () {
    this.showList = true
  },
  methods: {
    go_loginout () {
      this.$router.push({
        path: `/loginOut`
      })
    },
    item_handle (type) {
      let path = ''
      switch (type) {
        case 1:
          path = '/myGroup'
          break
        case 2:
          path = '/handleCardInfo'
          break
        case 3:
          path = '/addGroupPerson'
          break
        case 4:
          path = '/handlePersonInfo'
      }

      this.$router.push({path})
    }
  }
}
</script>
<style lang="stylus" scoped>
  #home{
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background:rgba(239,239,244,1);
    padding 10px
    header{
      width 355px
      min-height 88px
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 5px 0px rgba(231,231,231,1);
      border-radius:5px;
      padding-right 22px
      // display flex
      .user-info{
        display: flex;
        align-items: center;
        height 88px
        >div{
          flex: 1;
          display: flex;
          align-items: center;
          img{
            width:40px;
            height:40px;
            background:rgba(216,216,216,1);
            border-radius 50%
            margin-left 10px
          }
          span{
            font-size:18px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            margin-left 24px
          }
        }
        .back-box{
          height 100%
          width 50px
          display: flex;
          align-items: center;
        }
      }
    }
    section{
      margin-top 10px
      .list{}
    }
  }
</style>
