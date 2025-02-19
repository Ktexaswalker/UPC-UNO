import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutentificacioService } from '../../services/autentificacio.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
