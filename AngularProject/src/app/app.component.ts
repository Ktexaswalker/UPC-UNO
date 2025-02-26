import { Component } from '@angular/core';
import { AutentificacioService } from '../app/services/autentificacio.service';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SliderComponent } from './components/slider/slider.component';
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from './components/login/login.component';
import { RulesComponent } from './components/rules/rules.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ProgramersComponent } from './components/programers/programers.component';
import { TecnologiaComponent } from "./components/tecnologia/tecnologia.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SliderComponent,
    RulesComponent,
    TecnologiaComponent,
    AboutusComponent,
    ProgramersComponent,
    TecnologiaComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  logeado:boolean = false;
  
    constructor(private autentificacioService: AutentificacioService, private router: Router) {}
  
    esPagina(c:string): boolean {
      // let c:string = '/login';
      return this.router.url === c;
    }

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