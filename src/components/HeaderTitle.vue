<template>
  <div class="header-nav">
    <header>
      <div class="back-box">
        <span @click="go_back" class="arrow arrow-left"></span>
      </div>
      <div class="title">{{headerTitle.title}}</div>
      <!-- <div class="add-box" v-if="headerTitle && headerTitle.hasAddBtn" @click="add_handle">
        <strong class="add-btn">＋</strong>
      </div> -->
    </header>
  </div>
</template>
<script>
export default {
  props: ['headerTitle'],
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
  },
  mounted () {
    // console.log(this.headerNav)
  },
  methods: {
    go_back () {
      this.$go_back()
    },
    add_handle () {
      this.$emit('addHasClick')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .header-nav{
    header{
      background #ffffff
      height 44px
      padding 0 10px
      display flex
      align-items center
      justify-content: space-between;
      .back-box{
        height 100%
        width 50px
        display: flex;
        align-items: center;
      }
      .add-box{
        width 50px
        height 100%
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 30px;
      }
      .title{
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51,51,51,1);
        flex:1;
        font-size 18px;
      }
    }
  }
</style>
