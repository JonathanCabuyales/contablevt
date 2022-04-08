import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtrasosService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAtrasos(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/atrasos/atrasos_get.php?token=${token}`);
    return this.resultado;
  }

  getAtraso(atraso: any){
    this.resultado = this.http.post(`${this.baseUrl}/atrasos/atrasos_getatraso.php`, JSON.stringify(atraso));
    return this.resultado;
  }

  getAtrasoUsuario(atraso: any){
    this.resultado = this.http.post(`${this.baseUrl}/atrasos/atrasos_usuario_get.php`, JSON.stringify(atraso));
    return this.resultado;
  }

  createAtraso(atraso: any){
    this.resultado = this.http.post(`${this.baseUrl}/atrasos/atrasos_insert.php`, JSON.stringify(atraso));
    return this.resultado;
  }

  updateJustificacion(atraso: any) {
    this.resultado = this.http.post(`${this.baseUrl}/atrasos/atrasos_justificar.php`, JSON.stringify(atraso));
    return this.resultado;
  }


  deleteAtraso(atraso: any) {
    this.resultado = this.http.post(`${this.baseUrl}/atrasos/atrasos_delete.php`, JSON.stringify(atraso));
    return this.resultado;
  }
  // cambia la direccion del path para el correo cuando ya este en el servidor ${this.baseUrl}
  sendMail(atraso: any){
    this.resultado = this.http.post(`https://contable.vt-proyectos.com.ec/APIVTPROYECTOS/mail/mailatrasos.php`, JSON.stringify(atraso));
    return this.resultado;
  }

  sendMailJustificarAtraso(atraso: any){
    this.resultado = this.http.post(`https://contable.vt-proyectos.com.ec/APIVTPROYECTOS/mail/mail_atraso_justificado.php`, JSON.stringify(atraso));
    return this.resultado;
  }

}
