import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FondoasignarI } from 'src/app/models/fondos/fondoasignar.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FondosService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/fondos/fondos_get.php?token=${token}`);
    return this.resultado;
  }

  createFondo(fondo: FondoasignarI){
    this.resultado = this.http.post(`${this.baseUrl}/fondos/fondos_insert.php`, fondo);
    return this.resultado;
  }

  deleteFondo(id_fon: number){
    this.resultado = this.http.get(`${this.baseUrl}/fondos/clientes_delete.php?id_cli=${id_fon}`);
    return this.resultado;
  }

  updateFondo(fondo: FondoasignarI){
    this.resultado = this.http.put(`${this.baseUrl}/fondos/clientes_update.php`, JSON.stringify(fondo));
    return this.resultado;
  }

  getUsarioFondos(fondo: any){
    this.resultado = this.http.post(`${this.baseUrl}/fondos/fondos_usuario_get.php`, JSON.stringify(fondo));
    return this.resultado;
  }

  getFondojustiUsuario(fondo){
    this.resultado = this.http.post(`${this.baseUrl}/fondos/fondos_justificacion_get.php`, JSON.stringify(fondo));
    return this.resultado;
  }

  createFondoJustificacion(fondojustificacion){
    this.resultado = this.http.post(`${this.baseUrl}/fondos/fondos_justificacion_insert.php`, JSON.stringify(fondojustificacion));
    return this.resultado;
  }

  updateFondoJustificacion(fondojustificacion){
    this.resultado = this.http.put(`${this.baseUrl}/fondos/fondos_justificacion_update.php`, JSON.stringify(fondojustificacion));
    return this.resultado;
  }

  getFondojustOne(fondo){
    this.resultado = this.http.post(`${this.baseUrl}/fondos/fondos_justificacion_getone.php`, JSON.stringify(fondo));
    return this.resultado;
  }

}
