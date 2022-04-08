import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClienteI } from '../models/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteserService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/clientes/clientes_get.php?token=${token}`);
    return this.resultado;
  }

  createCliente(cliente: ClienteI){
    this.resultado = this.http.post(`${this.baseUrl}/clientes/clientes_insert.php`, cliente);
    return this.resultado;
  }

  deleteCliente(id_cli: number){
    this.resultado = this.http.get(`${this.baseUrl}/clientes/clientes_delete.php?id_cli=${id_cli}`);
    return this.resultado;
  }

  updateCliente(cliente: ClienteI){
    this.resultado = this.http.put(  `${this.baseUrl}/clientes/clientes_update.php`, JSON.stringify(cliente));
    return this.resultado;
  }

  verificarCliente(token: any, ciruc_cli: any){
    this.resultado = this.http.get(`${this.baseUrl}/clientes/clientes_verificar.php?token=${token}&ciruc_cli=${ciruc_cli}`);
    return this.resultado;
  }
  
}