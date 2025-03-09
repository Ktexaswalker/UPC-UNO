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
  torneoElegido: any[]=[];
  torneo_name: string = '';
  torneoSeleccionado: any = null;
  @Input() addTorneo: any;
  @Output() click = new EventEmitter<string>();
  // @Output() addTorneo: any;


 constructor(private _connectingToBbddService: ConnectingToBbddService, private router: Router) {
  
  //Si la localstorage amb el accessToken no existeix, redirigeix a la pàgina de login
<<<<<<< HEAD
  // if(localStorage.getItem('accessToken')){

  //   this.getTorneos();

  // }
  // else{

  //   this.router.navigate(['/login']);

  // }
  this.getTorneos();
=======
    if(localStorage.getItem('accessToken')){
      this.getTorneos();
    } else{
      this.router.navigate(['/login']);
    }
  }

  cambiar(torneoSeleccionado: string) {
    console.log("Torneo actualizado:", torneoSeleccionado);
    this.getTorneos();
>>>>>>> 7e22027453ec359ca3f428c27e57b6884f70445e
  }

  getTorneos() {
    this._connectingToBbddService.getTorneos().subscribe({
      next: (response) => {
        this.torneos = response?.torneos || [];
        console.log(this.torneos);
      },
      error: (error) => {
        console.error('Error al obtenir torneos:', error);
      },
      complete: () => console.info('Els tornejos han sigut obtinguts')
    });
 }

  eliminarTorneo(torneo: string){
    this._connectingToBbddService.esborrar_torneo(torneo).subscribe({
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

  editarTorneo(torneo:any){
    this.torneo_name = torneo.torneo;
    // this.router.navigate(['/login']);
    // this._connectingToBbddService.actualitzar_torneo(torneo.torneo, torneo.description).subscribe({
    //   next: (response) => {
    //     this.torneos = response.torneos;
    //   },
    //   error: (error) => {
    //     console.error('Error al editar el torneo', error);
    //   },
    //   complete: ()=> console.info('El torneo ha sido modificado')
    // //falta  redirigir a add-torneo
    // //  this.router.navigate(['/add-torneo']);
    // });
  }
}
