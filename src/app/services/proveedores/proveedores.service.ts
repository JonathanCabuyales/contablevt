import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/proveedores/proveedores_get.php?token=${token}`);
    return this.resultado;
  }

  createProveedor(proveedor: any){
    this.resultado = this.http.post(`${this.baseUrl}/proveedores/proveedores_insert.php`, proveedor);
    return this.resultado;
  }

  deleteProveedor(id_cli: any){
    
  }

  updateProveedor(cliente: any){
    
  }

  verificarProveedor(token: any, ciruc_prove: any){
    this.resultado = this.http.get(`${this.baseUrl}/proveedores/proveedores_verificar.php?token=${token}&ciruc_prove=${ciruc_prove}`);
    return this.resultado;
  }


}
