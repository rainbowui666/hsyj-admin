<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <!-- <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span> -->
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <!-- <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span> -->
      </Input>
    </FormItem>
    <FormItem prop="password">
      <div style="display: flex;">
        <Input v-model="form.code" placeholder="请输入验证码" style="width:66%;margin-right:4%">
        </Input>
        <img :src="codeImg" alt="" @click="codeChange" style="cursor: pointer;"/>
      </div>
    </FormItem>
    <FormItem>
      <Button type="default" @click="Clear" style="width:48%;margin-right:4%">清空</Button>
      <Button @click="handleSubmit" type="primary" style="width:48%">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    codeRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: '',
        code: ''
      },
      codeImg: '',
      currentRandom: 0
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        code: this.codeRules
      }
    }
  },
  mounted () {
    this.currentRandom = Math.random()
    this.codeImg = `https://gzhgl.sufe.edu.cn/admin/auth/createCaptcha?v=${this.currentRandom}`
  },
  methods: {
    codeChange () {
      this.currentRandom = Math.random()
      this.codeImg = `https://gzhgl.sufe.edu.cn/admin/auth/createCaptcha?v=${this.currentRandom}`
    },
    Clear () {
      this.form.userName = ''
      this.form.password = ''
      this.form.code = ''
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            code: this.form.code
          })
        }
      })
    }
  }
}
</script>
