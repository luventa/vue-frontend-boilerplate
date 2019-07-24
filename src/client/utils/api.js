import { httpsAgent } from '../enrich/axios'

// Api uri
export const VALIDATE_USER_TOKEN = '/user/validateToken'
export const GET_YOU_DATA = '/getYourData'

export const STATES = {
  FAILED: 0,
  SUCCESS: 1
}

export const validateUserToken = async token => {
  const res = await httpsAgent.post(VALIDATE_USER_TOKEN, token)

  if (STATES.SUCCESS === res.data.rtnCode) {
    return true
  }

  throw new Error(res.data.rtnCode)
}
