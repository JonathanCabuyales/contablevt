import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CuentasContablesService {
  
  resultado: any;
  baseUrl = environment.baseUrl;
  token: any;
  constructor(
    private _http: HttpClient,
    private _cookie: CookieService
  ) { }


  getCuentas(){
    this.token = this._cookie.get('token');
    this.resultado = this._http.get(`${this.baseUrl}/cuentas_contables/cuentas_contables_libro_get.php?token=${ this.token }`);
    return this.resultado;
  }

  addCuenta(){
    
  }
}
