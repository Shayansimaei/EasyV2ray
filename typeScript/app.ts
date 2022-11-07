import { DbManger } from './DataBase';
export default class App{
private win;
    constructor(private app:Electron.App,private BrowserWindow:any,private path:any,private Db:DbManger){
        app.whenReady().then(() => {
            this.createWindow();
          })
}
createWindow(){
    this.win = new this.BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //     preload: this.path.join(__dirname, 'typeScript/preload.js'),
        //   },
      })
    
      this.win.loadFile('www/index.html')

}
}