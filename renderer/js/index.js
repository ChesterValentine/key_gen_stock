const { ipcRenderer } = require('electron')

ipcRenderer.on('addPass:show', (event, arg) => {
    document.querySelector('#shadowing').style.display = 'block'
})

ipcRenderer.on('addPass:closed', (event, arg) => {
    document.querySelector('#shadowing').style.display = 'none'
})

ipcRenderer.on('items:add', (event,arg) => {
    let table = document.querySelector('tbody');
    let rowTable = document.createElement('tr');
    console.log(arg)

    Object.keys(arg).map((objectKey, index) => {
        let columnRow = document.createElement('td')
        if (index > 0){
            columnRow.className = 'text-center'
        }
        columnRow.innerHTML = arg[objectKey]
        rowTable.appendChild(columnRow)
    })
    
    let columnRow = document.createElement('td')
    let imgColumn = document.createElement('img')
    columnRow.className = 'text-center del'
    imgColumn.src = '../img/trash.png'
    columnRow.appendChild(imgColumn)
    rowTable.appendChild(columnRow)
    table.appendChild(rowTable)
})