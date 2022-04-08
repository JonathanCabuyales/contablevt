import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/notas/notas_get.php?token=${token}`);
    return this.resultado;
  }

  createNota(nota: any){
    this.resultado = this.http.post(`${this.baseUrl}/notas/nota_insert.php`, nota);
    return this.resultado;
  }

  deleteNota(nota: any){
    this.resultado = this.http.post(`${this.baseUrl}/notas/nota_delete.php`, nota);
    return this.resultado;
  }

  editnota(nota: any){
    this.resultado = this.http.post(`${this.baseUrl}/notas/nota_update.php`, nota);
    return this.resultado;
  }
}
