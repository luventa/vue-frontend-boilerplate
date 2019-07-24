import { ipcMain } from 'electron'
import sha1 from 'hash.js/lib/hash/sha/1'
import { createChildWindow } from '../window'
import windows from '../window/cache'

export const initializeIpc = () => {
  ipcMain.on('open-window', (event, opts) => {
    let winHash = sha1().update(opts.url).digest('hex')
    console.log(opts)
    createChildWindow({
      ...opts,
      name: `${opts.name}-${winHash}`
    })
  })

  ipcMain.on('task-saved', (event, task) => {
    console.log('Task saved:', task)
    // Now tell main window to refresh list.
    windows.main.webContents.send('refresh-task-list')
  })
}
