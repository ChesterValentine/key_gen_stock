const electron = require('electron')
const { app, BrowserWindow, Menu } = electron


// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cette évènement est émit
app.on('ready', () => {
    // Créer la fenêtre du navigateur
    let mainWin = new BrowserWindow({ 
        width: 800, 
        height: 600,
        maxWidth: 1000
    })

    // et charge le index.html
    mainWin.loadFile('assets/html/index.html')

    // Ouvre les devTools
    if (process.env.NODE_ENV !== 'production') {
        mainWin.webContents.openDevTools()
    }

    // Emit lorsque la fenêtre est fermée
    mainWin.on('closed', () => {
        // Dé-référence de l'objet window, normalement, vous stockeriez les fenêtre
        // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
        // où vous devez supprimer l'élément correspondant
        mainWin = null
    })
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

// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.