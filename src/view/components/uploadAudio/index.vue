<template>
    <div :class="isAudio ? 'audioUpload' : 'vedioUpload'">
        <p class="subTitle">{{isAudio ? '音频列表' : '视频列表'}}</p>
        <!-- <div class="audio-upload-list" v-for="(item,index) in uploadList" :key="index">
            <img :src="item.url">
        </div> -->
        <div class="audio-upload-list" v-if="currentAudio.length > 0">
            <p style="min-width: 100px">{{currentAudio}}</p>
            <div class="audio-upload-list-cover">
                <Icon size="40px" type="ios-trash-outline" @click.native="handleRemove(parentId)"></Icon>
            </div>
        </div>
        <template v-if="currentAudio.length === 0">
            <p>你还没有上传{{isAudio ? '音频' : '视频'}}哟</p>
        </template>
        <p class="subTitle" style="margin-top: 20px;">上传{{isAudio ? '音频' : '视频'}}</p>
        <iframe v-if="isAudio && currentAudio.length < 1" ref="iframe" @load="finish" src="https://hsstatic.sufe.edu.cn/admin/audioUpload/uploadAudio.html" height="120" width="100%" style="border: none;overflow:hidden"/>
        <template v-if="currentAudio.length >= 1">
            <p> 已经有{{isAudio ? '音频' : '视频'}}了哟</p>
        </template>
        <iframe v-if="!isAudio && currentAudio.length < 1" ref="iframe" @load="finish" src="https://hsstatic.sufe.edu.cn/admin/audioUpload/uploadVedio.html" height="120" width="100%" style="border: none;overflow:hidden"/>
        <!-- <Button @click="sendMessage">向iframe发送信息</Button> -->
    </div>
</template>
<script>
// import { deleteOneImage, getImageList } from '@/api/data'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
import { getSceneryDetail, editScenery } from '@/api/scenery'
export default {
  name: 'upload_page',
  props: {
    // isEdit: Boolean
    parentId: Number,
    sourceType: Number,
    currentAudioArray: Array,
    isAudio: Boolean
    // currentSite: Object
  },
  components: {
  },
  data () {
    return {
      iframeWin: {},
      currentAudio: [],
      returnIframe: '',
      currentSite: {}
    }
  },
  async mounted () {
    // 这里就拿到了iframe的对象
    // console.log(this.$refs.iframe)
    // 这里就拿到了iframe的window对象
    // console.log(this.$refs.iframe.contentWindow)
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    window.addEventListener('message', async (event) => {
      if (this.isAudio) {
        let currentSiteObj = await getSceneryDetail(this.parentId)
        this.currentSite = currentSiteObj.data.data
        let currentSiteObjSound = currentSiteObj.data.data.soundurl
        let index = currentSiteObjSound.lastIndexOf('/')
        this.currentAudio = currentSiteObjSound.slice(index + 1, currentSiteObjSound.length)
      } else {
        let currentSiteObj = await getSceneryDetail(this.parentId)
        this.currentSite = currentSiteObj.data.data
        let currentSiteObjAudio = currentSiteObj.data.data.videourl
        let index = currentSiteObjAudio.lastIndexOf('/')
        this.currentAudio = currentSiteObjAudio.slice(index + 1, currentSiteObjAudio.length)
      }
      // let currentSiteObj = await getSceneryDetail(this.parentId)
      // this.currentSite = currentSiteObj.data.data
      // console.log('this.currentSite', this.currentSite)
      // console.log('vue文件接收的数据,接收的数据', event)
    })
    // window.addEventListener('message', this.handleMessage())
    this.iframeWin = this.$refs.iframe.contentWindow
    // if (this.currentAudioArray) {
    //   this.currentAudio = this.currentAudioArray
    // }
    // let imageList = await getImageList(this.parentId, this.sourceType)
    // this.currentAudio = imageList.data.data.data
    if (this.isAudio) {
      let currentSiteObj = await getSceneryDetail(this.parentId)
      this.currentSite = currentSiteObj.data.data
      let currentSiteObjSound = currentSiteObj.data.data.soundurl
      let index = currentSiteObjSound.lastIndexOf('/')
      this.currentAudio = currentSiteObjSound.slice(index + 1, currentSiteObjSound.length)
    } else {
      let currentSiteObj = await getSceneryDetail(this.parentId)
      this.currentSite = currentSiteObj.data.data
      let currentSiteObjAudio = currentSiteObj.data.data.videourl
      let index = currentSiteObjAudio.lastIndexOf('/')
      this.currentAudio = currentSiteObjAudio.slice(index + 1, currentSiteObjAudio.length)
    }
    // let currentSiteObj = await getSceneryDetail(this.parentId)
    // this.currentSite = currentSiteObj.data.data
  },
  methods: {
    finish () {
      this.$refs.iframe.contentWindow.postMessage({
        cmd: 'getFormJson',
        params: {},
        info: {
          currentSite: this.currentSite,
          parentId: this.parentId,
          sourceType: this.sourceType,
          token: Cookies.get(TOKEN_KEY)
        }
      }, '*')
    },
    async handleRemove (item) {
      if (this.isAudio) {
        this.$set(this.currentSite, 'soundurl', '')
      } else {
        this.$set(this.currentSite, 'videourl', '')
      }
      let deleteAudio = await editScenery(this.currentSite)
      if (!deleteAudio.data.errno) {
        this.$Message.warning('删除成功')
        // let imageList = await getImageList(this.parentId, this.sourceType)
        // this.currentAudio = imageList.data.data.data
        if (this.isAudio) {
          let currentSiteObj = await getSceneryDetail(this.parentId)
          this.currentSite = currentSiteObj.data.data
          let currentSiteObjSound = currentSiteObj.data.data.soundurl
          let index = currentSiteObjSound.lastIndexOf('/')
          this.currentAudio = currentSiteObjSound.slice(index + 1, currentSiteObjSound.length)
        } else {
          let currentSiteObj = await getSceneryDetail(this.parentId)
          this.currentSite = currentSiteObj.data.data
          let currentSiteObjAudio = currentSiteObj.data.data.videourl
          let index = currentSiteObjAudio.lastIndexOf('/')
          this.currentAudio = currentSiteObjAudio.slice(index + 1, currentSiteObjAudio.length)
        }
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
.audio-upload-list{
    box-shadow: 0px 0px 5px rgba(0,0,0,.5)!important;
    margin-right: 10px!important;
}
.audio-upload-list{
    display: inline-block;
    /* width: 142px; */
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.audio-upload-list img{
    width: 100%;
    height: 100%;
}
.audio-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.audio-upload-list:hover .audio-upload-list-cover{
    display: block;
}
.audio-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
/* .vedioUpload{
  margin-top: 40px;
  border-top: 1px solid rgb(221, 221, 221);
} */
</style>
