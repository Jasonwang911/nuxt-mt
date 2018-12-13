<template>
  <div class="parent">
    <div class="child"></div>
  </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   mounted() {
    //  var m =1;
    //  function log() {
    //    var m = 2;
    //    return function() {
    //      m+=1
    //    }
    //  }
    //  var _log = log();
    //  _log();
    //  console.log(m)
    // for(var i=0;i<5;i++) {
    //   (function(){
    //     setTimeout(function() {
    //       console.log(i)
    //     },1000)
    //   })(i)
    // }
    // function fun() {}
    // console.log(typeof fun)
    // console.log(fun instanceof Function)
    // console.log(fun instanceof Object)
    // var arr = [1,2,3];
    // function test(arr) {
    //   arr = []
    // }
    // test(arr);
    // console.log(arr)
    // function Foo() {
    //   getname = function() {
    //     console.log(1)
    //   }
    //   return this;
    // }
    // Foo.getName = function(){console.log(2)}
    // Foo.prototype.getName = function() {console.log(3)}
    // var getName = function() {console.log(4)}
    // function getName() {console.log(5)}

    // Foo.getName()
    // getName()
    // Foo().getName();
    // getName()

    // new Foo.getName();
    // new Foo().getName();
    // new new Foo().getName();
   }
 }
</script>

<style lang='scss' scoped>
.parent{
  width: 100%;
  height: 300px;
  background: aqua;
  position: relative;
}
.child{
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

</style>
