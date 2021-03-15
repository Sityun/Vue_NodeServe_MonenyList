<template>
  <header class="head-nav">
    <el-row type="flex"
      justify="space-between">
      <router-link to="/index">
        <el-col :span="6"
          class="logo-container">
          <img src="../assets/logo.png"
            class="logo"
            alt="">
          <span class="title">阿宅在线后台管理系统</span>
        </el-col>
      </router-link>
      <el-col :span="6"
        class="user">
        <div class="userinfo">
          <img :src='user.avatar'
            class="avatar">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
            </p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click">
              <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/info">个人信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="clearLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: "HeadNav",
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    user () {
      return this.$store.getters.user;
    }
  },
  methods: {
    clearLogin () {
      localStorage.removeItem("eleToken");
      this.$message.success("退出成功!");
      this.$store.dispatch('clearCurrentState');
      this.$router.push("/login");
    }
  },
}
</script>
<style lang="scss" scoped>
.head-nav {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 40px;
  width: 40px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>