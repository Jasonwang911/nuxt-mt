<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item, id) in $store.state.home.menu" :key="id" @mouseenter="enter(item)">
        <i :class="item.type"></i>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseover="sover" @mouseout="sout">
      <div v-for="(item, key) in curdetail.child" :key="key">
        <h4>{{item.title}}</h4>
        <span v-for="(i, k) in item.child" :key="k">{{i}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'eMenu',
    data () {
      return {
        kind: '',
        menu: [],
        timer: null
      }
    },
    computed: {
      curdetail() {
        return this.$store.state.home.menu.filter( (item) => item.type == this.kind)[0];
      }
    },
    methods: {
      mouseleave() {
       let _this = this;
       this.timer = setTimeout( () => {
         this.kind = '';
       }, 150)
      },
      enter(item) {
        this.kind = item.type;
      },
      sover() {
        clearTimeout(this.timer);
      },
      sout() {
        this.kind = '';
      }
    }
 }
</script>

<style lang='scss'>

</style>
