import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",//是否认证通过
  SET_USER: "SET_USER"//用户信息
}
const state = {
  // 需要维护的状态
  //是否认证
  isAuthenticated: false,
  user: {}
};
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
}
// 更改操作
const mutations = {
  // 是否授权
  [types.SET_AUTHENTICATED] (state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },
  [types.SET_USER] (state, user) {
    // 如果用户存在 则 同步到 state.user 否则就是空 
    if (user) state.user = user;
    else state.user = {}
  }
}
const actions = {
  setAutnenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false)
    commit(types.SET_USER, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
