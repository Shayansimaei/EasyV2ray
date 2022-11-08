const { app, BrowserWindow }=require('electron');
let path=require("path");
app.whenReady().then(() => {
    createWindow();
})
let createWindow=()=>{
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "/source/preload.js") // use a preload script
        },
    })
    win.loadFile('www/index.html');
    
}