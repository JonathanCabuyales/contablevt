import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AtrasosI } from 'src/app/models/atrasos/atrasos.interface';
import { AtrasosService } from 'src/app/services/atrasos/atrasos.service';

@Component({
  selector: 'app-dialogatrasosjustificar',
  templateUrl: './dialogatrasosjustificar.component.html',
  styleUrls: ['./dialogatrasosjustificar.component.css']
})
export class DialogatrasosjustificarComponent implements OnInit {

  motivojusti: string = '';
  token: string = '';
  atrasoUp: AtrasosI;

  constructor(public dialogRef: MatDialogRef<DialogatrasosjustificarComponent>, @Inject(MAT_DIALOG_DATA)
    public atraso: any,
    private toastr: ToastrService,
    private _cookie: CookieService,
    private _atrasos: AtrasosService) { }

  ngOnInit(): void {
    this.token = this._cookie.get("token");
    this.motivojusti = '';
    
    this.atrasoUp = {
      id_usu: '',
      fecha_atr: '',
      tiempo_atr: '',
      descripcion_atr: '',
      token: '',
      nombre: '',
      correo: '',
      justificado_atr: '',
      justificacion_atr: '',
      fechajusti_atr: ''
    }

  }

  justificar(){
    if(this.motivojusti == ''){
      this.toastError("Debes ingresar el motivo de la justificación para continuar");
    }else{
      this.atrasoUp.id_atr = this.atraso.id_atr;
      this.atrasoUp.justificado_atr = 'SI';
      this.atrasoUp.justificacion_atr = this.motivojusti;
      this.atrasoUp.id_usu = this.atraso.id_usuario;
      this.atrasoUp.token = this.token;
      this.atrasoUp.correo = this.atraso.email;
      this.atrasoUp.fechajusti_atr = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
      this.atrasoUp.nombre = this.atraso.nombres;
      this.atrasoUp.fecha_atr = this.atraso.fecha_atr;
      this.atrasoUp.tiempo_atr = this.atraso.tiempo_atr;
      this.atrasoUp.descripcion_atr = this.atraso.descripcion_atr;

      
      this._atrasos.updateJustificacion(this.atrasoUp).subscribe(res=>{
        if(res.data){
          this._atrasos.sendMailJustificarAtraso(this.atrasoUp).subscribe(res=>{
            if(res.data){
              this.toastSuccess("Hemos enviado el correo exitosamente");
            }else{
              this.toastError("No hemos podido enviar el correo intentalo nuevamente");
            }
          });
          this.dialogRef.close(true);
          this.toastSuccess("Hemos guardado la justificacion correctamente !!!");
        }else{
          this.dialogRef.close(false);
          this.toastError("Tenemos problemas para guardar la justificación, intentalo más tarde.");
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