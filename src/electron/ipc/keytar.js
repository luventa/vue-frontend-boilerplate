import keytar from 'keytar'

/**
 * Initialize ipc handlers for keytar.
 * @param {IpcMain} ipcMain of electron.
 */
export default ipcMain => {
  ipcMain.on('keytar-get', async (event, args) => {
    try {
      console.log('test123')
      const { service, account } = args
      const password = await keytar.getPassword(service, account)
      event.reply('keytar-get', password)
    } catch (err) {
      event.reply('keytar-get', false)
    }
  })

  ipcMain.on('keytar-set', async (event, args) => {
    try {
      console.log('asdasdasdasd')
      const { service, account, password } = args
      await keytar.setPassword(service, account, password)
      event.reply('keytar-set', true)
    } catch (err) {
      event.reply('keytar-set', false)
    }
  })
}
