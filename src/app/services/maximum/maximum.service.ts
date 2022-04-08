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


  /* getMovimiento(token: any){
    this.resultado = this._http.get(`${this.baseUrl}/maximum/maximum/maximum_factura_get.php?token=${token}`);
    return this.resultado;
  } */


}
