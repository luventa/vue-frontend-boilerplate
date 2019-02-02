module.exports = {
  NODE_ENV: '"testing"',
  ROUTE_MODE: '"history"',
  APP_UPDATER: '"https://test-jrb2b-stg.pingan.com.cn/resource/download/app_client"',
  DEBUG: false,
  API_CONF: {
    baseURL : process.env.TARGET === 'web'
      ? '"/geteway"'
      : '"https://test-jrb2b-stg.pingan.com.cn/geteway"',
    timeout: 120 * 1000,
    withCredentials: true,
    headers: {
      'application-token': '"680e24ad-43d6-4aef-baca-70752941f454"'
    }
  }
}
