module.exports = {
  NODE_ENV: '"development"',
  ROUTE_BASE: '"/"',
  ROUTE_MODE: '"hash"',
  DEBUG: true,
  TARGET: `"${process.env.TARGET}"`,
  API_CONF: {
    baseURL: '"/api"',
    timeout: 60 * 1000,
    withCredentials: true,
    headers: {
      'x-app-token': '"680e24ad-43d6-4aef-baca-70752941f454"'
    }
  }
}
