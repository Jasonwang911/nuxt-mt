<template>
  <el-row :gutter="15" class="m-header">
    <el-col :span="6">
      <geo />
    </el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>

<script>
import Geo from './geo';

 export default {
   data () {
     return {

     }
   },
   components: {
     Geo
   }
 }
</script>

<style lang='scss' scoped>
@import '@/assets/css/public/layout.scss';

</style>
