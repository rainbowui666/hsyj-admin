import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/dataAnalysis',
    name: 'dataAnalysis',
    meta: {
      icon: 'ios-aperture',
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'data_analysis_page',
        name: 'data_analysis_page',
        meta: {
          icon: 'ios-aperture',
          title: '数据统计'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/accountManagement',
    name: 'accountManagement',
    meta: {
      icon: 'md-person',
      hideInBread: true,
      access: ['systemAdministrator']
    },
    component: Main,
    children: [
      {
        path: 'account_management',
        name: 'account_management',
        meta: {
          icon: 'md-person',
          title: '账户管理',
          access: ['systemAdministrator']
        },
        component: () => import('@/view/account-management/index.vue')
      }
    ]
  },
  {
    path: '/synchronizationSchoolInformation',
    name: 'synchronizationSchoolInformation',
    meta: {
      icon: 'md-people',
      hideInBread: true,
      access: ['systemAdministrator']
    },
    component: Main,
    children: [
      {
        path: 'synchronization_school_information',
        name: 'synchronization_school_information',
        meta: {
          icon: 'md-people',
          title: '学校信息同步',
          access: ['systemAdministrator']
        },
        component: () => import('@/view/synchronization-school-information/index.vue')
      }
    ]
  },
  {
    path: '/schoolManagement',
    name: 'schoolManagement',
    meta: {
      icon: 'md-home',
      hideInBread: true,
      access: ['schoolAdministrator']
    },
    component: Main,
    children: [
      {
        path: 'school_management',
        name: 'school_management',
        meta: {
          icon: 'md-home',
          title: '校区管理',
          access: ['schoolAdministrator']
        },
        component: () => import('@/view/school-management/index.vue')
      }
    ]
  },
  {
    path: '/siteManagement',
    name: 'siteManagement',
    meta: {
      hideInBread: true,
      icon: 'md-pin',
      access: ['schoolAdministrator']
    },
    component: Main,
    children: [
      {
        path: 'site_management',
        name: 'site_management',
        meta: {
          icon: 'md-pin',
          title: '景点管理',
          access: ['schoolAdministrator']
        },
        component: () => import('@/view/site-management/index.vue')
      }
    ]
  },
  {
    path: '/activityManagement',
    name: 'activity_management',
    meta: {
      icon: 'md-ribbon',
      title: '活动管理',
      access: ['schoolAdministrator']
    },
    component: Main,
    children: [
      {
        path: 'activity_add',
        name: 'activity_add',
        meta: {
          icon: 'md-ribbon',
          title: '新建活动',
          access: ['schoolAdministrator']
        },
        component: () => import('@/view/activity-add/index.vue')
      },
      {
        path: 'activity_list',
        name: 'activity_list',
        meta: {
          icon: 'md-ribbon',
          title: '活动列表',
          access: ['schoolAdministrator']
        },
        component: () => import('@/view/activity-management/index.vue')
      }
    ]
  },
  // {
  //   path: '/answerManagement',
  //   name: 'answerManagement',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'answer_management',
  //       name: 'answer_management',
  //       meta: {
  //         icon: 'md-school',
  //         title: '答题管理'
  //       },
  //       component: () => import('@/view/answer-management/index.vue')
  //     }
  //   ]
  // },
  {
    path: '/messageManagement',
    name: 'messageManagement',
    meta: {
      icon: 'ios-send',
      hideInBread: true,
      access: ['schoolAdministrator']
    },
    component: Main,
    children: [
      {
        path: 'message_management',
        name: 'message_management',
        meta: {
          icon: 'ios-send',
          title: '留言管理',
          access: ['schoolAdministrator']
        },
        component: () => import('@/view/message-management/index.vue')
      }
    ]
  },
  {
    path: '/studentManagement',
    name: 'studentManagement',
    meta: {
      icon: 'ios-send',
      hideInBread: true,
      access: ['schoolAdministrator']
    },
    component: Main,
    children: [
      {
        path: 'student_management',
        name: 'student_management',
        meta: {
          icon: 'ios-send',
          title: '学生管理',
          access: ['schoolAdministrator']
        },
        component: () => import('@/view/student-management/index.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
