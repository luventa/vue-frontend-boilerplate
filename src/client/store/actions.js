import * as types from './mutation-types'
import router from '@/router'
import { cookie } from 'js-cookie'
// import { httpsAgent } from '../enrich/axios'
// import { VALIDATE_USER_TOKEN, STATES } from '../utils/api'
// add axios here if nessesary - Luventa

export const userLogin = ({ commit }, userId, redirect = true) => {
  console.log(userId)
  if (userId) {
    !cookie.get('user_id') && cookie.set('user_id', userId)
    commit(types.USER_LOGIN, userId)
    redirect && router.push('/dashboard/peers')
  } else {
    commit(types.USER_LOGOUT)
    router.push('/')
  }
}

export const userLogout = ({ commit }) => {
  cookie.remove('user_id')
  commit(types.USER_LOGOUT)
  router.push('/')
}

export const updateUserToken = ({ commit }, token) => {
  commit(types.UPDATE_USER_TOKEN, token)
}

export const toggleShowLogin = ({ commit }) => {
  commit(types.TOGGLE_SHOW_LOGIN)
}

export const toggleDevice = ({ commit }, isMobile) => commit(types.TOGGLE_DEVICE, isMobile)

// Trace actions
export const setCurrentTrace = ({ commit }, current) => {
  commit(types.SET_CURRENT_TRACE, current)
}
