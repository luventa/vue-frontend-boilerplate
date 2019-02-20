module.exports = {
  NODE_ENV: '"production"',
  ROUTE_MODE: '"history"',
  APP_UPDATER: '"https://prod.demo.com/resource/download/app_client"',
  DEBUG: false,
  API_CONF: {
    baseURL: process.env.TARGET === 'web'
      ? '"/geteway"'
      : '"http://prod.demo.com/geteway"',
    timeout: 60 * 1000,
    withCredentials: true,
    headers: {
      'x-app-token': '"680e24ad-43d6-4aef-baca-70752941f454"'
    }
  }
}
