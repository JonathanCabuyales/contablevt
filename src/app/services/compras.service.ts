import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComprasI } from '../models/compras.interface';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(compra){
    this.resultado = this.http.post(`${this.baseUrl}/compras/compras_get.php`, JSON.stringify(compra));
    return this.resultado;
  }

  createCompra(compra: ComprasI){
    this.resultado = this.http.post(`${this.baseUrl}/compras/compras_insert.php`, JSON.stringify(compra));
    return this.resultado;
  }

}
