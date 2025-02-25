import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConnectingToBbddService {
  private url = 'http://localhost:3000'; // Url del backend

  constructor(private _http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this._http.post<any>(this.url + '/login', credentials).pipe(

      //PIPE PER AFEGIR EL TOKEN A LOCALSTORAGE
      //El operador tap es un operador que s'aplica a cada emisió de un Observable
      tap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          alert(localStorage.getItem('accessToken'));
          console.log(localStorage.getItem('accessToken'));
          localStorage.clear();
          //test
        }
      })
    );
  
  }

  register(credentials: { username: string; password: string }): Observable<any> {
    return this._http.post<any>(this.url + '/register', credentials);
  }
  
}
