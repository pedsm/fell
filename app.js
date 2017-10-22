const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

process.env.GOOGLE_API_KEY = 'AIzaSyC8AEkXwGA3XqX44eSaQlZTtaCsPkSEmVA'

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 })
    win.setMenu(null)

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true,
    }))

    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

