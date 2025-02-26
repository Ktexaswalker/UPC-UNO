import { Component } from '@angular/core';
import { AutentificacioService } from '../../services/autentificacio.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private autentifiacioService: AutentificacioService){}

  onSubmit() {
    this.autentifiacioService.logout();
    localStorage.setItem('isAuthenticated', "false");
  }
}
