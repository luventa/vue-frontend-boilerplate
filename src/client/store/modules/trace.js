import * as types from '../mutation-types'

// device related states can be added here.
const state = {
  current: null,
  inLandpage: true
}

const mutations = {
  [types.SET_CURRENT_TRACE] (state, current) {
    state.current = current
    state.inLandpage = current === '/Welcome'
  }
}

export default {
  state,
  mutations
}
