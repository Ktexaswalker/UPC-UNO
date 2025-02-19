import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AutentificacioService } from '../app/services/autentificacio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  logeado:boolean = false;
  
    constructor(private autentificacioService: AutentificacioService) {}
  
    ngOnInit() {
      this.autentificacioService.usuariLoguejat.subscribe(
        (usuariLoguejat) => {
          this.logeado = usuariLoguejat;
        }
      );
    }
  
    logout() {
      this.autentificacioService.logout();
    }

}