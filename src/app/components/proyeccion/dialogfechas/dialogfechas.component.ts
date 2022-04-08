import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FechasI } from 'src/app/models/proyeccion/fechas.interface';
import { ProyeccionService } from 'src/app/services/proyeccion/proyeccion.service';

@Component({
  selector: 'app-dialogfechas',
  templateUrl: './dialogfechas.component.html',
  styleUrls: ['./dialogfechas.component.css']
})
export class DialogfechasComponent implements OnInit {

  // variable para ver si muestra o edicion
  enablefechas: boolean = true;

  // variable para el objeto de fecha
  fechas: FechasI;
  fechaUpdate = {
    fechas_pro: '',
    id_pro: '',
    token: ''
  }

  // token
  token: string = '';

  fechaactual: string = '';

  constructor(public dialogRef: MatDialogRef<DialogfechasComponent>, @Inject(MAT_DIALOG_DATA)
    public fecha: any,
    private _proyeccion: ProyeccionService,
    private _cookie: CookieService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.token = this._cookie.get("token");

    if (this.fecha) {
      this.enablefechas = true;
    } else {
      this.enablefechas = false;
    }

    this.fechas = {
      fechaentrega: '',
      fechacalificacion: '',
      fechaconvalidacion: '',
      fechapuja: '',
      id_pro: ''
    }

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    if (mes < 10 && dia < 10) {
      this.fechaactual = anio + '-0' + mes + '-0' + dia;
    } else if (mes < 10) {
      this.fechaactual = anio + '-0' + mes + '-' + dia;
    } else if (dia < 10) {
      this.fechaactual = anio + '-' + mes + '-0' + dia;
    } else {
      this.fechaactual = anio + '-' + mes + '-' + dia;
    }

  }

  guardarFechas(){

    // console.log(this.fechas);
    // console.log(new Date().toISOString());
    
    
    if(this.fechas.fechaentrega == ''){
      this.toastError("EL campo fecha de entrega esta vacio");
    }else if(this.fechas.fechacalificacion == ''){
      this.toastError("EL campo fecha de calificación esta vacio");
    }else if(this.fechas.fechapuja == ''){
      this.toastError("EL campo fecha de puja esta vacio");
    }else if(this.fechas.fechaentrega <= this.fechaactual || this.fechas.fechacalificacion <= this.fechaactual
      || this.fechas.fechapuja <= this.fechaactual){

      this.toastError("La fecha seleccionada no puede ser menor o igual a la fecha actual");
      
    }else{
    
      delete this.fechas.id_pro;
      delete this.fechas.token;
      
      this.fechaUpdate.fechas_pro = JSON.stringify(this.fechas);
      this.fechaUpdate.id_pro = this.fecha.id_pro;
      this.fechaUpdate.token = this.token;
      
      this._proyeccion.updateFechas(this.fechaUpdate).subscribe(res=>{
        if(res.data){
          this.toastSuccess("Hemos registrado los datos con exito!!!");
          this.dialogRef.close();
        } else {
          this.toastError("No podemos registrar las fechas intentalo nuevamete.");
        }
      });

      
    }

  }


  // mensajes 

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 4500,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4500,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 4500,
    });
  }

}
