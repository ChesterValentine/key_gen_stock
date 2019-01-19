const { ipcRenderer } = require('electron')

ipcRenderer.on('addPass:show', (event, arg) => {
    document.querySelector('#shadowing').style.display = 'block'
})

ipcRenderer.on('addPass:closed', (event, arg) => {
    document.querySelector('#shadowing').style.display = 'none'
})