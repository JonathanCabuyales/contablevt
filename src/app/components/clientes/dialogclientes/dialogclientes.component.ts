import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ClienteI } from 'src/app/models/cliente.interface';
import { ClienteserService } from 'src/app/services/clienteser.service';
import Swal from 'sweetalert2';
import { DialogProSerComponent } from '../../productosservicios/dialog-pro-ser/dialog-pro-ser.component';
import { validarCedula } from '../validar-cedula';
import { validarRuc } from '../validar-ruc';

@Component({
  selector: 'app-dialogclientes',
  templateUrl: './dialogclientes.component.html',
  styleUrls: ['./dialogclientes.component.css']
})
export class DialogclientesComponent implements OnInit {

  cliente: ClienteI;

  // variable para verificar cedula ecuatoriana
  public validador: boolean = true;

  token: string = '';

  constructor(public dialogRef: MatDialogRef<DialogProSerComponent>, @Inject(MAT_DIALOG_DATA)
  public clienteUpdate: ClienteI,
    private toastr: ToastrService,
    private _cliente: ClienteserService,
    private _cookie: CookieService) { }

  ngOnInit() {

    this.token = this._cookie.get("token");

    this.cliente = {
      id_cli: 0,
      nombres_cli: '',
      apellidos_cli: '',
      ciruc_cli: '',
      direccion_cli: '',
      telefono_cli: '',
      email_cli: '',
      created_at: new Date()
    }

    if (this.clienteUpdate == null) {
      this.clienteUpdate = {
        id_cli: 0,
        nombres_cli: '',
        apellidos_cli: '',
        ciruc_cli: '',
        direccion_cli: '',
        telefono_cli: '',
        email_cli: '',
        created_at: new Date()
      }
    } else {
      this.cliente = this.clienteUpdate;
    }

  }


  guardar() {    

    if (this.cliente.nombres_cli == '' || this.cliente.nombres_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar los nombres del cliente'
      });
    } else if (this.cliente.apellidos_cli == '' || this.cliente.apellidos_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar los apellidos del cliente'
      });
    } else if (this.cliente.ciruc_cli == '' || this.cliente.ciruc_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El número de cédula es incorrecto'
      });
    } else if (this.cliente.direccion_cli == '' || this.cliente.direccion_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la dirección del cliente'
      });
    } else if (this.cliente.telefono_cli == '' || this.cliente.telefono_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar un número de teléfono'
      });
    } else if (this.cliente.email_cli == '' || this.cliente.email_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar un email'
      });
    } else if (this.cliente.ciruc_cli.length == 10) {

      if (validarCedula(this.cliente.ciruc_cli)) {

        this._cliente.verificarCliente(this.token, this.cliente.ciruc_cli).subscribe(res=>{

          if(res.data.length){
            this.toastWarning("El cliente ya se encuentra registrado");
          }else{
            if (this.clienteUpdate == null) {
              delete this.cliente.id_cli;
              delete this.cliente.created_at;
              this.dialogRef.close(this.cliente);
            } else {
              delete this.cliente.created_at;
              this.dialogRef.close(this.cliente);
            }
          }
          
        });

      } else {

        this.toastError("El número de cedula no es correcto");

      }

    } else if (this.cliente.ciruc_cli.length == 13) {

      if (validarRuc(this.cliente.ciruc_cli)) {

        this._cliente.verificarCliente(this.token, this.cliente.ciruc_cli).subscribe(res=>{
          if(res.data.length){

            this.toastWarning("El cliente ya se encuentra registrado");
            
          }else{

            if (this.clienteUpdate == null) {
              delete this.cliente.id_cli;
              delete this.cliente.created_at;
              this.dialogRef.close(this.cliente);
            } else {
              delete this.cliente.created_at;
              this.dialogRef.close(this.cliente);
            }

          }
        });

      } else {

        this.toastError("El número de RUC no es valido");

      }

    } else {

      this.toastError("El número de cedula o RUC no tiene 10 o 13 digitos por favor verifique");

    }

  }

  cancelar() {
    this.dialogRef.close();
  }

  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 5000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje + '!!!', 'Advertencia', {
      timeOut: 5000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 5000,
    });
  }

}
