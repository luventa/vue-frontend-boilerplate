module.exports = {
  NODE_ENV: '"testing"',
  ROUTE_BASE: '"/"',
  ROUTE_MODE: '"history"',
  APP_UPDATER: '"https://stg.demo.com/resource/download/app_client"',
  DEBUG: false,
  TARGET: `"${process.env.TARGET}"`,
  API_CONF: {
    baseURL: process.env.TARGET === 'web'
      ? '"/geteway"'
      : '"https://stg.demo.com/geteway"',
    timeout: 120 * 1000,
    withCredentials: true,
    headers: {
      'x-app-token': '"680e24ad-43d6-4aef-baca-70752941f454"'
    }
  }
}
