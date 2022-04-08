import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FechasI } from 'src/app/models/proyeccion/fechas.interface';
import { ProyeccionService } from 'src/app/services/proyeccion/proyeccion.service';

@Component({
  selector: 'app-dialogfechasregistradas',
  templateUrl: './dialogfechasregistradas.component.html',
  styleUrls: ['./dialogfechasregistradas.component.css']
})
export class DialogfechasregistradasComponent implements OnInit {

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

  constructor(public dialogRef: MatDialogRef<DialogfechasregistradasComponent>, @Inject(MAT_DIALOG_DATA)
    public proceso: any,
    private _proyeccion: ProyeccionService,
    private _cookie: CookieService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.token = this._cookie.get("token");

    console.log(this.proceso);

    this.fechas = {
      fechaentrega: '',
      fechacalificacion: '',
      fechaconvalidacion: '',
      fechapuja: '',
      id_pro: ''
    }


    console.log(this.proceso.fechas_pro.length);
    
    if(this.proceso.fechas_pro.length != 0){      
      
      this.fechas.fechaentrega = this.proceso.fechas_pro.fechaentrega;
      this.fechas.fechacalificacion = this.proceso.fechas_pro.fechacalificacion;
      this.fechas.fechaconvalidacion = this.proceso.fechas_pro.fechaconvalidacion;
      this.fechas.fechapuja = this.proceso.fechas_pro.fechapuja;
      
    }else{
      console.log("mensaje");
      
      this.toastWarning(this.proceso.nombres + " " + this.proceso.apellidos + " aun no registra las fechas del proceso.");
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
