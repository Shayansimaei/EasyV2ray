import { Server } from './../../source/DTO/servers';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrogeManagerService {

  constructor() { }
  getServers():Server[]{
    let servers=JSON.parse(localStorage.getItem("servers"))||[];
    return servers
  }
  async addServer(newServer:Server):Promise<void>{
    let servers=await this.getServers();
    servers.push(newServer);
    localStorage.setItem("servers",JSON.stringify(servers));
  }
  async editServers(editedServer:Server):Promise<void>{
    let servers=await this.getServers();
    servers=servers.filter(x=>x.id!=editedServer.id);
    servers.push(editedServer);
    localStorage.setItem("servers",JSON.stringify(servers));
  }
  async deleteServers(deletedServer:Server):Promise<void>{
    let servers=await this.getServers();
    servers=servers.filter(x=>x.id!=deletedServer.id);
    localStorage.setItem("servers",JSON.stringify(servers));
  }
}
