import { Routes } from '@angular/router';
import { AccessingToServiceComponent } from './components/accessing-to-service/accessing-to-service.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home.component';
import { RulesComponent } from './components/rules/rules.component';
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TorneosComponent } from './components/torneos/torneos.component';
import { AddTorneoComponent } from './components/add-torneo/add-torneo.component';
import { AfegirTorneoComponent } from './components/afegir-torneo/afegir-torneo.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  // {
  //   path: 'rules',
  //   component: RulesComponent
  // },
  // {
  //   path: 'aboutus',
  //   component: AboutusComponent
  // },
  // {
  //   path: 'accessingtoservice',
  //   component: AccessingToServiceComponent
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: 'torneos',
    component: TorneosComponent

  },
  {
    path: 'add-torneo',
    component: AddTorneoComponent
  },
  {
    path: 'afegir-torneo',
    component: AfegirTorneoComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    // redirectTo: 'pagina404',
    component: NotfoundComponent
  },


  //Ejemplo ruta con Guard:
  // {path: 'formTemplate', component: FormComponent,canActivate: [AuthGuard]},


  // {
  //   path: 'admin',
  //   component: AdminComponent
  // },
  // {
  //   path: 'logout',
  //   component: LogoutComponent
  // },
];

//Perque router outlet funcione
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes)]
// };
