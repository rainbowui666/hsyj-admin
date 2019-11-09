<template>
  <div>
    <Row :gutter="20">
      <i-col   :lg="8" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
          <Card shadow>
          <chart-bar style="height: 300px;" :value="activity" text="Top5热门活动" v-if="activity"/>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="scenery" text="Top5热门景点" v-if="scenery"/>
        </Card>
      </i-col>
    </Row>
      <Row :gutter="20" >
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
          <Card shadow>
          <chart-bar style="height: 300px;" :value="signScenery" text="Top5参与高校" v-if="signScenery"/>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="topActivityOrg" text="Top5活动主办机构" v-if="topActivityOrg"/>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import { index } from '@/api/data'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [],
      activity: null,
      scenery: null,
      signScenery: null,
      topActivityOrg: null
    }
  },
  methods: {
    async getActivity () {
      const activitys = await index('topActivity')
      const activity = {}
      for (const a of activitys.data) {
        activity[a.name] = a.num
      }
      this.activity = activity
    },
    async getScenery () {
      const scenerys = await index('topScenery')
      const scenery = {}
      for (const a of scenerys.data) {
        scenery[a.name] = a.num
      }
      this.scenery = scenery
    },
    async getSignScenery () {
      const scenerys = await index('topSignScenery')
      const scenery = {}
      for (const a of scenerys.data) {
        scenery[a.name] = a.num
      }
      this.signScenery = scenery
    },
    async getTopActivityOrg () {
      const scenerys = await index('topActivityOrg')
      const scenery = {}
      for (const a of scenerys.data) {
        scenery[a.sponsor] = a.num
      }
      this.topActivityOrg = scenery
    }
  },
  async mounted () {
    const count = await index('numbList')
    this.inforCardData = [
      { title: '游客数量', icon: 'md-contacts', count: count.data.tourist, color: '#2d8cf0' },
      { title: '文化景观数量', icon: 'md-pin', count: count.data.scenery, color: '#19be6b' },
      { title: '注册学生数量', icon: 'md-person', count: count.data.students, color: '#ff9900' },
      { title: '评论数量', icon: 'md-chatboxes', count: count.data.discuss, color: '#ed3f14' },
      { title: '开展活动数量', icon: 'md-compass', count: count.data.activity, color: '#E46CBB' }
    ]
    this.getActivity()
    this.getScenery()
    this.getSignScenery()
    this.getTopActivityOrg()
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
