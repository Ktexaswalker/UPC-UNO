import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  //Este decorador permite que el padre pase al hijo un valor
  @Input() dataFill!:any;//declarando un paràmetro de entrada

  @Output() dataToParent=new EventEmitter<any>();

  changeData(){
    this.dataFill="Valor que viene desde el hijo hacia el padre";
    this.dataToParent.emit(this.dataFill);
  }

}
