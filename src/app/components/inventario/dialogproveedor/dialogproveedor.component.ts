import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ProveedorI } from 'src/app/models/proveedor/proveedor.interface';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { validarCedula } from '../../clientes/validar-cedula';
import { validarRuc } from '../../clientes/validar-ruc';

@Component({
  selector: 'app-dialogproveedor',
  templateUrl: './dialogproveedor.component.html',
  styleUrls: ['./dialogproveedor.component.css']
})
export class DialogproveedorComponent implements OnInit {

  proveedor: ProveedorI;

  token: string = '';

  // variable para mostrar la seleccion del proveedor
  showseleccionar: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogproveedorComponent>, @Inject(MAT_DIALOG_DATA)
    public verificar: any,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _proveedor: ProveedoresService,
    private _cookie: CookieService) { }

  ngOnInit(): void {
    
    this.token = this._cookie.get("token");

    this.proveedor = {
      id_prove: '',
      razonsocial_prove: '',
      ciruc_prove: '',
      direccion_prove: '',
      email_prove: '',
      telefono_prove: '',
      descripcion_prove: ''

    }

  }

  guardar() {

    if (this.proveedor.razonsocial_prove == '') {
      this.toastWarning("Debes ingresar la razon social para continuar");

    } else if (this.proveedor.ciruc_prove == '') {
      this.toastWarning("Debes ingresar el RUC para continuar");

    } else if (this.proveedor.direccion_prove == '') {
      this.toastWarning("No has especificado la dirección aún");

    } else if (this.proveedor.email_prove == '') {
      this.toastWarning("No has registrado el correo electrónico del proveedor");

    } else {

      if (this.proveedor.ciruc_prove.length == 10) {

        if (validarCedula(this.proveedor.ciruc_prove)) {

          this._proveedor.verificarProveedor(this.token, this.proveedor.ciruc_prove).subscribe(res=>{
            if(!res.data.length){

              this.dialogRef.close(this.proveedor);

            }else{
              this.toastError("Ya tenemos registrado a este proveedor");
            }
          });
          

        } else {

          this.toastError("El número de cédula no es correcto");

        }

      } else if (this.proveedor.ciruc_prove.length == 13) {

        if (validarRuc(this.proveedor.ciruc_prove)) {

          this._proveedor.verificarProveedor(this.token, this.proveedor.ciruc_prove).subscribe(res=>{
            if(!res.data.length){

              this.dialogRef.close(this.proveedor);

            }else{
              this.toastError("Ya tenemos registrado a este proveedor");
            }
          });


        } else {

          this.toastError("El número de RUC no es válido");

        }

      } else {

        this.toastError("El número de cédula o RUC no tiene 10 o 13 dígitos por favor verifique");


      }
    }

  }

  cancelar() {
    this.dialogRef.close();
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia');
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
