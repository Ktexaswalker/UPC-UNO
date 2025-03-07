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

 constructor(private _connectingToBbddService: ConnectingToBbddService) {

    this.getTorneos();

  }

  getTorneos() {

    this._connectingToBbddService.getTorneos().subscribe((response: any) => {
      this.torneos = response;
      
    });
   
 }


  
}
