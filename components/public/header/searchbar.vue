<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @focus="focus" @blur="blur" @input="input" placeholder="搜索商家或地点" />
          <button class="el-button el-botton--primary"><i class="el-icon-search"></i></button>
          <!-- 热门搜索列表 -->
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd>火锅</dd>
            <dd>火锅</dd>
            <dd>火锅</dd>
            <dd>火锅</dd>
            <dd>火锅</dd>
            <dd>火锅</dd>
            <dd>火锅</dd>
          </dl>
          <!-- 输入后给出的相关推荐 -->
          <dl class="searchList" v-if="isSearchList">
            <dd>水煮鱼</dd>
            <dd>水煮鱼</dd>
            <dd>水煮鱼</dd>
            <dd>水煮鱼</dd>
            <dd>水煮鱼</dd>
          </dl>
        </div>
        <p class="suggset">
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
        </p>
        <!-- 输入框下的大类 -->
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from "lodash";

  export default {
    data () {
      return {
        isFocus: false,
        search: '',
        hotPlace: [],
        searchList: []
      }
    },
    computed: {
      isHotPlace: function() {
        return this.isFocus && !this.search;
      },
      isSearchList: function() {
        return this.isFocus && this.search;
      }
    },
    methods: {
      focus() {
        this.isFocus = true;
      },
      blur() {
        let _this = this;
        setTimeout( () => {
          _this.isFocus = false;
        }, 300)
      },
      input: _.debounce(async function(){
        let city = this.$store.state.geo.position.city.replace('市', '');
        this.searchList = [];
        let {status,data:{top}} = await this.$axios.get('/search/top',{
          params:{
            input:this.search,
            city
          }
        })
        this.searchList = top.slice(0,10)
      }, 300)
    }
  }
</script>

<style lang='scss'>


</style>
