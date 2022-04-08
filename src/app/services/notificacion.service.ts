import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  baseUrl = environment.baseUrl;
  resultado: any;

  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/notificacion_get.php/get.php?token=${token}`);
    return this.resultado;
  }

  getFecha(fechadesde: any, fechahasta: any, token: any){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/notificacionfecha_get.php?fechadesde=${fechadesde}&fechahasta=${fechahasta}&token=${token}`);
    return this.resultado;
  }

}