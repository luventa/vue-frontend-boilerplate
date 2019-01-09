module.exports = {
  NODE_ENV: '"development"',
  ROUTE_MODE: '"hash"',
  APP_UPDATER: '"https://test-jrb2b-stg.pingan.com.cn/resource/download/app_client"',
  DEBUG: true,
  API_CONF: {
    baseURL : '"/api"',
    timeout: 60 * 1000,
    withCredentials: true,
    headers: {
      'application-token': '"680e24ad-43d6-4aef-baca-70752941f454"'
    }
  }
}

