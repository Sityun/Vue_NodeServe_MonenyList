<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">阿宅-在线后台管理系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item
          label="用户名"
          prop="name"
        >
          <el-input
            v-model="registerUser.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="registerUser.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="registerUser.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="password2"
        >
          <el-input
            v-model="registerUser.password2"
            placeholder="请确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select
            v-model="registerUser.identity"
            placeholder="请选择身份"
          >
            <el-option
              label="管理员"
              value="manager"
            ></el-option>
            <el-option
              label="员工"
              value="employee"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="btnfrom">
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('registerForm')"
            >注 册</el-button>
            <router-link to="/login">
              <el-button
                type="primary"
                class="submit_btn"
              >登录</el-button>
            </router-link>
          </div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    var validatePw = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback();
      }
    };
    return {
      registerUser: { name: '', email: "", password: "", password2: "", identity: "" },
      rules: {
        name: [
          { required: true, message: '请输入用户名!', trigger: 'blur' }, {
            min: 2, max: 30,
            message: "长度在2到30个字符之间!"
          }
        ],
        email: [
          { required: true, type: "email", message: '邮箱格式不正确!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码!', trigger: 'blur' },
          { min: 6, max: 30, message: "长度大于6位,小于三十位!" }
        ],
        password2: [
          { required: true, message: '请输入密码!', trigger: 'blur' },
          { min: 6, max: 30, message: "长度大于6位,小于三十位!" },
          {
            validator: validatePw
          }
        ],
        identity: [
          { required: true, message: '请选择身份!', trigger: ['blur', 'change'] },
        ]
      },
    }
  },
  created () {
    this.$axios.get("/").then(res => {
      console.log(res)
    })
  },
  methods: {
    submitForm (forName) {
      this.$refs[forName].validate(valid => {
        if (valid && this.registerUser.identity) {
          this.$axios.post("/api/users/register", this.registerUser).then(res => {
            // 注册成功!
            this.$message({
              message: "账号注册成功!",
              type: "success"
            })
            // 跳转
            this.$router.push("/login")
          }).catch(err => console.log(err))
        } else {
          this.$message({
            message: "请选择身份!",
            type: "warning"
          })
          return false
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.register {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.btnfrom {
  display: flex;
  justify-content: space-between;
  button,
  a {
    width: 40%;
    display: inline-block;
    > button {
      width: 100%;
    }
  }
}
</style>
