export const baseUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.DEV_PORT}`
  : `file://${__dirname}/index.html`

export const getUrl = href => href ? `${baseUrl}${href}` : href
