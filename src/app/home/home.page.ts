import { ServerModalComponent } from './server-modal/server-modal.component';
import { Server} from './../../../source/DTO/servers';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {guid} from "dyna-guid";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public servers:Server[];
  constructor(private modalCreator: ModalController)
{}
  async ngOnInit() {
    let server=new Server();
    server.user="root";
    server.id=guid();
    server.password="kNPsst5H2arhsUB"
    server.name="may Server";
    server.address="193.149.129.68"
    await ( window as any).properties.validateServer(server,this.setOs);
  }
  setOs(Os){
   this.servers=Os;
    console.log(this.servers);

  }
  async addServer(){
    const modal = await this.modalCreator.create({component:ServerModalComponent})
    modal.present();
  }
}
