import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentificacioService {

  constructor(private router: Router) { }
  private autentificat = new BehaviorSubject<boolean>(this.getAuthStatus());
    usuariLoguejat = this.autentificat.asObservable();
  
    private getAuthStatus(): boolean {
      // Regresa `true` si el token existe
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    
    usuariAutentificat() {
      this.autentificat.next(true);
      localStorage.setItem('isAuthenticated', 'true');
    }

    //EL localStorage.clear()
    //Es per esborrar totes les localStorages, inclosa la del accessToken
    logout() {
      this.autentificat.next(false);
      localStorage.removeItem('isAuthenticated');
      localStorage.clear();
      this.router.navigate(['/login']);
    }
}
