<template>
  <div id="app">
    
  </div> 
</template>

<script>
//rem 适配
import { setREM } from './script/util';

export default {
  name: 'app',
  data (){
    return{
    
    }
  },
  created () {

    setREM()
  }
}

</script>

<style lang="less">
@import '~vux/src/styles/index.less';
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

</style>
