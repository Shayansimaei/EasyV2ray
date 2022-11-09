import { TranslateService } from '@ngx-translate/core';
import { AlertController, ModalController } from '@ionic/angular';
import { StrogeManagerService } from './../../stroge-manager.service';
import { Server } from './../../../../source/DTO/servers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-modal',
  templateUrl: './server-modal.component.html',
  styleUrls: ['./server-modal.component.scss'],
})
export class ServerModalComponent implements OnInit {
  server:Server;
  isEdit:boolean;
  constructor(
    private service:StrogeManagerService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    public translate: TranslateService,
    ) { }

  ngOnInit() {


  }
  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  async confirm(){
    if(
      this.server.address?.length
      &&this.server.name?.length>1
      &&this.server.user?.length>1
      &&this.server.password?.length>1){
    if(this.isEdit){
      this.service.editServers(this.server);
    }
    else{
      this.service.addServer(this.server);
    }
    return this.modalCtrl.dismiss(this.server, 'confirm');
  }
  else{
    const alert = await this.alertController.create({
      header: this.translate.instant("error"),
      subHeader: this.translate.instant("allFieldsAreRequired"),
      message: this.translate.instant("fieldsDon'tFillCorrectly"),
      buttons: [this.translate.instant('ok')],
    });

    await alert.present();
  }

  }
}
