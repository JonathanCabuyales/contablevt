import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LameService {

  constructor(
    private _http: HttpClient
  ) { }

    insertCompraLame(data:any){
      return this._http.post(`${environment.baseUrl}/lame/lame_compras_insert.php`, JSON.stringify(data));
    }


    insertComprasLameEgresos(data:any){
      return this._http.post(`${environment.baseUrl}/lame/lame_compras_insert_egreso.php`, JSON.stringify(data));
    }
}
