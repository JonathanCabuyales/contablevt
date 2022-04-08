import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AtrasosI } from 'src/app/models/atrasos/atrasos.interface';
import { AtrasosService } from 'src/app/services/atrasos/atrasos.service';

@Component({
  selector: 'app-dialogatrasos',
  templateUrl: './dialogatrasos.component.html',
  styleUrls: ['./dialogatrasos.component.css']
})
export class DialogatrasosComponent implements OnInit {

  // en este dialogo se registrara por usuario los atrasos
  // verificamos el dia del registro, no se podra registrar mas de una vez el atraso diario

  fechaatraso: string = '';
  tiempoatraso: string = '';
  descripcion: string = '0';

  atraso: AtrasosI;
  token: string = '';

  constructor(public dialogRef: MatDialogRef<DialogatrasosComponent>, @Inject(MAT_DIALOG_DATA)
    public usuario: any,
    private toastr: ToastrService,
    private _cookie: CookieService,
    private _atrasos: AtrasosService) { }

  ngOnInit(): void {

    this.token = this._cookie.get("token");
    
    this.atraso = {
      id_usu: '',
      fecha_atr: '',
      tiempo_atr: '',
      descripcion_atr: '',
      token: '',
      nombre: '',
      correo: '',
      justificado_atr: 'NO',
      justificacion_atr: '',
      fechajusti_atr: ''
    }

  }

  guardarAtraso(){

    console.log(this.tiempoatraso);
    
    if(this.fechaatraso == ''){
      this.toastWarning("Debes ingresar la fecha del atraso para continuar");
    }else if(this.tiempoatraso == '' || this.tiempoatraso == null){
      this.toastWarning("Debes ingresar el tiempo de atraso en minutos para continuar");
    }else if(this.descripcion == '0'){
      this.toastWarning("Debes seleccionar la descripcion del atraso");
    }else{
      this.atraso.id_usu = this.usuario.id_usuario;
      this.atraso.fecha_atr = this.fechaatraso;
      this.atraso.tiempo_atr = this.tiempoatraso;
      this.atraso.token = this.token;
      this.atraso.descripcion_atr = this.descripcion;
      this.atraso.nombre = this.usuario.nombres + ' ' + this.usuario.apellidos;
      this.atraso.correo = this.usuario.email;
      
      this._atrasos.getAtraso(this.atraso).subscribe(res=>{
        
        if(!res.data.length){

          this._atrasos.sendMail(this.atraso).subscribe(res=>{
            if(res.data){
              this.toastSuccess("Hemos envia una notificación al correo del usuario con exito");
            }else{
              this.toastError("Tenemos problemas para enviar la notificación");
            }
            
          });
          
          this._atrasos.createAtraso(this.atraso).subscribe(res=>{

            if(res.data){
              this.dialogRef.close();
              this.toastSuccess("Hemos guardado tu registro !!!");
            }else{
              this.toastError("Tenemos problemas para guardar tu registro intentalo nuevamente más tarde");
            }

          });

        }else{
          this.toastError("Ya tenemos registrado este atraso, verifica e intentalo nuevamente");
        }

      });      
    }
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje + '!!!', 'Advertencia', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 4000,
    });
  }

}
