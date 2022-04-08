import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidornuevoService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(){
    this.resultado = this.http.get(`${this.baseUrl}/nuevomedidor/medidor_get.php`);
    return this.resultado;
  }

  createInstalacion(id_cli: number){
    this.resultado = this.http.post(`${this.baseUrl}/nuevomedidor/nuevomedidor.php`, id_cli);
    return this.resultado;
  }

  createMedidor(id_ins: number, codigo_med: string){
    this.resultado = this.http.get(`${this.baseUrl}/nuevomedidor/createmedidor.php?id_ins=${id_ins}&codigo_med=${codigo_med}`);
    return this.resultado;
  }

  deleteCliente(id: number){
    this.resultado = this.http.get(`${this.baseUrl}/clientes/clientes_delete.php?idCliente=${id}`);
    return this.resultado;
  }

}
