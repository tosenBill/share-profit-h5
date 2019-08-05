<template>
  <div class="qrcode fixed-bg" id="qrcode">
    <header-nav/>
    <section>
      <p class="tip tip-qrcode">您可截屏保存二维码分享给办卡人</p>
      <p class="tip tip-qrcode">由办卡人填写信息</p>
      <div class="qrcode-img">
        <img :src="codeImgPath" alt="">
      </div>
      <p class="tip huoze">或者</p>
      <p class="tip">您也可以复制链接发送给办卡人，由办卡人填写信息</p>
      <div class="copy">
        <!-- <p class="url-link">{{copyData || ''}}</p> -->
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
      codeImgPath: '',
      copyData: ''
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
    const token = localStorage.getItem('token')

    this.getMyQrcodeInfo({ token })
  },
  mounted () {
  },
  methods: {
    async getMyQrcodeInfo (params) {
      const getMyQrcodeInfo = await this.$http.getMyQrcodeInfo(params).catch(err => console.log(err))

      if (getMyQrcodeInfo && getMyQrcodeInfo.code === '00000-00000') {
        console.log(getMyQrcodeInfo.data)
        this.codeImgPath = getMyQrcodeInfo.data.codeImgPath || ''
        this.copyData = getMyQrcodeInfo.data.url
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
      .tip-qrcode{
        margin-bottom: 10px;
      }
      .qrcode-img{
        min-height 320px
        height calc(100vw - 50px);
        background #D8D8D8
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
        &.huoze{
          margin-top 20px
        }
      }
      .copy{
        display: flex;
        justify-content center
        margin-top 20px
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
