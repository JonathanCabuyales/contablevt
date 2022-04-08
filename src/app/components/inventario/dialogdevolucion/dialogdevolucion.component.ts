import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { InventarioI } from 'src/app/models/inventario/inventario.interface';
import { InventarioAsigI } from 'src/app/models/inventario/inventarioAsig.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogdevolucion',
  templateUrl: './dialogdevolucion.component.html',
  styleUrls: ['./dialogdevolucion.component.css']
})
export class DialogdevolucionComponent implements OnInit {

  stockRecibido: number;
  prodSerAct: ProsernuevoI;
  inventarioUpdate: InventarioI;

  // variable para el token
  token: string = '';

  constructor(public dialogRef: MatDialogRef<DialogdevolucionComponent>, @Inject(MAT_DIALOG_DATA)
  public item: InventarioAsigI,
    private _inventario: InventarioService,
    private toastr: ToastrService,
    private _cookie: CookieService) { }

  ngOnInit(): void {

    this.token = this._cookie.get('token');

    this.inventarioUpdate = {
      id_inv: this.item.id_inv,
      id_proser: this.item.id_proser,
      id_usuario: this.item.id_usuario,
      stockasignado_inv: parseInt(this.item.stockasignado_inv),
      stockentregado_inv: parseInt(this.item.stockentregado_inv),
      proyectos_inv: this.item.proyectos_inv
    };

  }

  cantidadRecibida() {

    if (this.stockRecibido == null || this.stockRecibido == 0 || this.stockRecibido <= 0) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el stock para continuar'
      });
    } else if (this.stockRecibido >= 0) {
      if (this.stockRecibido > this.inventarioUpdate.stockasignado_inv) {
        Swal.fire({
          icon: 'warning',
          confirmButtonColor: '#1d1d24',
          text: 'El stock recibido es mayor al asignado, por favor revise para continuar!!!'
        });
      } else if (this.stockRecibido <= this.inventarioUpdate.stockasignado_inv) {

        let aux = this.stockRecibido + this.inventarioUpdate.stockentregado_inv;

        if (aux > parseInt(this.item.stockasignado_inv)) {
          Swal.fire({
            icon: 'warning',
            confirmButtonColor: '#1d1d24',
            text: 'El stock recibido anteriormente sumado el actual superan la cantidad inicial asignada, por favor revise para continuar!!!'
          });
        } else if (this.stockRecibido == this.inventarioUpdate.stockasignado_inv) {

          this.inventarioUpdate.stockentregado_inv = this.stockRecibido;
          this.inventarioUpdate.token = this.token;

          this._inventario.updateProdSer(this.inventarioUpdate).subscribe(res => {
            if (res.data) {
              this.toastSuccess("El stock de usuario se ha actualizado exitosamente!!!");
              this.dialogRef.close(this.stockRecibido);
            } else {
              this.toastError("No hemos podido actualizar el stock por favor intentalo nuevamente más tarde");
            }
          }, error => {
            this.toastError(error);
          });

        } else if (aux < parseInt(this.item.stockasignado_inv)) {

          this.inventarioUpdate.stockentregado_inv = this.stockRecibido + parseInt(this.item.stockentregado_inv);
          this.inventarioUpdate.token = this.token;

          this._inventario.updateProdSer(this.inventarioUpdate).subscribe(res => {
            if (res.data) {
              this.toastSuccess("El stock de usuario se ha actualizado exitosamente!!!");
              this.dialogRef.close(this.stockRecibido);
            } else {
              this.toastError("No hemos podido actualizar el stock por favor intentalo nuevamente más tarde");
            }
          }, error => {
            this.toastError(error);
          });

        } else if (aux == parseInt(this.item.stockasignado_inv)) {

          this.inventarioUpdate.stockentregado_inv = this.stockRecibido + parseInt(this.item.stockentregado_inv);
          this.inventarioUpdate.token = this.token;

          this._inventario.updateProdSer(this.inventarioUpdate).subscribe(res => {
            if (res.data) {
              this.toastSuccess("El stock de usuario se ha actualizado exitosamente!!!");
              this.dialogRef.close(this.stockRecibido);
            } else {
              this.toastError("No hemos podido actualizar el stock por favor intentalo nuevamente más tarde");
            }
          }, error => {
            this.toastError(error);
          });

        }
      }
    }
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }


}
