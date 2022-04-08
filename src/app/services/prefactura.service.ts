import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrefacturaI } from '../models/prefatura.interface';

@Injectable({
  providedIn: 'root'
})
export class PrefacturaService {
  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/prefactura/prefactura_get.php?token=${token}`);
    return this.resultado;
  }

  createPrefactura(prefactura: PrefacturaI){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_insert.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

}
