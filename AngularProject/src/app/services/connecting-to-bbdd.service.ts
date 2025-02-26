import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  //Perquè es posa <any> a post i al Observable?
  //Per que el tipus de dades que s'espera que arribi, no està definit en el moment.
  // Es una forma de dir que qualsevol tipus de dades es vàlid per la resposta
  register(credentials: { username: string; password: string }): Observable<any> {
    return this._http.post<any>(this.url + '/register', credentials);
  }

  getTorneos(): Observable<any> {

    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
     'Authorization':`Bearer ${token}`
  });

    return this._http.get<any>(this.url + '/torneos', { headers });
  }
  
  crear_torneo(credentials: { torneo: string; description: string }): Observable<any> {

    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
     'Authorization':`Bearer ${token}`
  });

    return this._http.post<any>(this.url + '/crear_torneo', credentials, { headers });
  }



  

  
}
