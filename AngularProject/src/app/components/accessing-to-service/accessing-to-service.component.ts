import { Component } from '@angular/core';
import { ConnectingToApiService } from '../../services/connecting-to-api.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-accessing-to-service',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './accessing-to-service.component.html',
  styleUrl: './accessing-to-service.component.css'
})
export class AccessingToServiceComponent {
  myPosts: any;
  value: any;
  id: any = 45;
  errors: string = "";
  constructor(private myService: ConnectingToApiService) {
    //PRIMERA CONSULTA
    this.myService.getPosts().subscribe({
      next: (response) => {
        this.myPosts = response;
        console.log(response)
      },
      error: (e) => console.log(e),
      complete: () => console.log('Tasca completada')
    })

    // SEGONA CONSULTA
    this.myService.getPosts1(this.id).subscribe({
      next: (response) => {
        this.value = JSON.stringify(response);
        console.log(this.value)
      },
      error: (e) => {
        console.log(e);
        if (e.status == 404) {
          this.errors = "No tenim coincidencies.";
        } else {
          this.errors = "Problemes amb el servidor.";
        }
      }
    })

    // TERCERA CONSULTA
    // 
    this.myService.insertingPost({userId:1,id:11,title:'proves'}).subscribe({
      next:(response => console.log(response)),
      error: (e) => console.error(e),
      complete: () => console.info("Tasca completada")
    })
  }

}
