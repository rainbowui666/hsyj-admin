<template>
    <div>
        <iframe ref="iframe" @load="finish" src="https://hsstatic.sufe.edu.cn/admin/excelUpLoad/import.html" height="120" width="100%" style="border: none;overflow:hidden"/>
        <!-- <Button @click="sendMessage">向iframe发送信息</Button> -->
    </div>
</template>
<script>
export default {
  name: 'upload_page',
  props: {
    // isEdit: Boolean
    parentId: Number,
    sourceType: Number,
    currentImageArray: Array
  },
  components: {
  },
  data () {
    return {
      iframeWin: {},
      currentImage: [],
      returnIframe: ''
    }
  },
  async mounted () {
    // 这里就拿到了iframe的对象
    // console.log(this.$refs.iframe)
    // 这里就拿到了iframe的window对象
    // console.log(this.$refs.iframe.contentWindow)
    // window.addEventListener('message', this.handleMessage())
    this.iframeWin = this.$refs.iframe.contentWindow
    // if (this.currentImageArray) {
    //   this.currentImage = this.currentImageArray
    // }
  },
  methods: {
    finish () {
      this.$refs.iframe.contentWindow.postMessage({
        cmd: 'getFormJson',
        params: {},
        info: {
          parentId: this.parentId,
          sourceType: this.sourceType
        }
      }, '*')
    }
    // sendMessage () {
    //   // 外部vue向iframe内部传数据
    // //   console.log('this.iframeWin', this.iframeWin)
    // //   console.log('res', '111')
    // //   this.iframeWin.postMessage({
    // //     cmd: 'getFormJson',
    // //     params: {},
    // //     info: {// 做一下数据处理 然后存到自定义的info字段里方便获取,
    // //       parentId: 1,
    // //       sourceType: 1
    // //     }
    // //   }, '*')
    // }
  }
//   watch: {
//     iframeWin () {
//       return this.$refs.iframe.contentWindow
//     }
//   }
}
</script>
<style>
</style>
