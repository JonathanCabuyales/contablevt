import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProsernuevoI } from '../models/prosernuevo.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdservService {

  baseUrl = environment.baseUrl;
  resultado: any;

  private _prodser: ProsernuevoI;

  public setProSer(proser: ProsernuevoI){
    this._prodser = proser;
  }
  
  public getProSer(){
    return this._prodser;
  }

  constructor(private http: HttpClient) { }

  getAll(token){
    this.resultado = this.http.post(`${this.baseUrl}/productosservicios/productos_servicios_get.php`, JSON.stringify(token));
    return this.resultado;
  }

  getOne(id_proser: number, token: string){
    this.resultado = this.http.get(`${this.baseUrl}/productosservicios/productos_servicios_getOne.php?id_proser=${id_proser}&token=${token}`);
    return this.resultado;
  }

  createProdSer(prodSer: any){
    this.resultado = this.http.post(`${this.baseUrl}/productosservicios/productos_servicios_insert.php`, prodSer);
    return this.resultado;
  }

  deleteProdSer(id_proser: number){
    this.resultado = this.http.get(`${this.baseUrl}/productosservicios/productos_servicios_delete.php?id_proser=${id_proser}`);
    return this.resultado;
  }

  updateProdSer(prodSer: ProsernuevoI){
    this.resultado = this.http.put(`${this.baseUrl}/productosservicios/productos_servicios_update.php`, JSON.stringify(prodSer));
    return this.resultado;
  }

  getitemcodigo(codigobarras: any, token: string){
    this.resultado = this.http.get(`${this.baseUrl}/productosservicios/productos_servicios_get_codigo.php?codigobarras=${codigobarras}&token=${token}`);
    return this.resultado;
  }

  updateProdSerFactura(prodSer: ProsernuevoI){
    this.resultado = this.http.put(`${this.baseUrl}/productosservicios/productos_servicios_update_factura.php`, JSON.stringify(prodSer));
    return this.resultado;
  }

}
