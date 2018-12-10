<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <nuxt-link to="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </nuxt-link>
        </span>
      </header>
    </article>
    <section>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-buttom size="mini" round @click="sendMsg">发送验证码</el-buttom>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input type="password" v-model="ruleForm.cpwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register',
  layout: "blank",
  data() {
    let cpwdValidator = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请再次输入密码'));
      }else if(value !== this.ruleForm.pwd) {
        callback(new Error('两次输入的密码不一致'));
      }else {
        callback();
      }
    }
    return {
      statusMsg: "",
      error: "",
      ruleForm: {
        name: "",
        email: "",
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [
          { required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ],
        cpwd: [
          { required: true, message: '请确定密码', trigger: 'blur' },
          { validator: cpwdValidator, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //  发送验证码
    sendMsg() {},
    // 注册
    register() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
