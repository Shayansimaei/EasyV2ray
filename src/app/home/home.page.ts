import { TranslateService } from '@ngx-translate/core';
import { StorageManagerService } from '../storage-manager.service';
import { ServerModalComponent } from './server-modal/server-modal.component';
import { Server} from './../../../source/DTO/servers';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import {guid} from "dyna-guid";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public servers:Server[];
  constructor(
    public translate: TranslateService,
    private modalCreator: ModalController,
    private service:StorageManagerService,
    private alertController: AlertController)
{}
  async ngOnInit() {
    this.getServers()
  }
  getServers() {
    this.servers = this.service.getServers();
  }

  async deleteServer(item:Server){
    const alert = await this.alertController.create({
      header: this.translate.instant("deletingServer"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: this.translate.instant("confirm"),
          role: 'confirm',
          handler: async () => {
            await this.service.deleteServers(item);
            this.getServers();
          },
        },
      ],
    });
    await alert.present();
  }
  async addServer(){
    let server=new Server();
        server.id=guid();
    const modal = await this.modalCreator.create({component:ServerModalComponent,componentProps:{
      server:server,
      isEdit:false
    }})
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.servers = this.service.getServers();
    }

  }
  async editServer(item){
    const modal = await this.modalCreator.create({component:ServerModalComponent,componentProps:{
      server:item,
      isEdit:true
    }})
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.servers = this.service.getServers();
    }

  }
  async runV2ray(item){
    await (window as any ).properties.easyInstall(item,edit)
    function edit(server){
      this.servers = this.service.getServers();

    }
  }

}
