import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SueldosI } from '../models/sueldos/sueldos.interface';

@Injectable({
  providedIn: 'root'
})
export class SueldosService {

  baseUrl = environment.baseUrl;
  resultado: any;

  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/sueldos/sueldos_get.php?token=${token}`);
    return this.resultado;
  }

  getOne(id_sueldo: number){
    this.resultado = this.http.get(`${this.baseUrl}/sueldos/productos_servicios_getOne.php?id_sueldo=${id_sueldo}`);
    return this.resultado;
  }

  getSueldosMes(fecha: string, token: any){
    this.resultado = this.http.get(`${this.baseUrl}/sueldos/sueldos_mes_get.php?fecha=${fecha}&token=${token}`);
    return this.resultado;
  }

  createSueldo(sueldo: SueldosI){
    this.resultado = this.http.post(`${this.baseUrl}/sueldos/sueldos_insert.php`, sueldo);
    return this.resultado;
  }

  // verificarSueldo(id_usuario: any, token: any){
  //   this.resultado = this.http.get(`${this.baseUrl}/sueldos/sueldoverificar_get.php?id_usuario=${id_usuario}&token=${token}`);
  //   return this.resultado;
  // }

  verificarSueldo(id_usuario: any, fecha: any, token: any){
    this.resultado = this.http.get(`${this.baseUrl}/sueldos/sueldo_verificar.php?id_usuario=${id_usuario}&mes_rol=${fecha}&token=${token}`);
    return this.resultado;
  }

  deleteSueldo(id_sueldo: number){
    this.resultado = this.http.get(`${this.baseUrl}/sueldos/productos_servicios_delete.php?id_sueldo=${id_sueldo}`);
    return this.resultado;
  }

  updateSueldo(sueldo: any){
    this.resultado = this.http.put(`${this.baseUrl}/sueldos/sueldo_update.php`, JSON.stringify(sueldo));
    return this.resultado;
  }

  getSueldoUsuario(token: any, id_usuario: any){
    this.resultado = this.http.get(`${this.baseUrl}/sueldos/sueldo_get_usuario.php?token=${token}&id_usuario=${id_usuario}`);
    return this.resultado;
  }

}
