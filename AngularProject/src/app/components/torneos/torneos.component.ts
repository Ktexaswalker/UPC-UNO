import { Component } from '@angular/core';
import { ConnectingToBbddService } from '../../services/connecting-to-bbdd.service';

@Component({
  selector: 'app-torneos',
  standalone: true,
  imports: [],
  templateUrl: './torneos.component.html',
  styleUrl: './torneos.component.css'
})
export class TorneosComponent {

  torneos: any[] = [];
  torneo: string = '';

 constructor(private _connectingToBbddService: ConnectingToBbddService) {

    this.getTorneos();

  }

  getTorneos() {

    this._connectingToBbddService.getTorneos().subscribe((response: any) => {
      this.torneos = response;

    });
   
 }

 eliminarTorneo(torneo: string){

  alert(torneo);

  this._connectingToBbddService.esborrar_torneo({ torneo: torneo }).subscribe((response: any) => {
    this.getTorneos();

  });


 }

 editarTorneo(torneo: string){

  alert(torneo);


 }




  
}
