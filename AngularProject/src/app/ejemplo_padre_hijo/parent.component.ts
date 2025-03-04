import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  datoPadre:any='Valor inicial desde el padre';
  
  onDataChange(value:any){
    this.datoPadre=value;
  }
}
