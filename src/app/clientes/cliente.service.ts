import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente } from './cliente.js';
// import { Observable } from 'rxjs/Observable';
import { of, Observable } from 'rxjs';
// import { of } from 'rxjs/observable/of';

@Injectable()
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> { return of(CLIENTES); }
}