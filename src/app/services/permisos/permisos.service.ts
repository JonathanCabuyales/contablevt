import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }


  createPermiso(permiso: any){
    this.resultado = this.http.post(`${this.baseUrl}/permisos/permisos_insert.php`, JSON.stringify(permiso));
    return this.resultado;
  }

  getPermisos(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/permisos/permisos_get.php?token=${token}`);
    return this.resultado;
  }

  getPermisosUsuario(permiso: any){
    this.resultado = this.http.post(`${this.baseUrl}/permisos/permisos_get_user.php`, JSON.stringify(permiso));
    return this.resultado;
  }

  deletePermiso(permiso: any){
    this.resultado = this.http.post(`${this.baseUrl}/permisos/permisos_delete.php`, JSON.stringify(permiso));
    return this.resultado;
  }

  aprobarPermiso(permiso: any){
    this.resultado = this.http.post(`${this.baseUrl}/permisos/permisos_aprobar.php`, JSON.stringify(permiso));
    return this.resultado;
  }

  // cambia la direccion del path para el correo cuando ya este en el servidor ${this.baseUrl}

  sendMail(permiso: any){
    this.resultado = this.http.post(`https://contable.vt-proyectos.com.ec/APIVTPROYECTOS/mail/mail_peticion_permiso.php`, JSON.stringify(permiso));
    return this.resultado;
  }

  sendMailAporbadoa(permiso: any){
    this.resultado = this.http.post(`https://contable.vt-proyectos.com.ec/APIVTPROYECTOS/mail/mail_peticion_permiso.php`, JSON.stringify(permiso));
    return this.resultado;
  }

}
