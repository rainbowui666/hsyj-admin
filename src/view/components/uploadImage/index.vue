<template>
    <div>
        <p class="subTitle">图片列表</p>
        <!-- <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
            <img :src="item.url">
        </div> -->
        <div class="demo-upload-list" v-for="(item,index) in currentImage" :key="index">
          <template v-if="currentImage.length > 0">
              <img :src="'https://hsstatic.sufe.edu.cn/images/'+item.sourceAddress">
              <div class="demo-upload-list-cover">
                  <Icon size="40px" type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
          </template>
        </div>
        <template v-if="currentImage.length === 0">
            <p>你还没有上传图片哟</p>
        </template>
        <p class="subTitle" style="border-top: 1px solid #ddd;margin-top: 20px;">上传图片
          <em class="notice">(图片大小不能超过2M，否则无法上传)</em>
        </p>
        <iframe ref="iframe" @load="finish" src="https://hsstatic.sufe.edu.cn/admin/uploadComponent/upload.html" height="120" width="100%" style="border: none;overflow:hidden"/>
        <!-- <Button @click="sendMessage">向iframe发送信息</Button> -->
    </div>
</template>
<script>
import { deleteOneImage, getImageList } from '@/api/data'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
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
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    window.addEventListener('message', async (event) => {
      let imageList = await getImageList(this.parentId, this.sourceType)
      this.currentImage = imageList.data.data.data
      // console.log('vue文件接收的数据,接收的数据', event)
    })
    // window.addEventListener('message', this.handleMessage())
    this.iframeWin = this.$refs.iframe.contentWindow
    // if (this.currentImageArray) {
    //   this.currentImage = this.currentImageArray
    // }
    let imageList = await getImageList(this.parentId, this.sourceType)
    this.currentImage = imageList.data.data.data
  },
  methods: {
    finish () {
      this.$refs.iframe.contentWindow.postMessage({
        cmd: 'getFormJson',
        params: {},
        info: {
          parentId: this.parentId,
          sourceType: this.sourceType,
          token: Cookies.get(TOKEN_KEY)
        }
      }, '*')
    },
    async handleRemove (item) {
      let deleteImage = await deleteOneImage(item.sourceID)
      if (!deleteImage.data.errno) {
        this.$Message.warning('删除成功')
        let imageList = await getImageList(this.parentId, this.sourceType)
        this.currentImage = imageList.data.data.data
      }
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
.subTitle{
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
}
.subTitle > .notice{
    font-size: 12px;
    font-style: normal;
    font-weight: normal;
    color: #ddd;
}
.demo-upload-list{
    box-shadow: 0px 0px 5px rgba(0,0,0,.5)!important;
    margin-right: 10px!important;
}
.demo-upload-list{
    display: inline-block;
    width: 142px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
