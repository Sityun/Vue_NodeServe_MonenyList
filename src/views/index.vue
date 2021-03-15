<template>
  <div class="index">
    <HeadNav></HeadNav>
    <div class="indexBox">
      <LeftMenu></LeftMenu>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HeadNav from '../components/HeadNav.vue'
import LeftMenu from '../components/LeftMenu'
export default {
  name: 'index',
  created () {
  },
  components: {
    HeadNav,
    LeftMenu
  },
}
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.indexBox {
  width: 100%;
  height: 100%;
  display: flex;
  .menu_page {
    width: 12%;
    min-width: 200px;
  }
}
</style>
