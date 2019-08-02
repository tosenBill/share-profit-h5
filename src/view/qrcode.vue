<template>
  <div class="qrcode fixed-bg" id="qrcode">
    <header-nav/>
    <section>
      <div class="qrcode-img">
        <img src="static/images/test-qrcode.png" alt="">
      </div>
      <p class="tip">您可以复制二维码链接在浏览器打开</p>
      <div class="copy">
        <div class="url-link">http://172.20.10.4:8080/#/handlePersonInfo?id=123456</div>
        <div class="copy-btn" data-clipboard-action="copy" :data-clipboard-text="copyData" @click="copy_link">复制链接</div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Clipboard from 'clipboard'
import HeaderNav from '@/components/HeaderNav.vue'

import {
  Toast
} from 'vant'

export default {
  data () {
    return {
      copyData: 'http://172.20.10.4:8080/#/handlePersonInfo?id=123456'
    }
  },
  components: {
    HeaderNav,
    Toast
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  activated () {
    const token = sessionStorage.getItem('token')

    this.getMyQrcodeInfo({ token })
  },
  mounted () {
  },
  methods: {
    async getMyQrcodeInfo (params) {
      const getMyQrcodeInfo = await this.$http.getMyQrcodeInfo(params).catch(err => console.log(err))

      if (getMyQrcodeInfo && getMyQrcodeInfo.code === '00000-00000') {

      }
    },
    copy_link () {
      let clipboard = new Clipboard('.copy-btn')
      clipboard.on('success', () => {
        this.$toast('复制成功')
      })
      clipboard.on('error', () => {
        this.$toast('复制失败')
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .qrcode{
    overflow-x: scroll;
    section {
      max-width 500px
      padding 20px 25px;
      margin: 0 auto;
      .qrcode-img{
        // height calc(100vw - 50px);
        >img{
          width 100%;
          vertical-align: middle;
        }
      }
      .tip{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height: 20px;
        margin: 10px 0;
      }
      .copy{
        display: flex;
        .url-link{
          flex 1;
          height:44px;
          background:rgba(216,216,216,1);
          border-radius:4px;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          padding: 0 5px;
          align-items: center;
        }
        .copy-btn{
          display flex;
          width:114px;
          height:44px;
          background:rgba(255,255,255,1);
          border-radius:4px;
          justify-content center;
          align-items center;
          font-size:15px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color #333
          margin-left 10px;
        }
      }
    }
  }
</style>
