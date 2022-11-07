export default class App{
private win;
    constructor(private app:Electron.App,private BrowserWindow:any ){
        app.whenReady().then(() => {
            this.createWindow()
          })
}
createWindow(){

    this.win = new this.BrowserWindow({
        width: 800,
        height: 600
      })
    
      this.win.loadFile('www/index.html')

}
}