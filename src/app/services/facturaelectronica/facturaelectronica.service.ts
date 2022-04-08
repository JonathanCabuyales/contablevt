import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaelectronicaService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/prefactura/prefactura_get.php?token=${token}`);
    return this.resultado;
  }

  // cambia el path para el servidor para la otra direccion de la factura
  createXML(prefactura: any){
    
    this.resultado = this.http.post(`${this.baseUrl}/libreria_2021/generar_factura_xml.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  //leer factura

  leerFactura(prefactura: any){
    
    this.resultado = this.http.post(`${this.baseUrl}/libreria_2021/src/leerFactura.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  createFactura(prefactura: any){
    this.resultado = this.http.post(`${this.baseUrl}/libreria_2021/factura_insert.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  
  enviarFactura(prefactura: any){
    this.resultado = this.http.post(`${this.baseUrl}/libreria_2021/enviar_factura.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  getFacturaSecuencial(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/libreria_2021/factura_get_secuencial.php?token=${token}`);
    return this.resultado;
  }

}
