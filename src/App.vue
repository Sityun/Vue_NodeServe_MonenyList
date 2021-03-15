<template>
  <router-view></router-view>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
a{
  color: black;
}
body,
#app {
  width: 100%;
  height: 100%;
  position: fixed;
  display: inline-block;
}
</style>
<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'app',
  created () {
    // 判断token是否存在
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken)
      // token 存储到 vuex 中
      this.$store.dispatch('setUser', decoded);
      // 这里做的是一个判断权限的储存
      this.$store.dispatch('setAutnenticated', !this.isEmpty(decoded));
    }
  },
  methods: {
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
