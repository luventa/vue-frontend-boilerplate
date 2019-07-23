// Cheap cache for browser window instances
const cache = Object.create(null)

// mainWindow
cache.main = null

// child windows
cache.children = []

export default cache
