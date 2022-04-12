import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaximumService {
  
  baseUrl = environment.baseUrl;
  resultado: any;
  constructor(
    private _http: HttpClient,
  ) { 
    
  }


  insertFacturaMaximum(factura: any){

    this.resultado = this._http.post(`${this.baseUrl}/maximum/maximum_factura_insert.php`, JSON.stringify(factura));
    return this.resultado;
  }


  getFacturaIndividual(token: any, id_asiento: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum_factura_get_individual.php?token=${token}&id_asiento=${id_asiento}`);
    return this.resultado;
  }


  getFacturasMaximum(token: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum_factura_get.php?token=${token}`);
    return this.resultado;
  }


  insertarRelacion(relacion: any){
    this.resultado = this._http.post(`${this.baseUrl}/maximum/maximum_facturam_relacion.php`, JSON.stringify(relacion));
    return this.resultado;
  }


  getPrincipalesCuentas(token: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum_principales_get.php?token=${token}`);
    return this.resultado;
  }


  verifciarDatosJWT(token: any){
    this.resultado = this._http.get(`${this.baseUrl}/verificarJWT/verificarJWT.php?token=${token}`);
    return this.resultado;
  }


  cargarCuentasPrincipales(token: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum_principales_cuentas_get.php?token=${token}`);
    return this.resultado;
  }

  updateLibro(facturaData: any){
    this.resultado = this._http.put(`${this.baseUrl}/maximum/maximum_factura_update.php`, JSON.stringify(facturaData));
    return this.resultado;
  }


  getCuentasPrincipalesAgregar(token: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum_cuentas_principales_get.php?token=${token}`);
    return this.resultado;
  }


  getSubcuentas(token: any, numero: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum_subcuentas_get.php?token=${token}&numero=${numero}`);
    return this.resultado;
  }
  getUltimoValorSubcuenta(token: any, numero: string){

    let existePunto = numero.endsWith('.');

    numero = (existePunto) ? numero : numero + ".";
    
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum_cuentas_ultimo_get.php?token=${token}&numero=${numero}`);
    return this.resultado;
  }



  //funcion para permitir la creacion de cuentas
  insertCuentas(data: any){
    this.resultado = this._http.post(`${this.baseUrl}/maximum/maximum_insert_cuentas_contales.php`, JSON.stringify(data));
    return this.resultado;
    
  }
  /* getMovimiento(token: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum/maximum_factura_get.php?token=${token}`);
    return this.resultado;
  } */

  updateRegistrado(token: any, ids: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum_factura_update_registro_libro1.php?ids=${ids}&token=${token}`);
    return this.resultado;
  }



}
