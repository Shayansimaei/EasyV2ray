import { ServerModalComponent } from './server-modal/server-modal.component';
import { Server} from './../../../typeScript/DTO/servers';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';

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
    // this.servers=await (window as any).properties.servers;
  }
  async addServer(){
    const modal = await this.modalCreator.create({component:ServerModalComponent})
    modal.present();

  }
}
