import { Component } from '@angular/core';
import { ConnectingToBbddService } from '../../services/connecting-to-bbdd.service';
import { AddTorneoComponent } from '../add-torneo/add-torneo.component';

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
  torneo_name: string = '';
  

 constructor(private _connectingToBbddService: ConnectingToBbddService) {

    this.getTorneos();

  }

  getTorneos() {

    this._connectingToBbddService.getTorneos().subscribe({
      next: (response) => {
        this.torneos = response.torneos;
        console.log(this.torneos);
      },
      error: (error) => {
        console.error('Error al obtenir torneos:', error);
      },
      complete: () => console.info('Els tornejos han sigut obtinguts')
    });
   
 }

 eliminarTorneo(torneo: string){


  this._connectingToBbddService.esborrar_torneo({ torneo: torneo }).subscribe({
    next: (response) => {
      this.torneos = response.torneos;
      console.log(this.torneos);
    },
    error: (error) => {
      console.error('Error al obtenir torneos:', error);
    },
    complete: () =>     this.getTorneos()

  });


 }

 editarTorneo(torneo: string){

  alert(torneo);
  this.torneo_name = torneo;
  //falta  redirigir a add-torneo
  //  this.router.navigate(['/add-torneo']);


 }




  
}
