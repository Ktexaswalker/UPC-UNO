import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectingToApiService {

  private url = "http://jsonplaceholder.typicode.com";
  constructor(private _http: HttpClient) { }

  //METODE 1: vull utilitzar el recurs /posts via GET
  getPosts() {
     //opció 1: la més bàsica:
   //return this._http.get(this.url+"/posts");

   //opció 2: ficant opcions de configuració després de la URL
   
   //enviar paràmetres
   const params=new HttpParams()
   .set('userId',3)
   //.set('id',29)
   
   const headers=new HttpHeaders()
   .set('Accept','application/json');
   
   return this._http.get(this.url+"/posts",{headers, params}).pipe(
     map(
       response=>{
           console.log('Estic a getPosts:');
           localStorage.setItem('nom','Maria');
           return response;
       }
     )
   );

  }

  //METODE 2: vull utilitzar el recurs /posts/1 via GET
  getPosts1(id: any) {
    return this._http.get(this.url + "/posts/" + id)
    // `${this.url}/posts/${id}`
  }

  insertingPost(value: any) {
    //opció 1 de post: la mes basica
    // return this._http.post(
    //   this.url+"/posts",
    //   JSON.stringify(value)
    // )

    //opció 2: quan necesito fer alguna cosa abans d'enviar
    return this._http.post(
      this.url + "/posts",
      JSON.stringify(value)).pipe(
        map(
          response => {
            console.log('Post creat', response);
            localStorage.setItem('user', 'Fabian');
            return response;
          }),
        catchError( //capturant els errors que venen des del servidor. No cal ja que la component tambe ho fara
          error => {
            console.log("Error al crear el post: ", error)
            return throwError(() => new Error('Alguna cosa no funciona!'))
          }
        ));
  }
}
