import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente } from './cliente.js';
// import { Observable } from 'rxjs/Observable';
import { of, Observable, throwError } from 'rxjs';
// import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable()
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
       // const clientes = response as Cliente[];
       return (response.content as Cliente[] ).map(c => {
        c.nombre = c.nombre.toUpperCase();
        c.createAt = formatDate(c.createAt, 'MMM-dd-yyyy', 'en-US');
        return c;
       });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e); // this a bad request from the server with one or more `errors`.
        }
        swal('Error', e.error.errMsg, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        swal('Error', e.error.errMsg, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e); // this a bad request from the server with one or more `errors`.
        }
        swal('Error', e.error.errMsg, 'error');
        return throwError(e);
      })
    )
    ;
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.errMsg);
        swal('Error', e.error.errMsg, 'error');
        return throwError(e);
      })
    );
  }
}
