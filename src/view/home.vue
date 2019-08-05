<template>
  <div class="home" id="home">
    <header>
      <div class="user-info">
        <div>
          <img src="static/images/default-icon.jpg" alt="">
          <span>{{userInfo.cellPhone || ''}}</span>
        </div>
        <span @click="go_loginout" class="arrow arrow-right"></span>
      </div>
    </header>
    <section>
      <div class="list">
        <div class="item-info" @click="item_handle(4)">
          <span class="label">手动添加直推办卡人</span>
          <span class="arrow arrow-right"></span>
        </div>
        <div class="item-info" @click="item_handle(5)">
          <span class="label">扫码添加直推办卡人</span>
          <span class="arrow arrow-right"></span>
        </div>
        <div class="item-info" @click="item_handle(2)">
          <span class="label">查看办卡信息<span>({{cardCount || '0'}}人)</span></span>
          <span class="arrow arrow-right"></span>
        </div>
        <div class="item-info" @click="item_handle(3)" v-if="userInfo.type == '1' || userInfo.type == '-1'">
          <span class="label" style="display:flex;">
            <span>开通</span>
            <span v-if="userInfo.type == '-1'">A</span>
            <span v-else>B</span>
            <span>级工号</span>
          </span>
          <span class="arrow arrow-right"></span>
        </div>
        <div class="item-info" @click="item_handle(1)">
          <span class="label" style="display:flex;">查看工号 <span>({{groupCount || '0'}}人)</span></span>
          <span class="arrow arrow-right"></span>
        </div>
        <!-- <div class="item-info" @click="item_handle(1)" v-if="userInfo.type == '1' || userInfo.type == '-1'"> -->
        <!-- <p>联系电话：<a :href="'tel:' + userInfo.cellPhone">{{userInfo.cellPhone || ''}}</a></p> -->
      </div>
    </section>
  </div>
</template>
<script>
import * as types from '@/store/type'
import { mapGetters } from 'vuex'

import {
  Toast
} from 'vant'

export default {
  data () {
    return {
      groupCount: '',
      cardCount: ''
    }
  },
  components: {
    Toast
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  activated () {
    console.log('activated invoked')
    const token = localStorage.getItem('token')

    this.getUserInfo()

    token && this.getGroupCount({ token })
    token && this.getCardCount({ token })
  },
  mounted () {

  },
  methods: {
    async getUserInfo () {
      const userInfo = await this.$http.getUserInfo().catch()
      if (userInfo && userInfo.code === '00000-00000') {
        //
        this.$store.commit(types.SET_USER_INFO, userInfo.data)
        console.log(this.userInfo)
      } else {
        this.$toast(userInfo.errMsg)
      }
    },
    async getGroupCount (params) {
      const getGroupCount = await this.$http.getGroupCount(params).catch(err => console.log(err))

      if (getGroupCount && getGroupCount.code === '00000-00000') {
        // return Promise.resolve(getGroupCount.data)
        // A（1）:直推间推相加、B/管理员（-1）只需取直推
        if (this.userInfo.type === 1) {
          this.groupCount = Number(getGroupCount.data.directCount) + Number(getGroupCount.data.indirectCount)
        } else {
          this.groupCount = Number(getGroupCount.data.directCount)
        }
      }
    },
    async getCardCount (params) {
      const getCardCount = await this.$http.getCardCount(params).catch(err => console.log(err))

      if (getCardCount && getCardCount.code === '00000-00000') {
        // A（1）:直推间推相加、B/管理员（-1）只需取直推
        if (this.userInfo.type === 1) {
          this.cardCount = Number(getCardCount.data.directCount) + Number(getCardCount.data.indirectCount)
        } else {
          this.cardCount = Number(getCardCount.data.directCount)
        }
        // this.cardCount = Number(getCardCount.data.directCount) + Number(getCardCount.data.indirectCount)
      }
    },
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
          break
        case 5:
          path = '/qrcode'
          break
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
      // width 355px
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
