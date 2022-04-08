import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyeccionService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }


  createProyeccion(proyeccion: any){
    this.resultado = this.http.post(`${this.baseUrl}/proyeccion/proyeccion_insert.php`, JSON.stringify(proyeccion));
    return this.resultado;
  }

  getProyecciones(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/proyeccion/proyeccion_get.php?token=${token}`);
    return this.resultado;
  }

  aprobarProyeccion(proyeccion: any){
    this.resultado = this.http.post(`${this.baseUrl}/proyeccion/proyeccion_aprobar.php`, JSON.stringify(proyeccion));
    return this.resultado;
  }

  getProyeccionesUsuario(token: any, id_usuario: any){
    this.resultado = this.http.get(`${this.baseUrl}/proyeccion/proyeccion_usuario_get.php?token=${token}&id_usuario=${id_usuario}`);
    return this.resultado;
  }

  getProyeccionhojapedido(token: any, id_pro: any){
    this.resultado = this.http.get(`${this.baseUrl}/proyeccion/proyeccion_hojapedido_getusuario.php?token=${token}&id_pro=${id_pro}`);
    return this.resultado;
  }

  getProyeccionactividades(token: any, id_pro: any){
    this.resultado = this.http.get(`${this.baseUrl}/proyeccion/proyeccion_actividades_getusuario.php?token=${token}&id_pro=${id_pro}`);
    return this.resultado
  }

  updateFechas(proyeccion: any){
    this.resultado = this.http.post(`${this.baseUrl}/proyeccion/proyeccion_fechas_update.php`, JSON.stringify(proyeccion));
    return this.resultado;
  }

  rechazarProyeccion(proyeccion: any){
      this.resultado = this.http.post(`${this.baseUrl}/proyeccion/proyeccion_rechazar.php`, JSON.stringify(proyeccion));
      return this.resultado;
  }

  updateHojapedido(proyeccion: any){
    this.resultado = this.http.post(`${this.baseUrl}/proyeccion/proyeccion_hojapedido_update.php`, JSON.stringify(proyeccion));
    return this.resultado;
  }

  sendMailAprobado(atraso: any){
    // https://contable.vt-proyectos.com.ec/APIVTPROYECTOS
    this.resultado = this.http.post(`${this.baseUrl}/mail/mail_proyecto_aprobado.php`, JSON.stringify(atraso));
    return this.resultado;
  }

  sendMailHojapedido(pedido: any){
    // https://contable.vt-proyectos.com.ec/APIVTPROYECTOS
    this.resultado = this.http.post(`${this.baseUrl}/mail/mail_proyecto_hojapedido.php`, JSON.stringify(pedido));
    return this.resultado;
  }

}
