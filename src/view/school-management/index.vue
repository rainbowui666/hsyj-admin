<template>
  <div>
    <Card>
      <p slot="title">新增校区</p>
      <span slot="extra" :style="{ 'cursor':'pointer'}" @click="getPoint">经纬度查询 ></span>
      <Form ref="formInline" :model="schoolForm" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="schoolname" label="校区名称" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Input v-model="schoolForm.schoolname" placeholder="输入校区名称"/>
        </FormItem>
        <FormItem prop="areaid" label="所属区县" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Select v-model="schoolForm.areaid" @on-change="selectChange">
            <Option
              v-for="(item,index) in areaList"
              :value="item.areaid.toString()"
              :key="'search-col-'+index"
            >{{ item.areaname }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="shortname" label="学校简称" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Input v-model="schoolForm.shortname" placeholder="输入学校简称"/>
        </FormItem>
        <FormItem prop="latitude" label="纬度" :style="{'width': 'calc((100% - 60px)/6)'}">
          <Input v-model="schoolForm.latitude" placeholder="输入纬度"/>
        </FormItem>
        <FormItem prop="longitude" label="经度" :style="{'width': 'calc((100% - 60px)/6)'}">
          <Input v-model="schoolForm.longitude" placeholder="输入经度"/>
        </FormItem>
        <FormItem prop="address" label="地址" :style="{'width': 'calc((100% - 30px)/3*2 + 10px)'}">
          <Input v-model="schoolForm.address" placeholder="输入地址"/>
        </FormItem>
        <FormItem prop="schooldesc" label="描述" :style="{'width': 'calc(100% - 10px)'}">
          <Input type="textarea" v-model="schoolForm.schooldesc" placeholder="输入描述"/>
        </FormItem>
        <FormItem prop="image" style="width:100%;">
        </FormItem>
        <FormItem
          style="width:100%;display: flex;justify-content: flex-end;padding-right: 10px;margin-bottom: 0;"
        >
          <Button class="bottomRight" type="primary" @click="addSchool('formInline')">增加</Button>
        </FormItem>
      </Form>
      <Modal v-model="editImage"  @on-cancel="childCloseModal" width="60%">
      <p slot="header">
        <Icon type="ios-paper-outline"></Icon>
        <span>图片编辑</span>
      </p>
      <Upload v-if="updateModalShow" :parentId="currentParentId" :sourceType="0" :currentImageArray="currentImageArray"/>
      <div slot="footer">
          <Button type="primary" @click="childCloseModal" >完成</Button>
      </div>
    </Modal>
    </Card>
    <Card class="schoolManagementCard" ref="schoolManagementCard" :style="{'margin-top': '20px','height':tableHeight}">
      <p slot="title">校区列表</p>
      <Table class="schoolManagementTable" ref="schoolManagementTable" stripe :columns="schoolColumns" :data="schoolList"></Table>
      <!-- <Page :total="count" @on-change="changePage"/> -->
      <Page show-total :total="count" :current="currentPage" :page-size="pageSize" @on-change="changePage"/>
    </Card>
  </div>
</template>

<script>
import {
  addSchool,
  getSchoolList,
  deleteSchool,
  editSchool,
  getArea
} from '@/api/school'
import Upload from '@/view/components/uploadImage/index'
export default {
  name: 'directive_page',
  components: {
    Upload
  },
  data () {
    return {
      schoolForm: {
        schoolname: '',
        areaid: '',
        address: '',
        longitude: '',
        latitude: '',
        schooldesc: '',
        parentid: ''
      },
      pageSize: 5,
      currentPage: 1,
      uploadList: [],
      currentParentId: 0,
      currentImageArray: [],
      editImage: false,
      updateModalShow: false,
      areaList: [],
      count: 0,
      tableHeight: 0,
      ruleInline: {
        schoolname: [
          { required: true, message: '请输入学校名称', trigger: 'blur' }
        ],
        areaid: [
          { required: true, message: '请选择所属区域', trigger: 'change' }
        ],
        shortname: [
          { required: true, message: '请选择学校简称', trigger: 'change' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ],
        schooldesc: [
          { required: true, message: '请输入学校描述', trigger: 'blur' }
        ]
      },
      schoolColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        {
          title: '校区名称',
          key: 'schoolName',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.schoolName
                },
                on: {
                  input: function (event) {
                    params.row.schoolName = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.schoolName)
            }
          }
        },
        {
          title: '所属区县',
          key: 'areaid',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h(
                'Select',
                {
                  domProps: {
                    value: params.row.areaid
                  },
                  on: {
                    'on-change': function (event) {
                      params.row.areaid = event
                    }
                  }
                },
                this.areaList.map(item => {
                  return h('Option', {
                    props: {
                      value: item.areaid,
                      label: item.areaname
                    }
                  })
                })
              )
            } else {
              return h('div', this.getAreaName(params.row.areaid))
            }
          }
        },
        {
          title: '纬度',
          key: 'latitude',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.latitude
                },
                on: {
                  input: function (event) {
                    params.row.latitude = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.latitude)
            }
          }
        },
        {
          title: '经度',
          key: 'longitude',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.longitude
                },
                on: {
                  input: function (event) {
                    params.row.longitude = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.longitude)
            }
          }
        },
        {
          title: '地址',
          key: 'address',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.address
                },
                on: {
                  input: function (event) {
                    params.row.address = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.address)
            }
          }
        },
        {
          title: '描述',
          key: 'schooldesc',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('textarea', {
                domProps: {
                  value: params.row.schooldesc
                },
                on: {
                  input: function (event) {
                    params.row.schooldesc = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.schooldesc)
            }
          }
        },
        {
          title: '学校简称',
          key: 'shortName',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('textarea', {
                domProps: {
                  value: params.row.shortName
                },
                on: {
                  input: function (event) {
                    params.row.shortName = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.shortName)
            }
          }
        },
        // { title: '图片',
        //   key: 'action',
        //   width: 200,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [

        //     ])
        //   }
        // },
        {
          title: '操作',
          key: 'action',
          width: 240,
          align: 'center',
          options: ['delete'],
          render: (h, params) => {
            return h('div', [
              // h('Button', {
              //   style: { 'margin-right': '8px' },
              //   props: {
              //     type: 'primary',
              //     size: 'small',
              //     disabled: params.row.isOriginal
              //   },
              //   on: {
              //     click: () => {
              //     }
              //   }
              // }, '修改'),
              h(
                'Button',
                {
                  style: { 'margin-right': '8px' },
                  props: {
                    type: 'primary',
                    size: 'small',
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.openModal(params)
                    }
                  }
                },
                '编辑/查看图片'
              ),
              h(
                'Button',
                {
                  style: { 'margin-right': '8px' },
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.isOriginal
                  },
                  on: {
                    click: async () => {
                      if (params.row.$isEdit) {
                        this.$set(params.row, '$isEdit', false)
                        let obj = {
                          schoolname: params.row.schoolName,
                          areaid: params.row.areaid,
                          address: params.row.address,
                          longitude: params.row.longitude,
                          latitude: params.row.latitude,
                          schooldesc: params.row.schooldesc,
                          schoolID: params.row.schoolID,
                          shortname: params.row.shortName,
                          province: params.row.province,
                          city: params.row.city,
                          soundurl: params.row.soundurl,
                          videourl: params.row.videourl,
                          parentid: JSON.parse(sessionStorage.getItem('user')).schoolid
                        }
                        if (obj.schoolname === '') {
                          this.$Message.info('学校名称不能为空')
                        } else if (obj.areaid === '') {
                          this.$Message.info('所属区县不能为空')
                        } else if (obj.address === '') {
                          this.$Message.info('地址不能为空')
                        } else if (obj.longitude === '') {
                          this.$Message.info('经度不能为空')
                        } else if (obj.latitude === '') {
                          this.$Message.info('纬度不能为空')
                        } else {
                          await editSchool(obj)
                          this.getSchoolList()
                        }
                      } else {
                        this.$set(params.row, '$isEdit', true)
                      }
                    }
                  }
                },
                params.row.$isEdit ? '保存' : '编辑'
              ),
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': async () => {
                      await deleteSchool(params.row.schoolID)
                      this.getSchoolList()
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      props: {
                        type: 'error',
                        size: 'small',
                        disabled: params.row.isOriginal
                      }
                    },
                    '删除'
                  )
                ]
              )
            ])
          }
        }
      ],
      schoolList: []
    }
  },
  mounted () {
    this.getSchoolList()
    this.getArea()
  },
  updated () {
    let cur = document.querySelectorAll('.schoolManagementTable > div > .ivu-table-body')
    this.tableHeight = (cur[0].clientHeight + 122) + 'px'
  },
  methods: {
    async getSchoolList () {
      const list = await getSchoolList({ page: this.currentPage, pageSize: this.pageSize })
      this.schoolList = list.data.data.data ? list.data.data.data : []
      this.count = list.data.data.count ? list.data.data.count : 0
      this.pageSize = list.data.data.pageSize
      this.currentPage = list.data.data.currentPage
    },
    async getArea () {
      const list = await getArea()
      this.areaList = list.data.data ? list.data.data : []
    },
    childCloseModal () {
      this.editImage = false
      this.updateModalShow = false
    },
    addSchool (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.schoolForm.parentid = JSON.parse(sessionStorage.getItem('user')).schoolid
          let adschool = await addSchool(this.schoolForm)
          if (adschool.data.errno === 0) {
            this.$Message.success('Success!')
            this.getSchoolList()
          } else {
            this.$Message.error(adschool.data.errmsg)
          }
        } else {
          this.$Message.error('Fail!')
        }
      })

      // if (this.schoolForm.schoolname === '') {
      //   this.$Message.info('学校名称不能为空')
      // } else if (this.schoolForm.areaid === '') {
      //   this.$Message.info('所属区县不能为空')
      // } else if (this.schoolForm.address === '') {
      //   this.$Message.info('地址不能为空')
      // } else if (this.schoolForm.longitude === '') {
      //   this.$Message.info('经度不能为空')
      // } else if (this.schoolForm.latitude === '') {
      //   this.$Message.info('纬度不能为空')
      // } else {

      // }
    },
    async changePage (e) {
      this.currentPage = e
      this.getSchoolList()
      // const list = await getSchoolList({ page: e, pageSize: this.pageSize })
      // this.schoolList = list.data.data.data ? list.data.data.data : []
    },
    selectChange (value) {
      this.schoolForm.areaid = value
      this.$set(this.schoolForm, 'areaid', value)
    },
    openModal (params) {
      this.editImage = true
      this.updateModalShow = true
      this.currentParentId = params.row.schoolID
    },
    getPoint () {
      window.open('https://lbs.qq.com/tool/getpoint/')
    },
    getAreaName (id) {
      // distype：留言类型0,景点; 1,活动,2 学校,3首页
      switch (parseInt(id)) {
        case 1:
          return '黄浦区'
        case 2:
          return '虹口区'
        case 3:
          return '杨浦区'
        case 4:
          return '闸北区'
        case 5:
          return '普陀区'
        case 6:
          return '长宁区'
        case 7:
          return '奉贤区'
        case 8:
          return '金山区'
        case 9:
          return '松江区'
        case 10:
          return '青浦区'
        case 11:
          return '嘉定区'
        case 12:
          return '宝山区'
        case 13:
          return '崇明县'
        case 14:
          return '静安区'
        case 15:
          return '徐汇区'
        case 16:
          return '浦东新区'
      }
    }
  }
}
</script>

<style>
.bottomRight {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>
