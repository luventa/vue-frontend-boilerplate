// Cheap cache for browser window instances
const windows = Object.create(null)

export const closeAllWindow = () => {
  Object.keys(windows).forEach(name => {
    console.log(name)
    if (windows[name]) {
      windows[name].close()
    }
  })
}

export const clearCache = name => delete windows[name]

export default windows
