import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoteI } from 'src/app/models/inventario/lote.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogeditinventario',
  templateUrl: './dialogeditinventario.component.html',
  styleUrls: ['./dialogeditinventario.component.css']
})
export class DialogeditinventarioComponent implements OnInit {

  // variables de combo box
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  causas: any;

  // variables para registro de un nuevo PROD/SERV
  nuevoProductoServicio: ProsernuevoI;
  showguardar: boolean = false;

  // variable para capturar los datos del lote
  lote: LoteI;

  // variable para habilitar campos
  showlote: boolean = false;
  disableiva: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogeditinventarioComponent>, @Inject(MAT_DIALOG_DATA)
  public prodserUpdate: ProsernuevoI,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.showlote = false;
    this.disableiva = true;

    if (this.prodserUpdate.categoria_proser == 'PRODUCTO') {
      this.showlote = true;
      this.disableiva = false;
    } else if (this.prodserUpdate.categoria_proser == 'SERVICIO') {
      this.showlote = false;
      this.disableiva = true;
    } else if (this.prodserUpdate.categoria_proser == 'SUMINISTROS') {

      this.showlote = false;
      this.disableiva = true;

    } else if (this.prodserUpdate.categoria_proser == 'SUJETOCONTROL') {

      this.showlote = false;
      this.disableiva = true;

    }

    this.lote = {
      numero_lote: '',
      fechaelabo_lote: '',
      fechavenci_lote: '',
      cantidad_lote: '',
      precio: ''
    }

    this.lote = JSON.parse(this.prodserUpdate.lote_proser);

  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    // this.verSeleccion = this.prodserUpdate.categoria_proser;
    if (this.prodserUpdate.categoria_proser == '0') {

      this.showlote = false;
      this.disableiva = true;

    } else if (this.prodserUpdate.categoria_proser == 'PRODUCTO') {

      this.showlote = true;
      this.disableiva = false;

    } else if (this.prodserUpdate.categoria_proser == 'SERVICIO') {

      this.showlote = false;
      this.disableiva = true;
      this.prodserUpdate.IVA_proser = '0';

    } else if (this.prodserUpdate.categoria_proser == 'SUMINISTROS') {

      this.showlote = false;
      this.disableiva = true;

    } else if (this.prodserUpdate.categoria_proser == 'SUJETOCONTROL') {

      this.showlote = false;
      this.disableiva = true;

    }
  }

  guardar() {
    if (this.prodserUpdate.categoria_proser == "" || this.prodserUpdate.categoria_proser == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar la categoria'
      });
    } else if (this.prodserUpdate.codigo_proser == "") {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe escanear el codigo de barras del producto a registrar'
      });
    } else if (this.prodserUpdate.nombre_proser == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el nombre del Producto/servicio'
      });
    } else if (this.prodserUpdate.descripcion_proser == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la descripción del Producto/servicio'
      });
    } else if (this.prodserUpdate.precio_proser <= 0) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El precio no puede ser menor a 0'
      });
    } else if (this.prodserUpdate.cantidad_proser <= 0) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'La cantidad debe ser mayor a 0'
      });
    } else {
      // this.prodserUpdate.categoria_proser = this.verSeleccion;
      this.prodserUpdate.cantidadfinal_proser = this.prodserUpdate.cantidad_proser;

      let hoy = '';

      let dia = new Date().getUTCDate();
      let mes = new Date().getMonth() + 1;
      let anio = new Date().getFullYear();

      if (mes < 10 && dia < 10) {
        hoy = anio + '-0' + mes + '-0' + dia;
      } else if (mes < 10) {
        hoy = anio + '-0' + mes + '-' + dia;
      } else if (dia < 10) {
        hoy = anio + '-' + mes + '-0' + dia;
      } else {
        hoy = anio + '-' + mes + '-' + dia;
      }

      if (this.prodserUpdate.categoria_proser == 'PRODUCTO') {

        if (this.prodserUpdate.IVA_proser == '1') {

          this.toastWarning("Debe seleccionar el IVA del producto para continuar");

        } else {

          // cantidad del lote
          this.lote.cantidad_lote = this.prodserUpdate.cantidad_proser + '';

          // fecha del lote
          if (this.lote.fechaelabo_lote == '' && this.lote.fechavenci_lote !== '') {

            this.lote.fechaelabo_lote = hoy;

          } else if (this.lote.fechaelabo_lote !== '' && this.lote.fechavenci_lote == '') {

            this.lote.fechavenci_lote = hoy;

          } else {

            this.lote.fechaelabo_lote = hoy;
            this.lote.fechavenci_lote = hoy;

          }

          if (this.lote.numero_lote == null) {

            this.lote.numero_lote = '';

          } else {

            this.lote.precio = this.prodserUpdate.precio_proser + '';

            this.prodserUpdate.lote_proser = JSON.stringify(this.lote);
            this.prodserUpdate.preciosugerido_proser = this.prodserUpdate.precio_proser + '';

            if (this.prodserUpdate == null) {
              delete this.prodserUpdate.id_proser;
              this.dialogRef.close(this.prodserUpdate);
            } else {
              this.dialogRef.close(this.prodserUpdate);
            }

          }

        }


      } else if (this.prodserUpdate.categoria_proser == 'SERVICIO') {

        this.lote.fechaelabo_lote = hoy;
        this.lote.fechavenci_lote = hoy;
        this.lote.numero_lote = 'SIN LOTE';
        this.lote.cantidad_lote = 'S/C';

        this.lote.precio = this.prodserUpdate.precio_proser + '';

        this.prodserUpdate.lote_proser = JSON.stringify(this.lote);
        this.prodserUpdate.preciosugerido_proser = this.prodserUpdate.precio_proser + '';

        if (this.prodserUpdate == null) {
          delete this.prodserUpdate.id_proser;
          this.dialogRef.close(this.prodserUpdate);
        } else {
          this.dialogRef.close(this.prodserUpdate);
        }

      } else if (this.prodserUpdate.categoria_proser == 'SUMINISTROS') {

        this.lote.fechaelabo_lote = hoy;
        this.lote.fechavenci_lote = hoy;
        this.lote.numero_lote = 'SIN LOTE';
        this.lote.cantidad_lote = 'S/C';

        this.lote.precio = this.prodserUpdate.precio_proser + '';

        this.prodserUpdate.lote_proser = JSON.stringify(this.lote);
        this.prodserUpdate.preciosugerido_proser = this.prodserUpdate.precio_proser + '';


        if (this.prodserUpdate == null) {
          delete this.prodserUpdate.id_proser;
          this.dialogRef.close(this.prodserUpdate);
        } else {
          this.dialogRef.close(this.prodserUpdate);
        }

      } else if (this.prodserUpdate.categoria_proser == 'SUJETOCONTROL') {

        this.lote.fechaelabo_lote = hoy;
        this.lote.fechavenci_lote = hoy;
        this.lote.numero_lote = 'SIN LOTE';
        this.lote.cantidad_lote = 'S/C';

        this.lote.precio = this.prodserUpdate.precio_proser + '';

        this.prodserUpdate.lote_proser = JSON.stringify(this.lote);
        this.prodserUpdate.preciosugerido_proser = this.prodserUpdate.precio_proser + '';

        if (this.prodserUpdate == null) {
          delete this.prodserUpdate.id_proser;
          this.dialogRef.close(this.prodserUpdate);
        } else {
          this.dialogRef.close(this.prodserUpdate);
        }

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

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 5000,
    });
  }


}
