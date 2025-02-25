import { Component } from '@angular/core';
import { ConnectingToBbddService } from '../../services/connecting-to-bbdd.service';
import { AutentificacioService } from '../../services/autentificacio.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [

  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private connectBBDD: ConnectingToBbddService, private autentificacioService: AutentificacioService) {
    //Torneos CRUD
    this.autentificacioService.usuariAutentificat();
  }
  //1º paso llama al servicio
  //2º comprobar validacion al servidor (si hay localStorage, haz, sino vuelves)
  //3º pedir el token
  //3º Si no hay localStore, redirect home
}
