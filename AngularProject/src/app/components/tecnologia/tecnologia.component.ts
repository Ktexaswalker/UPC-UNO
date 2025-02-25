import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tecnologia',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './tecnologia.component.html',
  styleUrl: './tecnologia.component.css'
})
export class TecnologiaComponent {
  //Falta poner javascript a typescript


  filterSelection(c: string):void {
    const elements = document.getElementsByClassName('filter-img') as HTMLCollectionOf<HTMLElement>;
    let removeOffsets = false;
    if(c === 'todas') c = "";
    Array.from(elements).forEach((img:any)=> {
      if (!img.dataset.originalClasses) {
        img.dataset.originalClasses = img.className;
      }
      if (img.className.indexOf(c) > -1 || c === "") {
        img.className = img.dataset.originalClasses;
        img.classList.remove('d-none');
      } else {
        img.classList.add('d-none');
        removeOffsets = true;
      }
    });
  }
  // filterSelection("all")
  // function filterSelection(c) {
  //     var x = document.getElementsByClassName("filter-img");
  //     let removeOffsets = false;
  //     if (c == "all") c = "";
  //     for (let i = 0; i < x.length; i++) {
  //         let img = x[i];
  //         if (!img.dataset.originalClasses) {
  //             img.dataset.originalClasses = img.className;
  //         }
  //         if (img.className.indexOf(c) > -1 || c === "") {
  //             img.className = img.dataset.originalClasses;
  //             img.classList.remove("d-none");
  //         } else {
  //             img.classList.add("d-none");
  //             removeOffsets = true;
  //         }
  //     }
  //     if (removeOffsets == true) {
  //         for (let i = 0; i < x.length; i++) {
  //             x[i].className = x[i].className.replace(/\boffset-\S+/g, "").trim();
  //         }
  //     }
  // }
}
