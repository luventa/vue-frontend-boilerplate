import * as types from '../mutation-types'

// user related states can be added here.
const state = {
  id: null,
  name: null,
  title: null,
  token: null,
  isLoggedin: false
}

const mutations = {
  [types.USER_LOGIN] (state, userId) {
    state.isLoggedin = true
    state.id = userId
  },
  [types.USER_LOGOUT] (state) {
    state.isLoggedin = false
    state.id = null
  },
  [types.UPDATE_USER_TOKEN] (state, token) {
    state.token = token
  }
}

export default {
  state,
  mutations
}
