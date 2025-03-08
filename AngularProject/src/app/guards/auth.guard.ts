import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { ComunicacioService } from './services/comunicacio.service';
import { ConnectingToBbddService } from '../services/connecting-to-bbdd.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private conectingToDataBase: ConnectingToBbddService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //  if(!localStorage.getItem('validate')) {
  //   console.log("no estas loguejat");
  //   return true;
  // }
  if (this.conectingToDataBase.getToken()) {
    console.log("recibo el token desde el servicio");
    return true;
  }
  //this.router.navigate(['/connecting']);
  return false;
}
}