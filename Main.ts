import { DbManger } from './typeScript/DataBase';
import App from "./typeScript/app";
import { app, BrowserWindow } from 'electron';
let path=require("path")
let db=new DbManger();
new App(app, BrowserWindow,path,db);