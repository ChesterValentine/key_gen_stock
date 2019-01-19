const { ipcRenderer } = require('electron')

let linkQuit = document.querySelector('#quit')

linkQuit.addEventListener('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('addPass:quit', '')
})