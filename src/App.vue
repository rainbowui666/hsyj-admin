<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-card-head{
  border-bottom: none!important;
  > p{
    font-size: 16px!important;
    // height: 22px!important;
    // line-height: 22px!important;
  }
}
.ivu-modal-header{
  border-bottom: none!important
}
.ivu-modal-footer{
  border-top: none!important
}
.ivu-modal-header p, .ivu-modal-header-inner{
  height: 22px!important;
  font-size: 18px!important
}
.ivu-poptip-body{
  text-align: left!important
}
.ivu-transfer-list{
  height: 420px!important;
  width: 280px!important;
}
.ivu-page{
  padding: 15px 0!important;
  display: flex!important;
  justify-content: flex-end!important;
}
.ivu-notice-title{
  white-space: pre-wrap!important
}
.schoolManagementTable .ivu-table-body{
  position: fixed !important;
}
</style>
