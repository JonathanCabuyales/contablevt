import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepreciacionService {
  baseUrl = environment.baseUrl;

  resultado: any;


  constructor(
    private _http: HttpClient
  ) { }


  getCuentasContables(token: any  ){
    this.resultado = this._http.get(`${this.baseUrl}/cuentas_contables/cuentas_contables_get.php?token=${token}`);
    return this.resultado;
  }
  

  insertDepreciacion(depreciacion: any){
    this.resultado = this._http.post(`${this.baseUrl}/depreciaciones/depreciacion_insert.php`, JSON.stringify(depreciacion));
    return this.resultado;
  }

  // funcion para obtener los datos para mostrar la depreciacion
  getDepreciaciones(token: any){
    this.resultado = this._http.get(`${this.baseUrl}/depreciaciones/depreciacion_get.php?token=${token}`);
    return this.resultado;
  }

  //servicio para actualizar los datos de la depreciacion
  updateDepreciacion(depreciacion: any){
    this.resultado = this._http.put(`${this.baseUrl}/depreciaciones/depreciaciones_update.php`, JSON.stringify(depreciacion));
    return this.resultado;
  }


  deleteDepreciacion(id_dep: any){
    this.resultado = this._http.get(`${this.baseUrl}/depreciaciones/depreciacion_delete.php?id_dep=${id_dep}`);
    return this.resultado;
  }

}
