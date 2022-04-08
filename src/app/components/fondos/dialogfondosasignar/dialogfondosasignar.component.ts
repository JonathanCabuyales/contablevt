import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FondoasignarI } from 'src/app/models/fondos/fondoasignar.interface';
import { FondojustificadoI } from 'src/app/models/fondos/fondosjustificados.interface';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { FondosService } from 'src/app/services/fondos/fondos.service';

@Component({
  selector: 'app-dialogfondosasignar',
  templateUrl: './dialogfondosasignar.component.html',
  styleUrls: ['./dialogfondosasignar.component.css']
})
export class DialogfondosasignarComponent implements OnInit {

  monto: string = '';
  descripcion: string = '';
  empleado: UsuarioI;

  token: string = '';

  fondoasignar: FondoasignarI;

  // variable para insertar en la tabla fondo_justificados
  fondojustificado: FondojustificadoI;

  constructor(public dialogRef: MatDialogRef<DialogfondosasignarComponent>, @Inject(MAT_DIALOG_DATA)
  public empleadoAsignar: any,
    private toastr: ToastrService,
    private _cookie: CookieService,
    private _fondos: FondosService) { }

  ngOnInit(): void {

    this.token = this._cookie.get('token');
    this.empleado = this.empleadoAsignar;

    this.fondoasignar = {
      id_usuario: '',
      monto_fon: '',
      descripcion_fon: '',
    };

    this.fondojustificado = {
      id_fon: '',
      id_usuario: '',
      detalles_fonjus: '',
      justificado_fonjus: '',
      nojustificado_fonjus: '',
    }
  }

  crearMonto() {

    if (this.monto == '' || this.monto == null) {
      this.toastWarning("Debe ingresar el monto para continuar");
    } else if (this.monto <= '0') {
      this.toastWarning("El monto debe ser mayor a cero");
    } else {

      this.fondoasignar.id_usuario = this.empleado.id_usuario.toString();
      this.fondoasignar.monto_fon = this.monto;
      this.fondoasignar.descripcion_fon = this.descripcion;
      this.fondoasignar.token = this.token;

      this._fondos.createFondo(this.fondoasignar).subscribe(res => {
        
        console.log(res);
        if(res.data == 0){
          this.toastError("Ups, tenemos problemas para registar la asignación por favor intentalo nuevamente");
        }else{

          this.fondojustificado.id_fon = res.data;
          this.fondojustificado.id_usuario = this.fondoasignar.id_usuario;
          this.fondojustificado.justificado_fonjus = '0';
          this.fondojustificado.nojustificado_fonjus = this.monto;
          this.fondojustificado.detalles_fonjus = '';
          this.fondojustificado.token = this.token;
          
          this._fondos.createFondoJustificacion(this.fondojustificado).subscribe(res=>{
            
            if (res.data) {
              this.dialogRef.close(true);
            } else {
              this.dialogRef.close(false);
            }
          });

        }
      });

    }
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 5000,
    });
  }

}
