import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentificacioService {

  constructor(private router: Router) { }
  private autentificat = new BehaviorSubject<boolean>(false);
    usuariLoguejat = this.autentificat.asObservable();
  
    usuariAutentificat() {
      this.autentificat.next(true);
      localStorage.setItem('isAuthenticated', 'true');

    }
  
    logout() {
      this.autentificat.next(false);
      localStorage.removeItem('isAuthenticated');
      this.router.navigate(['/login']);
    }
}
