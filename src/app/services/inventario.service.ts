import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InventarioI } from '../models/inventario/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(token){
    this.resultado = this.http.post(`${this.baseUrl}/inventario/inventario_get.php`, JSON.stringify(token));
    return this.resultado;
  }

  getOne(id_proser: number, id_usuario: number){
    this.resultado = this.http.get(`${this.baseUrl}/inventario/inventario_getOne.php?id_proser=${id_proser}?id_usuario=${id_usuario}`);
    return this.resultado;
  }

  createInvetario(inventario: InventarioI){
    this.resultado = this.http.post(`${this.baseUrl}/inventario/inventario_insert.php`, JSON.stringify(inventario));
    return this.resultado;
  }

  updateProdSer(inventario: InventarioI){
    this.resultado = this.http.put(`${this.baseUrl}/inventario/inventario_update.php`, JSON.stringify(inventario));
    return this.resultado;
  }
  
}
