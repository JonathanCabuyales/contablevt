import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  baseUrl = environment.baseUrl;
  resultado: any;

  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/novedad_get.php?token=${token}`);
    return this.resultado;
  }

  getCortes(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/novedad_cortes_get.php?token=${token}`);
    return this.resultado;
  }

  getReconexiones(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/novedad_reconexiones_get.php?token=${token}`);
    return this.resultado;
  }

  getFecha(fechadesde: any, fechahasta: any, token: any){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/novedadfecha_get.php?fechadesde=${fechadesde}&fechahasta=${fechahasta}&token=${token}`);
    return this.resultado;
  }

  getFechaCorte(fechadesde: any, fechahasta: any, token: any){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/cortesfecha_get.php?fechadesde=${fechadesde}&fechahasta=${fechahasta}&token=${token}`);
    return this.resultado;
  }

  getFechaReconexion(fechadesde: any, fechahasta: any, token: any){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/reconexionfecha_get.php?fechadesde=${fechadesde}&fechahasta=${fechahasta}&token=${token}`);
    return this.resultado;
  }

}
