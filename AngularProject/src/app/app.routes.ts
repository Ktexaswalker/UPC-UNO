import { Routes } from '@angular/router';
import { AccessingToServiceComponent } from './components/accessing-to-service/accessing-to-service.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home.component';
import { RulesComponent } from './components/rules/rules.component';

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
    path: '**',
    redirectTo: 'pagina404'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  // {
  //   path: 'admin',
  //   component: AdminComponent
  // },
  // {
  //   path: 'logout',
  //   component: LogoutComponent
  // },
];
