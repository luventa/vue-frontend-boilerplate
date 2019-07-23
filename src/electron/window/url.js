export default process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.DEV_PORT}`
  : `file://${__dirname}/index.html`
