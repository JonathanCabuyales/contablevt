import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getEmpleadosVentas(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/empleados/empleados_ventas_get.php?token=${token}`);
    return this.resultado;
  }

  // getEmpeladosValidos(){
  //   this.resultado = this.http.get(`${this.baseUrl}/empleados/empleados_validos_get.php`);
  //   return this.resultado;
  // }

  // getVerificarDocumentos(id_usuario: any){
  //   this.resultado = this.http.get(`${this.baseUrl}/empleados/empleados_verificar_documentos.php?id_usuario=${id_usuario}`);
  //   return this.resultado;
  // }

  // createEmpleado(usuario: UsuarioI){
  //   this.resultado = this.http.post(`${this.baseUrl}/empleados/empleados_insert.php`, usuario);
  //   return this.resultado;
  // }

  // deleteEmpleado(id: number){
  //   this.resultado = this.http.get(`${this.baseUrl}/empleados/empleados_delete.php?id_usuario=${id}`);
  //   return this.resultado;
  // }

  // updateEmpleado(usuario: UsuarioI){
  //   this.resultado = this.http.put(`${this.baseUrl}/empleados/empleados_update.php`, JSON.stringify(usuario));
  //   return this.resultado;
  // }
}
