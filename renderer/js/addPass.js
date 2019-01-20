const { ipcRenderer } = require('electron')

let linkQuit = document.querySelector('#quit')
let sendBtn = document.querySelector('#send')

linkQuit.addEventListener('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('addPass:quit', '')
})

sendBtn.addEventListener('click', (event) => {
    event.preventDefault()
    let items = {
        details: document.querySelector('#details').value,
        login: document.querySelector('#login').value,
        mdp: document.querySelector('#mdp').value
    }

    ipcRenderer.send('items:add', items)
})