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
    knex.select('id','details','login','pass')
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
    let tableLength = table.querySelectorAll('tr').length
    let rowTable = document.createElement('tr');
    rowTable.dataset.line = tableLength

    Object.keys(items).map((objectKey, index) => {
        if (objectKey == 'id') {
            rowTable.dataset.id = items[objectKey]
        }
        else {
            let columnRow = document.createElement('td')
            if (index > 1){
                columnRow.className = 'text-center'
            }
            columnRow.innerHTML = items[objectKey]
            rowTable.appendChild(columnRow)
        }
    })
    
    let columnRow = document.createElement('td')
    let imgColumn = document.createElement('img')
    columnRow.className = 'text-center del'
    imgColumn.src = '../img/trash.png'
    imgColumn.style.cursor = 'pointer'
    imgColumn.addEventListener('click', (event) => {
        let el = event.currentTarget;
        let row = el.parentNode.parentNode
        let bConfirm = confirm('Confirmer la suppression de cette ligne : ')
        if (!bConfirm) {
            event.preventDefault()
        }
        else {
            let id = row.dataset.id
            let line = row.dataset.line
            ipcRenderer.send('items:remove', id)
            row.parentNode.deleteRow(line)
        }
    })
    columnRow.appendChild(imgColumn)
    rowTable.appendChild(columnRow)
    table.appendChild(rowTable)
}