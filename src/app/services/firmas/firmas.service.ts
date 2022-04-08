import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirmasService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/firmas/firmas_dash.php?token=${token}`);
    return this.resultado;
  }

  getFirmas(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/firmas/firmas_get.php?token=${token}`);
    return this.resultado;
  }

  deleteFirmas(firma: any){
      this.resultado = this.http.post(`${this.baseUrl}/firmas/firmas_delete.php`, JSON.stringify(firma));
      return this.resultado;
  }

}
