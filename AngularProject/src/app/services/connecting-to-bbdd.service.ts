import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectingToBbddService {
  private url = 'http://localhost:3000'; // Url del backend

  constructor(private _http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this._http.post<any>(this.url + '/login', credentials);
  }

  register(credentials: { username: string; password: string }): Observable<any> {
    return this._http.post<any>(this.url + '/register', credentials);
  }
}
