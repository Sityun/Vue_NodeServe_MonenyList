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
        <el-form-item>
          <div class="btnfrom">
            <router-link to="/register">
              <el-button
                type="primary"
                class="submit_btn"
              >注 册</el-button>
            </router-link>
            <el-button
              type="primary"
              class="submit_btn"
              @click="login('registerForm')"
            >登 录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'login',
  data () {
    return {
      registerUser: { email: "", password: "" },
      rules: {
        email: [
          { required: true, type: "email", message: '邮箱格式不正确!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码!', trigger: 'blur' },
          { min: 6, max: 30, message: "长度大于6位,小于三十位!" }
        ],
      },
    }
  },
  created () {
  },
  methods: {
    login (forName) {
      this.$refs[forName].validate(valid => {
        this.$axios.post("/api/users/login", this.registerUser).then(res => {
          this.$message({
            message: "登陆成功!",
            type: "success"
          })
          const { token } = res.data;
          // 解析 token
          const decoded = jwt_decode(token)
          // console.log(decoded)
          // token 存储到 vuex 中
          this.$store.dispatch('setUser', decoded);
          // 这里做的是一个判断权限的储存
          this.$store.dispatch('setAutnenticated', !this.isEmpty(decoded));
          // 存储 token
          localStorage.setItem("eleToken", token);
          // 跳转路由
          this.$router.push("/index")
        });
      })
    },
    // 判断值是否为空
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      )
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
