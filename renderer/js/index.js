const { ipcRenderer } = require('electron')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './renderer/db/database.sqlite'
    },
    useNullAsDefault: true
})

document.addEventListener("DOMContentLoaded", () => {
    // Select sur tous les mots de passe
    knex.select('details','login','pass')
    .from('pass')
    .map((row) => {
        inputTable(row)
    })
})

ipcRenderer.on('addPass:show', (event, arg) => {
    document.querySelector('#shadowing').style.display = 'block'
})

ipcRenderer.on('addPass:closed', (event, arg) => {
    document.querySelector('#shadowing').style.display = 'none'
})

ipcRenderer.on('items:show', (event,arg) => {
    inputTable(arg)
})

function inputTable(items) {
    let table = document.querySelector('tbody');
    let rowTable = document.createElement('tr');

    Object.keys(items).map((objectKey, index) => {
        let columnRow = document.createElement('td')
        if (index > 0){
            columnRow.className = 'text-center'
        }
        columnRow.innerHTML = items[objectKey]
        rowTable.appendChild(columnRow)
    })
    
    let columnRow = document.createElement('td')
    let imgColumn = document.createElement('img')
    columnRow.className = 'text-center del'
    imgColumn.src = '../img/trash.png'
    columnRow.appendChild(imgColumn)
    rowTable.appendChild(columnRow)
    table.appendChild(rowTable)
}