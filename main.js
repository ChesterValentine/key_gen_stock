const electron = require('electron')
const { app, BrowserWindow, Menu, MenuItem, ipcMain} = electron

let mainWin
let addPassWin

// Fenêtre de création de mot de passe
function createAddPassWindow() {
    // Création de l'objet BrowserWindow contenant les options de la fenêtre d'ajout
    addPassWin = new BrowserWindow({
        parent: mainWin,
        modal: true,
        show: false,
        width: 500,
        height: 350,
        resizable: false,
        frame: false
    })

    // Chargement du fichier HTML
    addPassWin.loadFile('renderer/html/addpass.html')

    // Event dés que la fenêtre est prête
    addPassWin.once('ready-to-show', () => {
        // Envoi des infos à la fenêtre principal via l'event addPass:show
        // Vide ici car on ne veut que envoyer un event
        mainWin.webContents.send('addPass:show', '')
        // Affichage de la fenêtre
        addPassWin.show()
    })

    // Emit lorsque la fenêtre est fermée --Pour le Garbage Collector--
    addPassWin.on('closed', () => {
        // Garbage Collector
        addPassWin = null
        // Envoi des infos à la fenêtre principal via l'event addPass:cloded
        // Vide ici car on ne veut que envoyer un event
        mainWin.webContents.send('addPass:closed', '')
    })
}

///////////////////////
////// APP EVENT //////
///////////////////////

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cette évènement est émit
app.on('ready', () => {
    // Créer la fenêtre du navigateur
        mainWin = new BrowserWindow({ 
        width: 800, 
        height: 600,
        minWidth: 476
    })

    // et charge le index.html
    mainWin.loadFile('renderer/html/index.html')

    // Ouvre les devTools
    if (process.env.NODE_ENV !== 'production') {
        mainWin.webContents.openDevTools()
    }

    // Emit lorsque la fenêtre est fermée --Pour le Garbage Collector--
    mainWin.on('closed', () => {
        // Dé-référence de l'objet window, normalement, vous stockeriez les fenêtre
        // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
        // où vous devez supprimer l'élément correspondant
        mainWin = null
    })

    // Créer le menu à partir du template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    
    // Insérer le menu
    Menu.setApplicationMenu(mainMenu);
})

// Quitte l'application quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (win === null) {
        createWindow()
    }
})

////////////////////////
//// RENDERER EVENT ////
////////////////////////

//Catch l'event addPass:quit
ipcMain.on('addPass:quit', (event,arg) => {
    addPassWin.close()
})

//////////////////////
//////// MENU ////////
//////////////////////

// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
const mainMenuTemplate = [
    {
        label: 'Fichier',
        submenu: [
            {
                label: 'Ajouter un mot de passe',
                click() {
                    createAddPassWindow()
                }
            },
            {
                label: 'Quitter',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
]

// Si l'OS est mac, ajouter un objet vide au menu
if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}