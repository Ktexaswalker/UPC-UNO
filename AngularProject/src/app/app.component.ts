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
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TorneosComponent } from './components/torneos/torneos.component';
import { AddTorneoComponent } from './components/add-torneo/add-torneo.component';
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { Observable } from 'rxjs';
import { HomeComponent } from './components/home/home.component';
import { NgClass } from '@angular/common';
import { AfegirTorneoComponent } from './components/afegir-torneo/afegir-torneo.component';

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
    FooterComponent,
    TorneosComponent,
    AddTorneoComponent,
    NotfoundComponent,
    HomeComponent,
    NgClass,
    AfegirTorneoComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  logeado:boolean = false;
  isFixed:boolean = false;

  constructor(private autentificacioService: AutentificacioService, private router: Router) {
  }

  getCurrentUrl():string {
    return this.router.url;
  }
  
  esPagina(c:string[]): boolean {
    const rutasSet = new Set(c);
    if (rutasSet.has("/upc") || rutasSet.has('/login') || rutasSet.has('/register')) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
    return rutasSet.has(this.getCurrentUrl());

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