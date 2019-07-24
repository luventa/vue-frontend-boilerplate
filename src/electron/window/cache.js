// Cheap cache for browser window instances
const windows = Object.create(null)

export const closeAllWindow = () => {
  Object.keys(windows).forEach(name => {
    const instance = windows[name]
    console.log(name)
    if (instance && !instance.isDestroyed()) {
      instance.close()
    }
  })
}

export const clearCache = name => delete windows[name]

export default windows
