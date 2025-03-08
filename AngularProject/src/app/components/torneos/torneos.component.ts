import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConnectingToBbddService } from '../../services/connecting-to-bbdd.service';
import { AddTorneoComponent } from '../add-torneo/add-torneo.component';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-torneos',
  standalone: true,
  imports: [
    AddTorneoComponent,
    NgxPaginationModule
  ],
  templateUrl: './torneos.component.html',
  styleUrl: './torneos.component.css'
})
export class TorneosComponent {
  items: any[] = [];
  page: number = 1;
  pageSize:number = 5;
  torneos: any[] = [];
  // torneo: string = '';
  torneo_name: string = '';
  torneoSeleccionado: any = null;
  @Input() addTorneo: any;
  // @Output() addTorneo: any;


 constructor(private _connectingToBbddService: ConnectingToBbddService) {
    this.torneos.push(this.getTorneos());
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
      complete: () => this.getTorneos()
    });
  }

  editarTorneo(torneo: string){
    alert(torneo);
    this.torneo_name = torneo;
    //falta  redirigir a add-torneo
    //  this.router.navigate(['/add-torneo']);

  }

  onDataChange(event: any) {
    console.log('Datos recibidos del hijo:', event);
    this.torneoSeleccionado = null; // Ocultar el formulario después de guardar
  }

}
