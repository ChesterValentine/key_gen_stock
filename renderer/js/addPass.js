const { ipcRenderer } = require('electron')

let linkQuit = document.querySelector('#quit')
let sendBtn = document.querySelector('#send')
let keyGen = document.querySelector('#keygen')

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

keyGen.addEventListener('click', () => {
    let mdpEl = document.querySelector('#mdp')
    mdpEl.value = ''
    for (let i = 0; i < 10; i++) {
        let intChar = Math.floor(Math.random() * (126 - 33 + 1)) + 33
        mdpEl.value += String.fromCharCode(intChar)
    }
})